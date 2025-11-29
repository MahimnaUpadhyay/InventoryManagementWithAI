"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { BASE_URL } from "@/app/utility/API_END_POINT/Base_URL.js";
import { postProductEndPoint } from "@/app/utility/API_END_POINT/Product_End_Point.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InventoryAddModal = ({ closeModal }) => {
    const [addProductData, setAddProductData] = useState({
        Product_Name: "",
        Category: "",
        Unit_Price: "",
        Expiration_Date: "",
        Status: "",
        Supplier_ID: "",
    });

    const [suppliers, setSuppliers] = useState([]);

    // Fetch supplier list when modal opens
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BASE_URL}/api/protected/supplier`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && response.data.response) {
                    setSuppliers(response.data.response);
                } else {
                    toast.warn("No suppliers found");
                }
            } catch (error) {
                console.error("Supplier Fetch Error:", error);
                toast.error("Failed to fetch suppliers");
            }
        };

        fetchSuppliers();
    }, []);

    // Handle form submission
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const request = await axios.post(
                `${BASE_URL}${postProductEndPoint}`,
                addProductData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!request) {
                toast.error("Failed to add Product");
            } else {
                toast.success("Product added successfully!");
                setAddProductData({
                    Product_Name: "",
                    Category: "",
                    Unit_Price: "",
                    Expiration_Date: "",
                    Status: "",
                    Supplier_ID: "",
                });
                closeModal();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product");
        }
    };

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddProductData({ ...addProductData, [name]: value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60">
            <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Add Product
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={closeModal}
                    >
                        <FaTimes className="w-5 h-5" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Form Fields */}
                <form onSubmit={addProduct} className="flex flex-col mt-4 space-y-6">
                    {/* Product Name */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">
                            Product Name:
                        </label>
                        <input
                            type="text"
                            name="Product_Name"
                            value={addProductData.Product_Name}
                            onChange={handleChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">
                            Category:
                        </label>
                        <select
                            name="Category"
                            value={addProductData.Category}
                            onChange={handleChange}
                            className="w-2/3 p-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {[
                                "Fruits & Vegetables",
                                "Oils & Fats",
                                "Dairy",
                                "Grains & Pulses",
                                "Seafood",
                                "Bakery",
                                "Beverages",
                            ].map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Supplier Dropdown */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">
                            Supplier:
                        </label>
                        <select
                            name="Supplier_ID"
                            value={addProductData.Supplier_ID}
                            onChange={handleChange}
                            className="w-2/3 p-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="" disabled>
                                Select supplier
                            </option>
                            {suppliers.length > 0 ? (
                                suppliers.map((supplier) => (
                                    <option key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
                                        {supplier.supplierName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No suppliers found</option>
                            )}
                        </select>
                    </div>

                    {/* Unit Price */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">
                            Unit Price:
                        </label>
                        <input
                            type="number"
                            name="Unit_Price"
                            value={addProductData.Unit_Price}
                            onChange={handleChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    {/* Expiration Date */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">
                            Expiration Date:
                        </label>
                        <input
                            type="date"
                            name="Expiration_Date"
                            value={addProductData.Expiration_Date}
                            onChange={handleChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">
                            Status:
                        </label>
                        <input
                            type="text"
                            name="Status"
                            value={addProductData.Status}
                            onChange={handleChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter status"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 gap-2"
                        >
                            <FaPlus className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
};

export default InventoryAddModal;
