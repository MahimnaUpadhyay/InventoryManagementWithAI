"use client"

import React from 'react';

// API
import axios from 'axios';
import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL';
import { postSupplierEndPoint } from '@/app/utility/API_END_POINT/Supplier_End_Point';

// ICONS
import { FaPlus, FaTimes } from 'react-icons/fa';

// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SupplierAddModal = ({ closeModal }) => {

    const [addSupplierData, setaddSupplierData] = React.useState({
        supplierName: "",
        supplierAddress: "",
        supplierPhone: "",
        supplierRate: "",
    })

    // Add Supplier
    const addSupplier = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            const parsedUser = JSON.parse(user);
            const userRole = parsedUser.role;

            const request = await axios.post(`${BASE_URL}${postSupplierEndPoint}`, addSupplierData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!request) {
                toast.error("Failed to add supplier");
            } else if (userRole == "Employee") {
                toast.error("You are not authorized!!");
            } else {
                toast.success("Supplier Added successfully");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const onSupplier_NameChange = (e) => {
        setaddSupplierData({ ...addSupplierData, supplierName: e.target.value });
    };

    const onSupplier_AddressChange = (e) => {
        setaddSupplierData({ ...addSupplierData, supplierAddress: e.target.value });
    };

    const onSupplier_PhoneChange = (e) => {
        setaddSupplierData({ ...addSupplierData, supplierPhone: e.target.value });
    };

    const onSupplier_RateChange = (e) => {
        setaddSupplierData({ ...addSupplierData, supplierRate: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60">
            <div className="relative p-6 w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800">

                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Add Supplier
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
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Supplier Name:</label>
                        <input
                            type="text"
                            value={addSupplierData?.supplierName}
                            onChange={onSupplier_NameChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter Supplier name"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Supplier Address:</label>
                        <input
                            type="text"
                            value={addSupplierData?.supplierAddress}
                            onChange={onSupplier_AddressChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter Supplier Address"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Supplier Phone:</label>
                        <input
                            type="number"
                            value={addSupplierData?.supplierPhone}
                            onChange={onSupplier_PhoneChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter Phone"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Supplier Rate:</label>
                        <input
                            type="text"
                            value={addSupplierData?.supplierRate}
                            onChange={onSupplier_RateChange}
                            className="w-2/3 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter price"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                    <button
                        onClick={addSupplier}
                        type="button"
                        className="flex items-center justify-center w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        Add Supplier
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default SupplierAddModal;
