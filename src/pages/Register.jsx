import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Force logout after successful registration
      await auth.signOut();

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4fa] px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-[#0F0E47] mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#0F0E47] mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#505081]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F0E47] mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#505081]"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#505081] hover:bg-[#3e3e6f] text-white py-2 rounded-md text-lg font-semibold transition"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#505081] font-medium hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
