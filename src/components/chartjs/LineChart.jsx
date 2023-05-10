// components/BarChart.js
import { Line } from 'react-chartjs-2';

export default function LineChart({ chartData }) {
	return (
		<div className="col-span-12 rounded-lg bg-white p-4 leading-5 shadow sm:rounded-lg xl:col-span-8">
			<h2 className="mb-4 text-2xl font-bold">HIV Viral Load Tracking</h2>
			<Line data={chartData} />
		</div>
	);
}
