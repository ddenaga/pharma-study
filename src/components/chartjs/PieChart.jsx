// components/BarChart.js
import { Pie } from 'react-chartjs-2';

export default function PieChart({ chartData }) {
	return (
		<div className="col-span-5 rounded-lg bg-white p-4 leading-5 shadow sm:rounded-lg xl:col-span-4">
			<h2 className="mb-4 text-2xl font-bold">Drug Efficacy</h2>
			<Pie data={chartData} />
		</div>
	);
}
