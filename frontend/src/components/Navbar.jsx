import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        <h1
          onClick={() => navigate("/")}
          className={`text-2xl font-bold cursor-pointer transition ${
            scrolled
              ? "text-teal-700 hover:text-green-600"
              : "text-white hover:text-gray-200"
          }`}
        >
          🏞️ TravelMate
        </h1>

        <div className="hidden md:flex md:space-x-10">
          <a
            href="/destination"
            className={`font-medium transition ${
              scrolled
                ? "text-gray-600 hover:text-gray-900"
                : "text-white hover:text-gray-200"
            }`}
          >
            About Us
          </a>
          <a
            href="#pricing"
            className={`font-medium transition ${
              scrolled
                ? "text-gray-600 hover:text-gray-900"
                : "text-white hover:text-gray-200"
            }`}
          >
            Destinations
          </a>
          <a
            href="/package-view"
            className={`font-medium transition ${
              scrolled
                ? "text-gray-600 hover:text-gray-900"
                : "text-white hover:text-gray-200"
            }`}
          >
            Packages
          </a>
          <a
            href="/"
            className={`font-medium transition ${
              scrolled
                ? "text-gray-600 hover:text-gray-900"
                : "text-white hover:text-gray-200"
            }`}
          >
            Contact Us
          </a>
        </div>

        <div className="flex gap-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold hover:scale-105 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold hover:scale-105 transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
