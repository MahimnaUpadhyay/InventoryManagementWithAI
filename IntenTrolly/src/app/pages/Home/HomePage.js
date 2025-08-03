import React from 'react';

// Components Import
import SalesOverview from './UI/SalesOverview';
import InventoryOverview from './UI/InventoryOverview';
import WarehouseOverview from './UI/WarehouseOverview';
import Chatbot from './UI/Chatbot';
import Todo from './UI/Todo';

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col w-full h-auto justify-center items-center">
        {/* Section 1 */}
        <div className="grid grid-cols-2 w-full h-auto place-items-center p-6 gap-5">
          {/* Sales Overview */}
          <SalesOverview />

          {/* Inventory Overview */}
          <InventoryOverview />
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-2 w-full h-auto place-items-center p-6 gap-5">
          {/* Warehouse Overview */}
          <WarehouseOverview />

          {/* Todo + Chatbot */}
          <div className="flex flex-col w-full h-auto justify-between items-center gap-5">
            {/* Todo List */}
            <Todo />

            {/* Chatbot */}
            <Chatbot />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
