import React from "react";

// Components Import
import SalesOverview from "./UI/SalesOverview";
import InventoryOverview from "./UI/InventoryOverview";

import Header from "@/app/components/Header";
import EmployeeOverview from "./UI/EmployeeOverview";
import Chatbot from "./UI/Chatbot";


const ManagerPage = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-evenly bg-background p-6 gap-6">
      <Header
        PageHeader={'Manager Dashboard'}
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
          <EmployeeOverview />
        </div>
        <div className="flex flex-col gap-6">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
