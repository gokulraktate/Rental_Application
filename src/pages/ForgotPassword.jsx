// src/pages/ForgotPassword.jsx

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4fa] px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-[#0F0E47] mb-6">Forgot Password</h2>
        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#0F0E47] mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#505081]"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#505081] hover:bg-[#3e3e6f] text-white py-2 rounded-md text-lg font-semibold transition"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Back to{" "}
            <Link to="/login" className="text-[#505081] font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
