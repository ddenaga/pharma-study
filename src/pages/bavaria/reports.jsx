import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { bavariaClient } from "@/lib/vendia";
import { Chart as ChartJS } from 'chart.js/auto'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarChart from "@/components/chartjs/BarChart";
import LineChart from "@/components/chartjs/LineChar";
import PieChart from "@/components/chartjs/PieChart";
Chart.register(CategoryScale);


export default function Reports(props) {

  const barData = {
    labels: ['Drug'],
    datasets: [{
      label: 'Bavaria',
      data: [8],
      backgroundColor: [
        'rgba(66, 108, 245, 0.5)',

      ],
      borderColor: [
        'rgba(66, 108, 245, 0.5)',
      ],
      borderWidth: 1
    },
    {
      label: 'Generic',
      data: [5],
      backgroundColor: [
        'rgba(189, 4, 96, 0.5)',

      ],
      borderColor: [
        'rgba(189, 4, 96, 0.5)',
      ],
      borderWidth: 1
    }
    ]
  };
  const lineData = {
    labels: ['January', "February", "March", "April", "May"],
    datasets: [
      {
        label: 'John',
        data: [1000, 889, 554, 350, 0],
        fill: false,
        borderColor: 'rgba(66, 108, 245, 0.5)',
        tension: 0.1
      },
      {
        label: 'Mary',
        data: [1000, 784, 561, 260, 0],
        fill: false,
        borderColor: 'rgba(66, 108, 245, 0.5)',
        tension: 0.1
      },
      {
        label: 'Alex',
        data: [1000, 988, 685, 895, 764],
        fill: false,
        borderColor: 'rgba(66, 108, 245, 0.5)',
        tension: 0.1
      },
      {
        label: "Bob",
        data: [1000, 854, 561, 157, 0],
        fill: false,
        borderColor: 'rgba(66, 108, 245, 0.5)',
        tension: 0.1
      },
    ]
  };
  const pieData = {
    labels: ['Sacramento', 'New York', 'Ontario', 'Atlanda', 'Reno'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [24, 15, 36, 21, 12],
        backgroundColor: [
          'rgba(0, 0, 255,0.7)',
          'rgba(255, 0, 0,0.7)',
          'rgba(255, 255, 0,0.7)',
          'rgba(0, 255, 0,0.7)',
          'rgba(102, 0, 255,0.7)'
        ],
      }
    ]
  };
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll" onClick={console.log(props)}>
        <div className="flex justify-between items-center ">
          <h1 className="text-4xl m-20">Reports</h1>
          <span className="inline-block animate-pulse rounded-full py-2 px-4 bg-red-600 text-white text-md mr-20 shadow-lg">Study still Ongoing</span>
        </div>
        <div className=" mx-20 grid grid-cols-12 gap-20">
          <BarChart chartData={barData} />
          <LineChart chartData={lineData} />
          <PieChart chartData={pieData} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const myData = await bavariaClient.entities.patient.list();
  return {
    props: {
      data: myData,
    },
  };
}
