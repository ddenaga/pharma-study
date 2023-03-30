// components/BarChart.js
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
export default function LineChart({ chartData }) {
    return (
        <div className="col-span-5 row-span-1 shadow-md bg-white rounded-xl p-5">
            <h2 className="text-2xl font-bold">HIV Viral Load Tracking</h2>
            <Line
                data={chartData}
            />
        </div>
    );
};