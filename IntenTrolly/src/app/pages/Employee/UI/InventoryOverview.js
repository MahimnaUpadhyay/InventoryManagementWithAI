// React import
import React from "react";

// Component Import
import Card from "@/app/components/Card";

// React Icons
import { MdInventory2 } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

const InventoryOverview = () => {
  return (
    <div className="flex flex-row justify-around items-center bg-white p-5 rounded-2xl shadow-md w-full h-full gap-5">
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
    </div>
  );
};

export default InventoryOverview;
