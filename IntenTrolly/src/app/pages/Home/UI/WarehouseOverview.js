"use client"

import React from 'react'

// ChartJS
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const WarehouseOverview = () => {
  const data = {
    labels: ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'],
    datasets: [
      {
        label: 'Warehouse Overview',
        data: [120, 190, 75, 100],
        backgroundColor: 'rgba(47, 39, 206, 1)',
        borderRadius: 6,
      },
    ],
  }

  const options = { 
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  return (
    <div className="flex w-full h-full bg-gray-100 justify-center items-center rounded-md p-4">
      <div className="w-full bg-white rounded-lg shadow-lg p-2">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default WarehouseOverview
