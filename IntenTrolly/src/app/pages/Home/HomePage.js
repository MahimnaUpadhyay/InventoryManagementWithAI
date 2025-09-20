import React from "react";

// Components Import
import SalesOverview from "./UI/SalesOverview";
import InventoryOverview from "./UI/InventoryOverview";
import SupplierOverview from "./UI/SupplierOverview";
import Chatbot from "./UI/Chatbot";
import Todo from "./UI/Todo";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-auto bg-background p-6 gap-6">
      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesOverview />
        <InventoryOverview />
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupplierOverview />

        <div className="flex flex-col gap-6">
          <Todo />
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
