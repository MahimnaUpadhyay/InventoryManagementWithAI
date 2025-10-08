import React from "react";

// Components Import
import SalesOverview from "./UI/SalesOverview";
import InventoryOverview from "./UI/InventoryOverview";
import CategoryOverview from "./UI/CategoryOverview";
import Chatbot from "./UI/Chatbot";
import Header from "@/app/components/Header";


const EmployeePage = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div>
          <CategoryOverview />
        </div>

        <div className="flex flex-col gap-6">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
