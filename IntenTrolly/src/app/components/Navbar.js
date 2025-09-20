"use client";

// React import
import React from "react";

// Navigation import
import { useRouter } from "next/navigation";

// React icons
import { MdOutlineInventory2 } from "react-icons/md";
import { HiOutlineLogout, HiOutlineUser, HiOutlineHome } from "react-icons/hi";
import { FaBoxOpen, FaUsers, FaChartLine, FaTruck } from "react-icons/fa";

const Navbar = ({ children }) => {
  const router = useRouter();
  const [UserData, setUserData] = React.useState("");

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/pages/Auth/Login");
  };

  const onProfile = () => router.push("/pages/Profile");
  const onLogo = () => router.push("/pages/Home");
  const onInventory = () => router.push("/pages/Inventory");
  const onSuppliers = () => router.push("/pages/Suppliers");
  const onSales = () => router.push("/pages/Sales");
  const onUserManagement = () => router.push("/pages/User");

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parseData = JSON.parse(storedUser || "{}");
    setUserData(parseData?.username || "");
  }, []);

  const navItems = [
    { label: "Dashboard", icon: <HiOutlineHome size={20} />, onClick: onLogo },
    {
      label: "Inventory",
      icon: <FaBoxOpen size={20} />,
      onClick: onInventory,
    },
    {
      label: "Suppliers",
      icon: <FaTruck size={20} />,
      onClick: onSuppliers,
    },
    {
      label: "Sales Forecasting",
      icon: <FaChartLine size={20} />,
      onClick: onSales,
    },
    {
      label: "User Management",
      icon: <FaUsers size={20} />,
      onClick: onUserManagement,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-primary text-white shadow-lg flex flex-col justify-between rounded-r-xl">
        {/* Logo */}
        <div>
          <div
            className="flex items-center justify-center mt-6 cursor-pointer"
            onClick={onLogo}
          >
            <MdOutlineInventory2 size={45} />
            <span className="ml-2 text-2xl font-bold tracking-wide">
              InvenTrolly
            </span>
          </div>

          {/* Nav */}
          <nav className="mt-10 flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex items-center gap-3 px-6 py-3 text-left 
                  hover:bg-secondary hover:text-text transition-colors duration-200 rounded-lg mx-3"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User & Logout */}
        <div className="mb-6 px-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={onProfile}
              className="flex items-center gap-2 px-4 py-2 
                bg-white text-text rounded-lg shadow hover:bg-accent hover:text-white transition-colors duration-200"
            >
              <HiOutlineUser size={20} />
              {UserData || "Profile"}
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 
                bg-white text-text rounded-lg shadow hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              <HiOutlineLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Dynamic Content */}
      <main className="flex w-full h-auto justify-center items-center bg-background">
        {children}
      </main>
    </div>
  );
};

export default Navbar;
