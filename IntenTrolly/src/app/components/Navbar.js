"use client"

import React from 'react';

// NEXT NAVIGATION
import { useRouter } from 'next/navigation';

// React ICONS
import { MdOutlineInventory2 } from "react-icons/md";

const Navbar = () => {
  const router = useRouter();

  const [UserData, setUserData] = React.useState([])

  const onLogout = () => {
    //TODO 
  };

  const onProfile = () => {
    router.push('/profile')
  }

  const onLogo = () => {
    router.push('/')
  }

  const onInventory = () => {
    router.push('/pages/Inventory')
  }

  const onSuppliers = () => {
    router.push('/pages/Suppliers')
  }

  const onSales=()=>{
    router.push('/pages/Sales')
  }

  React.useEffect(() => {
    return () => {
      const storedUser = JSON.parse(sessionStorage?.getItem('user'));
      setUserData(storedUser)
    }
  }, [])


  return (
    <header className="text-gray-600 body-font">
      <div className="w-full flex flex-wrap p-5 flex-col md:flex-row justify-between items-center shadow-sm">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <div onClick={onLogo}>
            <MdOutlineInventory2 size={60} color="darkblue" />
          </div>
          <span className="ml-3 text-xl cursor-pointer">InvenTrolly</span>
        </a>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={onLogo}>Dashboard</a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={onInventory}>Inventory</a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={onSuppliers}>Suppliers</a>
          {/* <a className="mr-5 hover:text-gray-900 cursor-pointer">Wearhouse</a> */}
          <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={onSales}>Sales</a>
        </nav>

        <div className="flex flex-row justify-between items-center gap-2">
          <button
            onClick={onLogout}
            className="flex flex-row justify-center items-center w-24 h-10 p-2 bg-blue-700 hover:bg-blue-800 text-white text-md rounded-full"
          >
            Logout
          </button>
          <button
            onClick={onProfile}
            className="flex flex-row justify-center items-center w-24 h-10 p-2 bg-blue-700 hover:bg-blue-800 text-white text-md rounded-full">
            {/* {UserData?.ExistingUser?.Username} */}
            Profile
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
