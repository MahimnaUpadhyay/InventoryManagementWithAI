import React from "react";

import Card from "@/app/components/Card";
import Header from "@/app/components/Header";
import UserTable from "./UI/UserTable";

import { FaUserCheck } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

const UserPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background p-8 gap-8">
      {/* Page Header */}
      <Header 
        PageHeader={'User Overview'}
        Subtext={'Track and Manage users efficiently'}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          Card_Title="Total Users"
          Icon={<FaUserCheck size={50} />}
          Card_Content="100 Users"
        />

        <Card
          Card_Title="Admin"
          Icon={<FaBuildingUser size={50} />}
          Card_Content="1 Admin"
        />

        <Card
          Card_Title="Total Manager"
          Icon={<FaUserTie size={50} />}
          Card_Content="10 Manager"
        />

        <Card
          Card_Title="Total Employeees"
          Icon={<FaUserFriends size={50} />}
          Card_Content="89 Employees"
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
