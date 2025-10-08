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

const CategoryOverview = () => {
  const data = {
    labels: ["Category A", "Category B", "Category C", "Category D"],
    datasets: [
      {
        label: "Category Overview",
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

export default CategoryOverview;
