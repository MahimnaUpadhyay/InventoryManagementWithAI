"use client";

import React from "react";
import axios from "axios";
import { BASE_URL } from "@/app/utility/API_END_POINT/Base_URL.js";
import { getUserEndPoint } from "@/app/utility/API_END_POINT/Autho_End_Point.js";

import { FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

import UserAddModal from "./UserAddModal";

const UserTable = () => {

  const [User_Data, setUser_Data] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [isAddModalOpen, setisAddModalOpen] = React.useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;

  // Fetch Users
  const getUser = async () => {
    try {
      setLoading(true);

      const request = await axios.get(`${BASE_URL}${getUserEndPoint}`);
      const response = request.data.response;

      if (Array.isArray(response)) {
        setUser_Data(response);
      } else {
        setUser_Data(Object.values(response));
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(User_Data.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = User_Data.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Loading UI
  if (Loading) {
    return (
      <div className="flex w-full h-90 justify-center items-center gap-5">
        <div className="animate-bounce w-3 h-3 bg-primary-500 rounded-full"></div>
        <div className="animate-bounce w-3 h-3 bg-primary-500 rounded-full"></div>
        <div className="animate-bounce w-3 h-3 bg-primary-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <section className="w-full dark:bg-gray-900 sm:p-5">
        <div className="w-full shadow-md p-2 lg:px-12 rounded-md">
          <div className="w-full bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
              <form className="w-full md:w-1/2 flex items-center">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch color="gray" />
                  </div>
                  <input type="text" placeholder="Search"
                    className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg w-full pl-10 p-2 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </form>

              <button
                onClick={() => setisAddModalOpen(true)}
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg gap-2 hover:bg-accent"
              >
                Add User <FaPlus />
              </button>

              {isAddModalOpen && <UserAddModal closeModal={() => { setisAddModalOpen(false); getUser(); }} />}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-3">User ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((data) => (
                    <tr key={data.user_ID} className="border-b">
                      <td className="px-4 py-3">{data.user_ID}</td>
                      <td className="px-4 py-3">{data.User_Name}</td>
                      <td className="px-4 py-3">{data.User_Email}</td>
                      <td className="px-4 py-3">{data.User_Role}</td>
                      <td className="px-4 py-3">
                        <FiEdit2 size={18} className="cursor-pointer hover:text-blue-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination UI */}
            <div className="flex justify-between items-center p-4">
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex gap-2">
                <button onClick={prevPage} disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border disabled:opacity-50">
                  <MdOutlineKeyboardArrowLeft size={20} />
                </button>

                <button onClick={nextPage} disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border disabled:opacity-50">
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

export default UserTable;
