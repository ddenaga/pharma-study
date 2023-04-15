// components/BarChart.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
export default function BarChart({ chartData }) {
    return (
        <div className="col-span-5 shadow-md bg-white rounded-xl p-5">
            <h2 className="text-2xl font-bold">Number of patients per drug</h2>
            <Bar
                data={chartData}
            />
        </div>
    );
};