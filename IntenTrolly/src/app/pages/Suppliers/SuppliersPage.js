"use client"

import React from 'react';

import SupplierTable from './UI/SupplierTable';
import Card from '@/app/components/Card';
import { FaUsers, FaTruck } from "react-icons/fa";
import Header from '@/app/components/Header';

import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL'
import { getSupplierEndPoint } from '@/app/utility/API_END_POINT/Supplier_End_Point'
import axios from 'axios';


const SuppliersPage = () => {

  const [SupplierLength, setSupplierLength] = React.useState([]);

  // Count total no of supplier
  const totalSupplierLength = async () => {
    try {
      const request = await axios.get(`${BASE_URL}${getSupplierEndPoint}`);
      const supplier_data = request?.data?.response;
      const supplier_name = supplier_data.map(supplier => (supplier.supplierName));
      setSupplierLength(supplier_name);
    } catch (error) {
      console.log("There is an error in total supplier length function", error);
    }
  }

  React.useEffect(() => {
    totalSupplierLength();
  }, []);

  return (
    <div className="flex flex-col w-full h-[100vh] bg-background p-6 gap-6">
      <Header
        PageHeader={'Supplier Overview'}
        Subtext={'Track and Manage supplier efficiently'}
      />
      <div className="flex flex-row justify-around items-center bg-white p-5 rounded-2xl shadow-md w-full gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card
              Card_Title="Total Suppliers"
              Icon={<FaUsers size={50} />}
              Card_Content={`${SupplierLength.length} suppliers`}
            />
          </div>

          <div>
            <Card
              Card_Title="Active Deliveries"
              Icon={<FaTruck size={50} />}
              Card_Content="42 in progress"
            />
          </div>
        </div>
      </div>

      {/* Supplier Data Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h2 className="text-xl font-semibold text-text mb-4">Supplier Details</h2>
        <SupplierTable />
      </div>
    </div>
  );
};

export default SuppliersPage;
