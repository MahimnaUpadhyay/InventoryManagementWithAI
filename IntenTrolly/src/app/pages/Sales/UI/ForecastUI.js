import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ForecastUI() {
  const [formData, setFormData] = useState({
    Catagory: "",
    Stock_Quantity: "",
    Unit_Price: "",
    Date_Received: "",
    Last_Order_Date: "",
    Sales_Volume: "",
  });
  const [forecast, setForecast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/forecast", formData);
      setForecast(res.data.forecasted_sales);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: ["Current Stock", "Forecasted Sales"],
    datasets: [
      {
        label: "Sales Forecast",
        data: [formData.Stock_Quantity || 0, forecast || 0],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        📊 Inventory Forecast
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["Catagory", "Stock_Quantity", "Unit_Price", "Date_Received", "Last_Order_Date", "Sales_Volume"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Forecast
        </button>
      </form>

      {forecast !== null && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center">
            Forecasted Sales: {forecast.toFixed(2)}
          </h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}
