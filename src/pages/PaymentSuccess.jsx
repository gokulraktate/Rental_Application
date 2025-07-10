import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-poppins">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-[#0F0E47] mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your booking! Your ride is confirmed.
        </p>
        <Link to="/" className="inline-block">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
