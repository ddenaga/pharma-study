import Sidebar from '@/components/Sidebar';
import { bavariaClient } from '@/lib/vendia';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import BarChart from '@/components/chartjs/BarChart';
import LineChart from '@/components/chartjs/LineChart';
import PieChart from '@/components/chartjs/PieChart';

export async function getServerSideProps() {
	const patients = await bavariaClient.entities.patient.list();
	const treatments = await bavariaClient.entities.treatment.list();

	return {
		props: {
			patients: patients.items,
			treatments: treatments.items,
		},
	};
}

export default function Reports(props) {
	Chart.register(CategoryScale);

	const { patients, treatments } = props;

	let isStudyFinished = treatments.every((treatment) => {
		// Check if the number of doses match the number of visits with a recorded viral load
		let numberOfDoses = treatment.numberOfDoses;
		let numberOfRecordings = treatment.visits?.filter((visit) => visit.hivViralLoad !== null).length;

		return numberOfDoses === numberOfRecordings;
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
		let viralLoadReadings = 0;
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
		return patient.visits.find((visit) => parseInt(visit.hivViralLoad) === 0);
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
				<div className=" mx-20 grid grid-cols-12 gap-20">
					<LineChart chartData={lineData} />
					<BarChart chartData={barData} />
					<PieChart chartData={pieData} />
				</div>
			</div>
		</div>
	);
}
