import Sidebar from '@/components/Sidebar';
import { fdaClient } from '@/lib/vendia';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import BarChart from '@/components/chartjs/BarChart';
import LineChart from '@/components/chartjs/LineChart';
import PieChart from '@/components/chartjs/PieChart';
import seedDb from '@/lib/seed';

export async function getServerSideProps() {
	function getEntityById(entities, id) {
		let entity = entities.find((entity) => entity._id === id);
		return entity !== undefined ? entity : null;
	}

	let trackers, patients, treatments;
	try {
		trackers = (await fdaClient.entities.tracker.list()).items;
		patients = (await fdaClient.entities.patient.list()).items.filter((patient) => patient.isEligible);
		treatments = (await fdaClient.entities.treatment.list()).items;
	}
	catch (e) {
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

	const effectiveCount = patients.filter((patient) => {
		return patient.visits?.find((visit) => parseInt(visit.hivViralLoad) === 0);
	}).length;

	const pieData = {
		labels: ['Effective', 'Ineffective'],
		datasets: [
			{
				data: [effectiveCount, patients.length - effectiveCount],
				backgroundColor: ['rgba(66, 108, 245, 0.5)', 'rgba(189, 4, 96, 0.5)'],
				borderColor: ['rgba(66, 108, 245, 0.5)', 'rgba(189, 4, 96, 0.5)'],
				borderWidth: 1,
			},
		],
	};

	async function exportToCSV() {

	}

	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<div className="mb-12 flex items-center  justify-between" onClick={console.log(pieData)}>
					<h1 className="attention-voice" >Reports</h1>
					{isStudyFinished ? (
						<div>
							<button className='btn btn-success' onClick={exportToCSV}>Export</button>
							<button className='btn btn-success' onClick={seedDb}>Seed Database</button>
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
					</div>
				)}
			</div>
		</div>
	);
}
