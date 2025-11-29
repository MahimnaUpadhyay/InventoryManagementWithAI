"use client"

import React from "react";

// Components Import
import SalesOverview from "./UI/SalesOverview";
import InventoryOverview from "./UI/InventoryOverview";
import SupplierOverview from "./UI/SupplierOverview";
import Chatbot from "./UI/Chatbot";
import Header from "@/app/components/Header";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-evenly bg-background p-6 gap-6">
      <Header
        PageHeader={'System Overview'}
        Subtext={'Track and Manage whole system efficiently'}
      />
      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesOverview />
        <InventoryOverview />
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupplierOverview />

        <div className="flex flex-col gap-6">
          {/* <Todo /> */}
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
