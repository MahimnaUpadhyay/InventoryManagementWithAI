// React import
import React from "react";
import axios from "axios";

// Component Import
import Card from "@/app/components/Card";

// React Icons
import { MdInventory2 } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";


// API ENDPOINTS IMPORT
import { BASE_URL } from "@/app/utility/API_END_POINT/Base_URL";
import { getProductEndPoint } from '@/app/utility/API_END_POINT/Product_End_Point'

const InventoryOverview = () => {

  const [ProductLength, sethProductLength] = React.useState([]);

  // Product Categories
  let productCategory = [
    "Fruits & Vegetables",
    "Oils & Fats",
    "Dairy",
    "Grains & Pulses",
    "Seafood",
    "Bakery",
    "Beverages"];

  // Count total Inventory
  const totalInventoryCount = async () => {
    try {
      const request = await axios.get(`${BASE_URL}${getProductEndPoint}`);
      const inventory_data = request.data.response;
      let productName = [];

      inventory_data.forEach(product => {
        productName.push(product.Product_Name);
      });

      sethProductLength(productName);
    } catch (error) {
      console.log("Error in total Inventory Count", error);
    }
  }

  React.useEffect(() => {
    totalInventoryCount();
  }, []);

  return (
    <div className="flex flex-row justify-around items-center bg-white p-5 rounded-2xl shadow-md w-full h-full gap-5">
      <Card
        Card_Title="Total Inventory"
        Icon={<MdInventory2 size={50} />}
        Card_Content={ProductLength.length}
      />
      <Card
        Card_Title="Total Categories"
        Icon={<BiSolidCategoryAlt size={50} />}
        Card_Content={productCategory.length}
      />
    </div>
  );
};

export default InventoryOverview;
