// components/BarChart.js
import { Line } from 'react-chartjs-2';


export default function LineChart({ chartData }) {
	return (
		<div className="col-span-9 rounded-xl bg-white p-10 shadow-lg">
			<h2 className="text-2xl font-bold">HIV Viral Load Tracking</h2>
			<Line data={chartData} />
		</div>
	);
}
