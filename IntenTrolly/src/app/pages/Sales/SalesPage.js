import React from 'react';
import SalesTable from './UI/SalesTable';
import Card from '@/app/components/Card';
import { FaShoppingCart, FaChartLine } from "react-icons/fa";
import Header from '@/app/components/Header';

const SalesPage = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] bg-background p-6 gap-6">
      <Header
        PageHeader={'Sale Overview'}
        Subtext={'Track and Manage sales efficiently'}
      />
      <div className="flex flex-row justify-around items-center bg-white p-5 rounded-2xl shadow-md w-full gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card
              Card_Title="Total Sales"
              Icon={<FaShoppingCart size={50} />}
              Card_Content="₹1.2M revenue"
            />
          </div>

          <div>
            <Card
              Card_Title="Monthly Growth"
              Icon={<FaChartLine size={50} />}
              Card_Content="+15% this month"
            />
          </div>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h2 className="text-xl font-semibold text-text mb-4">Sales Details</h2>
        <SalesTable />
      </div>
    </div>
  );
};

export default SalesPage;
