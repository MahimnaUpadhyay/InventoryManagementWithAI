"use client"

import React from "react";
import axios from "axios";

import Card from "@/app/components/Card";
import InventoryTable from "./UI/InventoryTable";

import { MdInventory2 } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Header from "@/app/components/Header";

import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL';
import { getProductEndPoint } from '@/app/utility/API_END_POINT/Product_End_Point';

const InventoryPage = () => {

  const [ProductLength, setProductLength] = React.useState([]);
  const [lowStockCount, setLowStockCount] = React.useState(0);
  const [outOfStockCount, setOutOfStockCount] = React.useState(0);


  // Product Categories
  let productCategory = [
    "Fruits & Vegetables",
    "Oils & Fats",
    "Dairy",
    "Grains & Pulses",
    "Seafood",
    "Bakery",
    "Beverages"];

  const countLowStock = (inventory) => {
    return inventory.filter(item => item.Quantity > 0 && item.Quantity <= 10).length;
  };

  const countOutOfStock = (inventory) => {
    return inventory.filter(item => item.Quantity === 0).length;
  };

  // Count total Inventory
  const totalInventoryCount = async () => {
    try {
      const request = await axios.get(`${BASE_URL}${getProductEndPoint}`);
      const inventory_data = request.data.response;

      const productName = inventory_data.map(product => product.Product_Name);
      setProductLength(productName);

      setLowStockCount(countLowStock(inventory_data));
      setOutOfStockCount(countOutOfStock(inventory_data));

    } catch (error) {
      console.log("Error in total Inventory Count", error);
    }
  };

  React.useEffect(() => {
    totalInventoryCount();
  }, []);


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
          Card_Content={`${ProductLength.length} Products`}
        />

        <Card
          Card_Title="Total Categories"
          Icon={<BiSolidCategoryAlt size={50} />}
          Card_Content={`${productCategory.length} Products`}
        />

        <Card
          Card_Title="Low Stock Items"
          Icon={<MdInventory2 size={50} />}
          Card_Content={`${lowStockCount} Products`}
        />

        <Card
          Card_Title="Out of Stock"
          Icon={<MdInventory2 size={50} />}
          Card_Content={`${outOfStockCount} Products`}
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
