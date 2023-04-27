// components/BarChart.js
import { Pie } from 'react-chartjs-2';


export default function PieChart({ chartData }) {
	return (
		<div className="col-span-5 row-span-2  rounded-xl bg-white p-5 shadow-md">
			<h2 className="text-2xl font-bold">Drug Efficacy</h2>
			<Pie data={chartData} />
		</div>
	);
}
