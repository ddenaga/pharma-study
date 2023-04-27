// components/BarChart.js
import { Bar } from 'react-chartjs-2';


export default function BarChart({ chartData }) {
	return (
		<div className="col-span-5 rounded-xl bg-white p-5 shadow-md">
			<h2 className="text-2xl font-bold">Number of patients per drug</h2>
			<Bar data={chartData} />
		</div>
	);
}
