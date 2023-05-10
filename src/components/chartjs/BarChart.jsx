// components/BarChart.js
import { Bar } from 'react-chartjs-2';

export default function BarChart({ chartData }) {
	return (
		<div className="col-span-7 rounded-lg bg-white p-4 leading-5 shadow sm:rounded-lg xl:col-span-5">
			<h2 className="mb-4 text-2xl font-bold">Number of patients per drug</h2>
			<Bar data={chartData} />
		</div>
	);
}
