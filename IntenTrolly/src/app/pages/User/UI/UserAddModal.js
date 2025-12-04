"use client";

import React from "react";
import axios from "axios";
import { BASE_URL } from "@/app/utility/API_END_POINT/Base_URL";
import { postUserEndPoint } from "@/app/utility/API_END_POINT/Autho_End_Point";

import { FaPlus, FaTimes } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserAddModal = ({ closeModal }) => {
  const [addUserData, setAddUserData] = React.useState({
    User_Name: "",
    User_Email: "",
    User_Password: "",
    User_Role: "Employee",
  });

  // Add User Handler
  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}${postUserEndPoint}`,
        addUserData
      );

      if (response.data?.success) {
        toast.success("User added successfully!");
        setAddUserData({
          User_Name: "",
          User_Email: "",
          User_Password: "",
          User_Role: "Employee",
        });
      } else {
        toast.error(response.data?.message || "Failed to add user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60">
      <div className="relative p-6 w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg">

        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-600">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add User
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={closeModal}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-6">
          <div className="flex items-center">
            <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Name:</label>
            <input
              type="text"
              value={addUserData.User_Name}
              onChange={(e) => setAddUserData({ ...addUserData, User_Name: e.target.value })}
              className="w-2/3 p-2 text-lg border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter full name"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Email:</label>
            <input
              type="email"
              value={addUserData.User_Email}
              onChange={(e) => setAddUserData({ ...addUserData, User_Email: e.target.value })}
              className="w-2/3 p-2 text-lg border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter email"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Password:</label>
            <input
              type="password"
              value={addUserData.User_Password}
              onChange={(e) => setAddUserData({ ...addUserData, User_Password: e.target.value })}
              className="w-2/3 p-2 text-lg border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Enter password"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-lg text-gray-700 dark:text-gray-300">Role:</label>
            <select
              value={addUserData.User_Role}
              onChange={(e) => setAddUserData({ ...addUserData, User_Role: e.target.value })}
              className="w-2/3 p-2 text-lg border rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 border-t pt-4 dark:border-gray-600">
          <button
            onClick={addUser}
            className="flex items-center justify-center w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg gap-2"
          >
            <FaPlus className="w-4 h-4" /> Add User
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default UserAddModal;
