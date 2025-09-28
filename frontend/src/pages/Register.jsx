import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(data));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>

      <div className="relative z-10 w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Create an Account ✈️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={data.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
