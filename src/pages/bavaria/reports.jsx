import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { bavariaClient } from '@/lib/vendia';
import { Chart as ChartJS } from 'chart.js/auto';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import BarChart from '@/components/chartjs/BarChart';
import LineChart from '@/components/chartjs/LineChar';
import PieChart from '@/components/chartjs/PieChart';

export async function getServerSideProps() {
	var studyIsDone = true;
	const patients = await bavariaClient.entities.patient.list();
	const treatments = await bavariaClient.entities.treatment.list();
	treatments.items.map((treatment) => {
		if (treatment.numberOfDoses > 0) {
			studyIsDone = false;
		}
	});
	return {
		props: {
			data: { studyIsDone, patients, treatments },
		},
	};
}

export default function Reports({ data }) {
	Chart.register(CategoryScale);

	const [patients, setPatients] = useState(data.patients.items);
	const [treatments, setTreatments] = useState(data.treatments.items);
	var genericTotal = 0,
		bavariaTotal = 0;

	treatments.map((treatment) => {
		if (treatment.isGeneric == true) {
			genericTotal += 1;
		} else {
			bavariaTotal++;
		}
	});
	const barData = {
		labels: ['Drug'],
		datasets: [
			{
				label: 'Bavaria',
				data: [bavariaTotal],
				backgroundColor: ['rgba(66, 108, 245, 0.5)'],
				borderColor: ['rgba(66, 108, 245, 0.5)'],
				borderWidth: 1,
			},
			{
				label: 'Generic',
				data: [genericTotal],
				backgroundColor: ['rgba(189, 4, 96, 0.5)'],
				borderColor: ['rgba(189, 4, 96, 0.5)'],
				borderWidth: 1,
			},
		],
	};

	const lineDataSet = patients.map((patient) => {
		var viralLoadReadings = 0;
		if (patient.visits != null) {
			viralLoadReadings = patient?.visits?.map((visit) => ({
				x: visit?.dateTime.substring(0, 10),
				y: visit?.hivViralLoad,
			}));
		}
		return {
			label: patient._id.slice(-5),
			data: viralLoadReadings,
			//data: patient.viralLoad,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1,
		};
	});
	const lineData = {
		labels: [],
		datasets: lineDataSet,
	};
	const drugWorkedCount = patients.filter(patient => {
		if (patient.visits != null) {
			const lastVisit = patient.visits[0]
			return lastVisit.hivViralLoad == 0;
		}
	}).length
	const pieData = {
		labels: ['Worked', "Didn't Work"],
		datasets: [
			{
				//label: ["Didn't Work", 'Worked'],
				data: [drugWorkedCount, patients.length - drugWorkedCount],
				backgroundColor: ['rgba(66, 108, 245, 0.5)', 'rgba(189, 4, 96, 0.5)'],
				borderColor: ['rgba(66, 108, 245, 0.5)', 'rgba(189, 4, 96, 0.5)'],
				borderWidth: 1,
			},
		],
	};
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-100" onClick={console.log(data)}>
				<div className="flex items-center justify-between ">
					<h1 className="m-20 text-4xl">Reports</h1>
					{data.studyIsDone ? (
						<span className="text-md mr-20 inline-block rounded-full bg-green-600 py-2 px-4 text-white shadow-lg">
							Study Is Complete
						</span>
					) : (
						<span className="text-md mr-20 inline-block animate-pulse rounded-full bg-red-600 py-2 px-4 text-white shadow-lg">
							Study still Ongoing
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
