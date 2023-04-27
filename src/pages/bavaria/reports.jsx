import Sidebar from '@/components/Sidebar';
import { fdaClient } from '@/lib/vendia';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import BarChart from '@/components/chartjs/BarChart';
import LineChart from '@/components/chartjs/LineChart';
import PieChart from '@/components/chartjs/PieChart';

export async function getServerSideProps() {
	function getEntityById(entities, id) {
		let entity = entities.find((entity) => entity._id === id);
		return entity !== undefined ? entity : null;
	}

	const trackers = (await fdaClient.entities.tracker.list()).items;
	const patients = (await fdaClient.entities.patient.list()).items;
	const treatments = (await fdaClient.entities.treatment.list()).items;

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
		let numberOfRecordings = patient.visits?.filter((visit) => visit.hivViralLoad !== null).length;

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
			const reversedArray = patient.visits.reverse(); // visits array has the latest visit first
			viralLoadReadings = reversedArray.map((visit) => ({
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
		if (patient.visits) {
			return patient.visits.find((visit) => parseInt(visit.hivViralLoad) === 0);
		}
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

	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-100">
				<div className="flex items-center justify-between ">
					<h1 className="m-20 text-4xl">Reports</h1>
					{isStudyFinished ? (
						<span className="text-md mr-20 inline-block rounded-full bg-green-600 py-2 px-4 text-white shadow-lg">
							Study is completed
						</span>
					) : (
						<span className="text-md mr-20 inline-block animate-pulse rounded-full bg-red-600 py-2 px-4 text-white shadow-lg">
							Study in progress
						</span>
					)}
				</div>
				{isStudyFinished && (
					<div className=" mx-20 grid grid-cols-12 gap-20">
						<LineChart chartData={lineData} />
						<BarChart chartData={barData} />
						<PieChart chartData={pieData} />
					</div>
				)}
			</div>
		</div>
	);
}
