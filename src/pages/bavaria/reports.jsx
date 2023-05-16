import Sidebar from '@/components/Sidebar';
import { fdaClient, jhClient } from '@/lib/vendia';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import BarChart from '@/components/chartjs/BarChart';
import LineChart from '@/components/chartjs/LineChart';
import PieChart from '@/components/chartjs/PieChart';
import seedDb from '@/lib/seed';
import { CSVLink } from 'react-csv';

export async function getServerSideProps() {
	function getEntityById(entities, id) {
		let entity = entities.find((entity) => entity._id === id);
		return entity !== undefined ? entity : null;
	}

	let trackers, patients, treatments;
	try {
		trackers = (await fdaClient.entities.tracker.list()).items;
		patients = (await fdaClient.entities.patient.list()).items;
		treatments = (await fdaClient.entities.treatment.list()).items;
	} catch (e) {
		trackers = [];
		patients = [];
		treatments = [];
	}

	let pairings = await Promise.all(
		trackers.map(async (ids) => {
			const { _id, patientId, treatmentId } = ids;
			const patient = getEntityById(patients, patientId);
			const treatment = getEntityById(treatments, treatmentId);
			return {
				_id,
				patient,
				treatment,
			};
		}),
	);

	// Filter out incomplete mappings
	pairings = pairings.filter((pr) => pr.patient !== null && pr.treatment !== null);

	return {
		props: {
			patients,
			treatments,
			pairings,
		},
	};
}

export default function Reports(props) {
	Chart.register(CategoryScale);

	const { patients, treatments, pairings } = props;

	let isStudyFinished = pairings.every((pr) => {
		const { patient, treatment } = pr;
		// Check if the number of doses match the number of visits with a recorded viral load
		let numberOfDoses = treatment.numberOfDoses;
		let numberOfRecordings = patient.visits?.filter(
			(visit) => visit.hivViralLoad !== null && visit.hivViralLoad.trim().length !== 0,
		).length;

		return numberOfDoses <= numberOfRecordings;
	});

	let genericCount = 0;
	let bavariaCount = 0;

	treatments.forEach((treatment) => {
		if (treatment.isGeneric) {
			genericCount++;
		} else {
			bavariaCount++;
		}
	});

	const barData = {
		labels: ['Drug'],
		datasets: [
			{
				label: 'Bavaria',
				data: [bavariaCount],
				backgroundColor: ['rgba(66, 108, 245, 0.5)'],
				borderColor: ['rgba(66, 108, 245, 0.5)'],
				borderWidth: 1,
			},
			{
				label: 'Generic',
				data: [genericCount],
				backgroundColor: ['rgba(189, 4, 96, 0.5)'],
				borderColor: ['rgba(189, 4, 96, 0.5)'],
				borderWidth: 1,
			},
		],
	};

	const lineDataSet = patients.map((patient) => {
		let viralLoadReadings;
		if (patient.visits != null) {
			const sortedByTime = patient.visits.sort((a, b) => {
				return new Date(a.dateTime) - new Date(b.dateTime);
			}); // visits array has the latest visit first
			viralLoadReadings = sortedByTime.map((visit) => ({
				x: visit?.dateTime.substring(0, 10),
				y: visit?.hivViralLoad,
			}));
		}
		return {
			label: patient._id.slice(-5),
			data: viralLoadReadings,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1,
		};
	});

	const lineData = {
		labels: [],
		datasets: lineDataSet,
	};

	// const effectiveCount = patients.filter((patient) => {
	// 	return patient.visits?.find((visit) => parseInt(visit.hivViralLoad) <= 100);
	// }).length;

	const effectiveCount = pairings.filter((pr) => {
		const { patient, treatment } = pr;
		return !treatment.isGeneric && patient.visits?.some((visit) => parseInt(visit.hivViralLoad) <= 10);
	}).length;

	const pieData = {
		labels: ['Effective', 'Ineffective'],
		datasets: [
			{
				data: [effectiveCount, bavariaCount - effectiveCount],
				backgroundColor: ['rgba(66, 108, 245, 0.5)', 'rgba(189, 4, 96, 0.5)'],
				borderColor: ['rgba(66, 108, 245, 0.5)', 'rgba(189, 4, 96, 0.5)'],
				borderWidth: 1,
			},
		],
	};

	// Patient UUID | Dose Number | Time of Visit | Viral Load Reading | Type of Medication
	const csvData = [];
	const csvHeaders = [
		{ label: 'Patient UUID', key: 'patientId' },
		{ label: 'Dose Number', key: 'doseNumber' },
		{ label: 'Time of Visit', key: 'visitTime' },
		{ label: 'Viral Load Reading', key: 'viralLoadReading' },
		{ label: 'Type of Medication', key: 'type' },
	];
	pairings.forEach((pr) => {
		const { patient, treatment } = pr;
		patient.visits
			?.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
			.forEach((visit, index) => {
				csvData.push({
					patientId: patient._id,
					doseNumber: index + 1,
					visitTime: visit.dateTime,
					viralLoadReading: visit.hivViralLoad,
					type: treatment.isGeneric ? 'Generic' : 'Bavaria',
				});
			});
	});

	async function exportToCSV() {}

	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	}

	async function updateGenericVisits() {
		let genericPatients = pairings
			.filter((pr) => pr.treatment.isGeneric)
			.map((pr) => {
				const { patient, treatment } = pr;
				return patient;
			});

		// console.log(bavariaPatients);

		let promises = genericPatients.map((patient) => {
			return jhClient.entities.patient.update({
				_id: patient._id,
				visits: [
					{
						dateTime: '2023-05-16T20:00:00.000Z',
						note: 'Fifth reading.',
						hivViralLoad: getRandomIntInclusive(400, 800).toString(),
					},
					{
						dateTime: '2023-05-09T20:00:00.000Z',
						note: 'Fourth reading.',
						hivViralLoad: getRandomIntInclusive(400, 800).toString(),
					},
					{
						dateTime: '2023-05-02T20:00:00.000Z',
						note: 'Third reading.',
						hivViralLoad: getRandomIntInclusive(600, 800).toString(),
					},
					{
						dateTime: '2023-04-25T20:00:00.000Z',
						note: 'Second reading.',
						hivViralLoad: getRandomIntInclusive(600, 800).toString(),
					},
					{
						dateTime: '2023-04-18T20:00:00.000Z',
						note: 'Initial viral load reading.',
						hivViralLoad: getRandomIntInclusive(900, 1100).toString(),
					},
				],
			});
		});

		console.log('Beginning to change updates...');
		console.log(promises);
		Promise.all(promises).then(() => {
			console.log('Finished updating visits for each patient.');
		});
	}

	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<div className="mb-12 flex items-center  justify-between">
					<h1 className="attention-voice">Reports</h1>
					{isStudyFinished ? (
						<div>
							{/* <button className="btn-success btn" onClick={seedDb}>
								Seed Database
							</button> */}
							<span className="text-md inline-block rounded-full bg-green-600 py-2 px-4 text-white shadow-lg">
								Study is completed
							</span>
						</div>
					) : (
						<span className="text-md inline-block animate-pulse rounded-full bg-red-600 py-2 px-4 text-white shadow-lg">
							Study in progress
						</span>
					)}
				</div>
				{isStudyFinished && (
					<div className="grid grid-cols-12 gap-4 lg:gap-8 ">
						<LineChart chartData={lineData} />
						<PieChart chartData={pieData} />
						<BarChart chartData={barData} />

						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-100">
								<tr>
									{csvHeaders.map((header, index) => {
										return (
											<th
												key={index}
												scope="col"
												className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
											>
												{header.label}
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{csvData.map((row, index) => {
									return (
										<tr key={index}>
											<td className="px-3 py-4 text-sm text-gray-500">{row.patientId}</td>
											<td className="px-3 py-4 text-sm text-gray-500">{row.doseNumber}</td>
											<td className="px-3 py-4 text-sm text-gray-500">{row.visitTime}</td>
											<td className="px-3 py-4 text-sm text-gray-500">{row.viralLoadReading}</td>
											<td className="px-3 py-4 text-sm text-gray-500">{row.type}</td>
										</tr>
									);
								})}
							</tbody>
						</table>

						<CSVLink
							className="btn"
							headers={csvHeaders}
							data={csvData}
							filename={'pharmastudy-data.csv'}
						>
							Download as CSV
						</CSVLink>

					</div>
				)}
			</div>
		</div>
	);
}
