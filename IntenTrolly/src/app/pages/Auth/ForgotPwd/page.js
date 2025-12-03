"use client";

import React from "react";
import axios from "axios";

import { BASE_URL } from "@/app/utility/API_END_POINT/Base_URL";
import { forgotPasswordEndpoint } from "@/app/utility/API_END_POINT/Autho_End_Point";

import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const router = useRouter();

  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");
  const [passwords, setPasswords] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}${forgotPasswordEndpoint}`,
        { email: userEmail }
      );

      toast.success(response?.data?.message || "Reset link sent to your email!");
      setStep(2);
    } catch (err) {
      toast.error("Email not found or server error");
    }

    setLoading(false);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return setLoading(false);
    }

    const token = new URLSearchParams(window.location.search).get("token");

    try {
      await axios.put(`${BASE_URL}${forgotPasswordEndpoint}`, {
        token,
        newPassword: passwords.newPassword,
        userEmail,
      });

      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Error resetting password.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--text)] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[var(--secondary)] shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

        {step === 1 && (
          <form className="space-y-4" onSubmit={handleEmailSubmit}>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 border rounded-lg outline-none focus:border-[var(--primary)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[var(--primary)] hover:bg-[var(--accent)] transition rounded-lg text-black font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={handleResetSubmit}>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="w-full p-2 border rounded-lg outline-none focus:border-[var(--primary)]"
            />

            <label className="block mb-1 font-medium">Retype Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              className="w-full p-2 border rounded-lg outline-none focus:border-[var(--primary)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[var(--primary)] hover:bg-[var(--accent)] transition rounded-lg text-black font-semibold"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>

      {/* Toast must be outside conditional forms */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ForgotPassword;
