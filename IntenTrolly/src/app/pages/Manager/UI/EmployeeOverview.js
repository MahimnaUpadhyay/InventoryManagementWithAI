"use client";

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EmployeeOverview = () => {
  const data = {
    labels: ["Employee A", "Employee B", "Employee C", "Employee D"],
    datasets: [
      {
        label: "Employee Overview",
        data: [120, 190, 75, 100],
        backgroundColor: "#93cc49",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="flex w-full h-full bg-white rounded-2xl shadow-md p-5">
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmployeeOverview;
