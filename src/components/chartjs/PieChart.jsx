// components/BarChart.js
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
export default function PieChart({ chartData }) {
    return (
        <div className="col-span-5 row-span-2  shadow-md bg-white rounded-xl p-5">
            <h2 className="text-2xl font-bold">Drug Efficacy</h2>
            <Pie
                data={chartData}
            />
        </div>
    );
};