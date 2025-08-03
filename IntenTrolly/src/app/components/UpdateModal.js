"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { BASE_URL } from '../utility/Base_URL';
import { putProductEndPoint, getProductEndPoint } from '../utility/Product_End_Point';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateModal = ({ closeModal }) => {

    const [updateProductData, setupdateProductData] = useState({
        Productname: "",
        Category: "",
        Brand: "",
        Price: "",
        Description: ""
    })

    const updateProduct = async (e) => {
        e.preventDefault()
        try {

            const getRequest = await axios.get(`${BASE_URL}${getProductEndPoint}`)

            console.log("This is product ID ", getRequest?.data?.id);
            

            const request = await axios.put(`${BASE_URL}${putProductEndPoint}`, updateProductData);

            // const notify = () => toast("Product Updated");

            // notify()

            // return request

        } catch (error) {
            console.log(error);
        }
    }

    const onProductnameChange = (e) => {
        setupdateProductData({ ...updateProductData, Productname: e.target.value });
    };

    const onCategoryChange = (e) => {
        setupdateProductData({ ...updateProductData, Category: e.target.value });
    };

    const onBrandChange = (e) => {
        setupdateProductData({ ...updateProductData, Brand: e.target.value });
    };

    const onDescriptionChange = (e) => {
        setupdateProductData({ ...updateProductData, Description: e.target.value });
    };

    const onPriceChange = (e) => {
        setupdateProductData({ ...updateProductData, Price: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60">
            <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800">

                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Update Product
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
                            value={updateProductData?.Productname}
                            onChange={onProductnameChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Category:</label>
                        <select
                            value={updateProductData?.Category}
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
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Brand:</label>
                        <input
                            type="text"
                            value={updateProductData?.Brand}
                            onChange={onBrandChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter brand"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Description:</label>
                        <input
                            type="text"
                            value={updateProductData?.Description}
                            onChange={onDescriptionChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter product description"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Price:</label>
                        <input
                            type="text"
                            value={updateProductData?.Price}
                            onChange={onPriceChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter price"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="flex items-center justify-center w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        Update Product
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default UpdateModal;
