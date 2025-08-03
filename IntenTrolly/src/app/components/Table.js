"use client"

// REACT IMPORTS
import { useState, useEffect } from 'react'

// FOR API CALL
import axios from 'axios';
import { BASE_URL } from '../utility/Base_URL.js';
import { getProductEndPoint, postProductEndPoint, putProductEndPoint, deleteProductEndPoint } from '../utility/Product_End_Point.js';

// ICONS
import { FaFilter, FaPlus, FaSearch } from 'react-icons/fa'
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

// COMPONENTS IMPORTS
import AddModal from './AddModal.js';
import UpdateModal from './UpdateModal.js';

const Table = () => {

    const [Product_Data, setProduct_Data] = useState([])
    const [TotalProduct, setTotalProduct] = useState([])
    const [Loading, setLoading] = useState(false)
    const [isAddModalOpen, setisAddModalOpen] = useState(false)
    const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false)

    // GET PRODUCTS
    const getProduct = async () => {
        try {
            setLoading(true);

            const request = await axios.get(`${BASE_URL}${getProductEndPoint}`);
            const ProductData = request.data.response;


            if (!Array.isArray(ProductData)) {
                console.log("Product Data is not in Array");

                const product_array = Object.values(ProductData);

                if (!Array.isArray(product_array)) {
                    console.log("Not an array");
                } else {
                    setProduct_Data(product_array);
                    setLoading(false)
                }
            } else {
                setProduct_Data(ProductData);
                setLoading(false)
            }
        } catch (error) {
            console.log("There is an error while getting Products", error);
        }
    };


    // SHOW TOTAL COUNT OF PRODUCTS
    const totalProduct = async () => {
        try {
            const request = await axios.get(`${BASE_URL}${getProductEndPoint}`);
            const ProductData = request.data.response

            const TotalCount = ProductData.length;

            setTotalProduct(TotalCount);
        } catch (error) {
            console.log("Error while getting total count of product", error);
        }
    }

    // ALL METHODS FOR API
    useEffect(() => {
        return () => {
            getProduct()
            totalProduct()
        }
    }, [])

    // FOR LOADING
    if (Loading) {
        return <div className='flex w-full h-90 justify-center items-center gap-5'>
            <div
                className='animate-bounce w-3 h-3 ring-blue-600 ring-4 rounded-full'
            />
            <div
                className='animate-bounce w-3 h-3 ring-blue-600 ring-4 rounded-full'
            />
            <div
                className='animate-bounce w-3 h-3 ring-blue-600 ring-4 rounded-full'
            />
        </div>
    }

    // ON ADD PRODUCT OPEN MODEL
    const onAddProduct = () => {
        setisAddModalOpen(true);
    }

    const closeAddModal = () => {
        setisAddModalOpen(false);
    }

    // ON UPDATE PRODUCT OPEN MODEL
    const onUpdateProduct = () => {
        setisAddModalOpen(true);
    }

    const closeUpdateModal = () => {
        setisUpdateModalOpen(false);
    }

    return (
        <>
            <section className="dark:bg-gray-900 p-3 sm:p-5">
                <div className="w-full px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label for="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FaSearch
                                                color='gray'
                                            />
                                        </div>
                                        <input type="text" id="simple-search" className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={onAddProduct}
                                    type="button"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 gap-2"
                                >
                                    Add Product
                                    <FaPlus />
                                </button>

                                {isAddModalOpen && <AddModal closeModal={closeAddModal} />}

                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 gap-2" type="button">
                                        <FaFilter />
                                        Filter
                                        <IoIosArrowDown />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Product name</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3">Brand</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Product_Data?.map((data) => (
                                        <>
                                            <tr className="border-b dark:border-gray-700">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.Productname}</th>
                                                <td className="px-4 py-3">{data?.Category}</td>
                                                <td className="px-4 py-3">{data?.Brand}</td>
                                                <td className="px-4 py-3">{data?.Description}</td>
                                                <td className="px-4 py-3">${data?.Price}</td>
                                                <td className="px-4 py-3 flex items-center justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={onUpdateProduct}
                                                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                    >
                                                        <FiEdit2
                                                            size={18}
                                                        />
                                                    </button>
                                                    {isUpdateModalOpen && <UpdateModal closeModal={closeUpdateModal} />}
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white ml-1 mr-1">{TotalProduct}</span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white ml-1 mr-1">{TotalProduct}</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <MdOutlineKeyboardArrowLeft
                                            size={20}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <MdOutlineKeyboardArrowRight
                                            size={20}
                                        />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Table