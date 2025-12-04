"use client";

import React from "react";
import axios from "axios";

import Card from "@/app/components/Card";
import Header from "@/app/components/Header";
import UserTable from "./UI/UserTable";

import { FaUserCheck } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

import { BASE_URL } from "@/app/utility/API_END_POINT/Base_URL";
import { getUserEndPoint } from "@/app/utility/API_END_POINT/Autho_End_Point";

const UserPage = () => {
  const [TotalUser, setTotalUser] = React.useState([]);
  const [TotalManager, setTotalManager] = React.useState([]);
  const [TotalEmployee, setTotalEmployee] = React.useState([]);

  const countTotalUser = async () => {
    try {
      const response = await axios(`${BASE_URL}${getUserEndPoint}`);
      const user_data = response.data.response;

      setTotalUser(user_data);

      // Separate roles
      const managers = user_data.filter(user => user.User_Role === "Manager");
      const employees = user_data.filter(user => user.User_Role === "Employee");

      setTotalManager(managers);
      setTotalEmployee(employees);

    } catch (error) {
      console.log("There is an error in countTotalUser function", error);
    }
  };

  React.useEffect(() => {
    countTotalUser();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background p-8 gap-8">
      {/* Page Header */}
      <Header
        PageHeader={"User Overview"}
        Subtext={"Track and Manage users efficiently"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          Card_Title="Total Users"
          Icon={<FaUserCheck size={50} />}
          Card_Content={`${TotalUser.length} Users`}
        />

        <Card
          Card_Title="Admin"
          Icon={<FaBuildingUser size={50} />}
          Card_Content="1 Admin"
        />

        <Card
          Card_Title="Total Manager"
          Icon={<FaUserTie size={50} />}
          Card_Content={`${TotalManager.length} Managers`}
        />

        <Card
          Card_Title="Total Employees"
          Icon={<FaUserFriends size={50} />}
          Card_Content={`${TotalEmployee.length} Employees`}
        />
      </div>

      {/* User Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h2 className="text-xl font-semibold text-text mb-4">User Details</h2>
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
