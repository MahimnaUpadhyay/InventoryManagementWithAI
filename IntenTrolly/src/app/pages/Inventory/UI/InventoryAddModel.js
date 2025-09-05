"use client"

import axios from 'axios';
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL.js';
import { postProductEndPoint } from '@/app/utility/API_END_POINT/Product_End_Point.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InventoryAddModal = ({ closeModal }) => {

    const [addProductData, setaddProductData] = React.useState({
        Product_Name: "",
        Category: "",
        Unit_Price: "",
        Expiration_Date: "",
        Status: ""
    });

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const request = await axios.post(`${BASE_URL}${postProductEndPoint}`, addProductData);

            if(!request){
                toast.error("Failed to add Product");
            } else {
                toast.success("Product added");
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        }
    }

    const onProductnameChange = (e) => {
        setaddProductData({ ...addProductData, Product_Name: e.target.value });
    };

    const onCategoryChange = (e) => {
        setaddProductData({ ...addProductData, Category: e.target.value });
    };

    const onBrandChange = (e) => {
        setaddProductData({ ...addProductData, Unit_Price: e.target.value });
    };

    const onDescriptionChange = (e) => {
        setaddProductData({ ...addProductData, Expiration_Date: e.target.value });
    };

    const onPriceChange = (e) => {
        setaddProductData({ ...addProductData, Status: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60">
            <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800">

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

                <div className="flex flex-col mt-4 space-y-6">
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Product Name:</label>
                        <input
                            type="text"
                            value={addProductData?.Product_Name}
                            onChange={onProductnameChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Category:</label>
                        <select
                            value={addProductData?.Category}
                            onChange={onCategoryChange}
                            className="w-2/3 p-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-200 dark:border-gray-600 dark:text-white"
                            defaultValue=""
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home">Home</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Unit:</label>
                        <input
                            type="text"
                            value={addProductData?.Unit_Price}
                            onChange={onBrandChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter Price"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Expiration Date:</label>
                        <input
                            type="text"
                            value={addProductData?.Expiration_Date}
                            onChange={onDescriptionChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter Expiration Date"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Status:</label>
                        <input
                            type="text"
                            value={addProductData?.Status}
                            onChange={onPriceChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter Status"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                    <button
                        onClick={addProduct}
                        type="button"
                        className="flex items-center justify-center w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        Add Product
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default InventoryAddModal;
