import React from "react";
import {FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Admin = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      <aside className="w-64 bg-gradient-to-b from-purple-700 via-pink-600 to-pink-400 text-white flex flex-col shadow-lg">
        <div className="p-6 text-center border-b border-white/20">
          <h1 className="text-2xl font-bold tracking-wide">TravelMate Admin</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/admin"
            className="w-full block text-left px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Dashboard
          </Link>
          <Link
            to="/destination"
            className="w-full block text-left px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Destinations
          </Link>
          <Link
            to="/packages"
            className="w-full block text-left px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Packages
          </Link>
          <Link
            to="/bookings"
            className="w-full block text-left px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Bookings
          </Link>
          <Link
            to="/payments"
            className="w-full block text-left px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Payments
          </Link>
        </nav>

        <div className="p-6 border-t border-white/20 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition rounded-xl">
          <FaSignOutAlt /> Logout
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
};
