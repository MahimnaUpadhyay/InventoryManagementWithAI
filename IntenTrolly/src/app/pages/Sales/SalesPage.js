"use client";
import React, { useState } from "react";
import SalesTable from "./UI/SalesTable";
import Card from "@/app/components/Card";
import { FaShoppingCart, FaChartLine } from "react-icons/fa";
import Header from "@/app/components/Header";
import axios from "axios";
import { motion } from "framer-motion";

// Category dropdown options
const categories = [
  "Fruits & Vegetables",
  "Oils & Fats",
  "Dairy",
  "Grains & Pulses",
  "Seafood",
  "Bakery",
  "Beverages",
];

const SalesPage = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Catagory: "Beverages",
    Stock_Quantity: 100,
    Unit_Price: 50,
    Date_Received: "2025-09-10",
    Last_Order_Date: "2025-09-20",
    Sales_Volume: 80,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForecast = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/forecast", formData);
      setForecast(res.data.forecasted_sales);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col w-full h-[100vh] bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6 gap-6 overflow-y-auto"
    >
      <Header
        PageHeader={"Sale Overview"}
        Subtext={"Track, Manage, and Forecast sales efficiently"}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card Card_Title="Total Sales" Icon={<FaShoppingCart size={40} />} Card_Content="₹1.2M revenue" />
        <Card Card_Title="Monthly Growth" Icon={<FaChartLine size={40} />} Card_Content="+15% this month" />
        <Card
          Card_Title="Forecasted Sales"
          Icon={<FaChartLine size={40} />}
          Card_Content={
            loading ? (
              "Calculating..."
            ) : forecast !== null ? (
              <span className="text-green-600 font-bold text-lg">{forecast.toFixed(2)} units</span>
            ) : (
              "No forecast yet"
            )
          }
        />
      </div>

      {/* Forecast Input Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 w-full"
      >
        <h2 className="text-xl font-semibold text-text mb-4">Forecast Sales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Dropdown */}
          <select
            name="Catagory"
            value={formData.Catagory}
            onChange={handleChange}
            className="border p-2 rounded-lg hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="Stock_Quantity"
            placeholder="Stock Quantity"
            value={formData.Stock_Quantity}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="Unit_Price"
            placeholder="Unit Price"
            value={formData.Unit_Price}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="date"
            name="Date_Received"
            value={formData.Date_Received}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="date"
            name="Last_Order_Date"
            value={formData.Last_Order_Date}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="Sales_Volume"
            placeholder="Past Sales Volume"
            value={formData.Sales_Volume}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
        </div>

        <button
          onClick={handleForecast}
          className="mt-4 px-6 py-2 bg-secondary text-white font-semibold rounded-xl hover:bg-primary transition shadow-md"
        >
          {loading ? "Forecasting..." : "Get Forecast"}
        </button>

        {forecast !== null && !loading && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 bg-green-50 border border-green-300 rounded-xl text-center shadow-sm"
          >
            <h3 className="text-lg font-semibold text-green-700">Forecast Result</h3>
            <p className="text-2xl font-bold text-green-800 mt-2">{forecast.toFixed(2)} units</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SalesPage;
