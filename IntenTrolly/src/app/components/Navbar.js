"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineInventory2 } from "react-icons/md";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

const Sidebar = ({ children }) => {
  const router = useRouter();

  const [UserData, setUserData] = React.useState([]);

  const onLogout = () => {
    // TODO: Implement logout logic
  };

  const onProfile = () => {
    router.push('/profile');
  };

  const onLogo = () => {
    router.push('/');
  };

  const onInventory = () => {
    router.push('/pages/Inventory');
  };

  const onSuppliers = () => {
    router.push('/pages/Suppliers');
  };

  const onSales = () => {
    router.push('/pages/Sales');
  };

  React.useEffect(() => {
    const storedUser = JSON.parse(sessionStorage?.getItem('user'));
    setUserData(storedUser);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-[#2f27ce] text-white shadow-sm flex flex-col justify-between">
        <div>
          <div
            className="flex items-center justify-center mt-6 cursor-pointer"
            onClick={onLogo}
          >
            <MdOutlineInventory2 size={50} color="white" />
            <span className="ml-3 text-2xl font-bold">InvenTrolly</span>
          </div> <hr  className='mt-5'/>

          <nav className="mt-10 flex flex-col">
            <button
              onClick={onLogo}
              className="px-6 py-3 text-left hover:bg-white hover:text-black w-full"
            >
              Dashboard
            </button>

            <button
              onClick={onInventory}
              className="px-6 py-3 text-left hover:bg-white hover:text-black w-full"
            >
              Inventory Management
            </button>

            <button
              onClick={onSuppliers}
              className="px-6 py-3 text-left hover:bg-white hover:text-black w-full"
            >
              Supplier Management
            </button>

            <button
              onClick={onSales}
              className="px-6 py-3 text-left hover:bg-white hover:text-black w-full"
            >
              Sales Forecasting
            </button>

            <button
              onClick={onSales}
              className="px-6 py-3 text-left hover:bg-white hover:text-black w-full"
            >
              User Management
            </button>
          </nav>
        </div>

        <div className="mb-6 px-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={onProfile}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded hover:bg-blue-300 hover:text-white w-full"
            >
              <HiOutlineUser size={20} />
              {UserData?.ExistingUser?.Username || 'Profile'}
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 w-full"
            >
              <HiOutlineLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Dynamic Content */}
      <main className="flex w-full h-auto justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
