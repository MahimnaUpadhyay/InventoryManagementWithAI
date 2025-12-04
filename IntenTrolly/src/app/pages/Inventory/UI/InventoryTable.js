"use client";

import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL.js';
import { getProductEndPoint } from '@/app/utility/API_END_POINT/Product_End_Point.js';

import { FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

import InventoryAddModal from './InventoryAddModel';
import InventoryUpdateModal from './InventoryUpdateModel';

const InventoryTable = () => {

    const [Product_Data, setProduct_Data] = React.useState([]);
    const [Loading, setLoading] = React.useState(false);

    // Modals
    const [isAddModalOpen, setisAddModalOpen] = React.useState(false);
    const [isUpdateModalOpen, setisUpdateModalOpen] = React.useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 3;

    const getProduct = async () => {
        try {
            setLoading(true);

            const request = await axios.get(`${BASE_URL}${getProductEndPoint}`);
            const ProductData = request.data.response;

            setProduct_Data(Array.isArray(ProductData) ? ProductData : Object.values(ProductData));
        } catch (error) {
            console.log("Error while fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getProduct();
    }, []);

    // Pagination Logic
    const totalPages = Math.ceil(Product_Data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Product_Data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    // Modal actions
    const openAddModal = () => setisAddModalOpen(true);
    const closeAddModal = () => setisAddModalOpen(false);

    const openUpdateModal = () => setisUpdateModalOpen(true);
    const closeUpdateModal = () => setisUpdateModalOpen(false);


    if (Loading) {
        return (
            <div className='flex w-full h-90 justify-center items-center gap-5'>
                <div className='animate-bounce w-3 h-3 ring-primary ring-4 rounded-full' />
                <div className='animate-bounce w-3 h-3 ring-primary ring-4 rounded-full' />
                <div className='animate-bounce w-3 h-3 ring-primary ring-4 rounded-full' />
            </div>
        );
    }

    return (
        <>
            <section className="w-full h-auto sm:p-5">
                <div className="w-full bg-white p-2 rounded-md shadow-md lg:px-12">
                    <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">

                        {/* Search + Add Product */}
                        <div className="flex justify-between p-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border px-3 py-2 rounded-md w-1/2"
                            />

                            <button
                                onClick={openAddModal}
                                className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
                            >
                                Add Product
                                <FaPlus />
                            </button>
                            {isAddModalOpen && <InventoryAddModal closeModal={closeAddModal} />}
                        </div>

                        {/* Table */}
                        <table className="w-full text-sm border">
                            <thead className="bg-primary text-white text-left">
                                <tr>
                                    <th className="px-4 py-3">Product Name</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Unit Price</th>
                                    <th className="px-4 py-3">Expiration Date</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((data) => (
                                    <tr key={data.Product_ID} className="border-b">
                                        <td className="px-4 py-3">{data.Product_Name}</td>
                                        <td className="px-4 py-3">{data.Category}</td>
                                        <td className="px-4 py-3">{data.Unit_Price}</td>
                                        <td className="px-4 py-3">{data.Expiration_Date}</td>
                                        <td className="px-4 py-3">{data.Status}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={openUpdateModal}>
                                                <FiEdit2 size={18} />
                                            </button>

                                            {isUpdateModalOpen && (
                                                <InventoryUpdateModal closeModal={closeUpdateModal} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-between items-center p-4">
                            <span>
                                Showing {indexOfFirstItem + 1} -{" "}
                                {Math.min(indexOfLastItem, Product_Data.length)} of {Product_Data.length}
                            </span>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="p-2 border rounded-md disabled:opacity-40"
                                >
                                    <MdOutlineKeyboardArrowLeft size={20} />
                                </button>

                                <span className="font-bold">{currentPage} / {totalPages}</span>

                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border rounded-md disabled:opacity-40"
                                >
                                    <MdOutlineKeyboardArrowRight size={20} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default InventoryTable;
