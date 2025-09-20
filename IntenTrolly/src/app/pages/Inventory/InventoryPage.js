import React from "react";

import Card from "@/app/components/Card";
import InventoryTable from "./UI/InventoryTable";

import { MdInventory2 } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Header from "@/app/components/Header";

const InventoryPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background p-8 gap-8">
      {/* Page Header */}
      <Header 
        PageHeader={'Inventory Overview'}
        Subtext={'Track and Manage whole products efficiently'}
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          Card_Title="Total Inventory"
          Icon={<MdInventory2 size={50} />}
          Card_Content="10k products"
        />

        <Card
          Card_Title="Total Categories"
          Icon={<BiSolidCategoryAlt size={50} />}
          Card_Content="100 unique categories"
        />

        {/* Example placeholders for expansion */}
        <Card
          Card_Title="Low Stock Items"
          Icon={<MdInventory2 size={50} />}
          Card_Content="25 products"
        />

        <Card
          Card_Title="Out of Stock"
          Icon={<MdInventory2 size={50} />}
          Card_Content="5 products"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h2 className="text-xl font-semibold text-text mb-4">Inventory Details</h2>
        <InventoryTable />
      </div>
    </div>
  );
};

export default InventoryPage;
