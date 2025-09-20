"use client";

import React, { useEffect, useState } from "react";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePencil,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineLockClosed,
} from "react-icons/hi";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ username: "", phone: "" });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedData = JSON.parse(storedUser || "{}");
    setUserData(parsedData);
    setEditValues({
      username: parsedData.username || "",
      phone: parsedData.phone || "",
    });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSave = () => {
    const updatedUser = { ...userData, ...editValues };
    setUserData(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  // Handle password change input
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Save password
  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Here you would call your backend API to update password securely
    console.log("Password updated:", passwordData);

    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordForm(false);
  };

  return (
    <div className="flex w-full h-[100vh] items-center justify-center bg-background p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 border-b pb-6">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl shadow-md">
            <HiOutlineUser size={50} />
          </div>

          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editValues.username}
              onChange={handleChange}
              className="text-2xl font-bold text-text border-b-2 border-primary focus:outline-none text-center"
            />
          ) : (
            <h2 className="text-2xl font-bold text-text">{userData.username}</h2>
          )}

          <span className="text-sm bg-secondary text-text px-3 py-1 rounded-full">
            {userData.role}
          </span>
        </div>

        {/* Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email (not editable) */}
          <div className="flex items-center gap-3">
            <HiOutlineMail size={22} className="text-primary" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-md font-medium text-text">{userData.email}</p>
            </div>
          </div>

          {/* Phone (editable) */}
          <div className="flex items-center gap-3">
            <HiOutlinePhone size={22} className="text-primary" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editValues.phone}
                  onChange={handleChange}
                  className="text-md font-medium text-text border-b-2 border-primary focus:outline-none"
                />
              ) : (
                <p className="text-md font-medium text-text">{userData.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 gap-3">
          {/* Left side: Change Password */}
          {showPasswordForm ? (
            <div className="flex flex-col w-full gap-3">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-md w-full"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-md w-full"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-md w-full"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handlePasswordSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <HiOutlineCheck /> Save
                </button>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  <HiOutlineX /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              <HiOutlineLockClosed />
              Change Password
            </button>
          )}

          {/* Right side: Edit Profile */}
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <HiOutlineCheck /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  <HiOutlineX /> Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-accent transition"
              >
                <HiOutlinePencil />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
