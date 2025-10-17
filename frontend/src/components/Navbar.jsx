import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You’ll be logged out of your TravelVista account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      background: "#f9fafb",
      customClass: {
        title: "text-xl font-semibold text-gray-800",
        htmlContainer: "text-lg text-gray-700",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully. ✈️",
          icon: "success",
          confirmButtonColor: "#3b82f6",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            title: "text-xl font-semibold text-gray-800",
            htmlContainer: "text-lg text-gray-700",
          },
        });
      }
    });
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        <div
          className={`flex items-center gap-3 cursor-pointer`}
          onClick={() => navigate("/")}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full transition ${
              scrolled
                ? "bg-gradient-to-r from-teal-400 to-green-500"
                : "bg-white/20"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-4.33 -4.33 37.55 37.55"
              fill="currentColor"
              className="w-12 h-12 text-white transition-transform duration-300 hover:scale-110"
            >
              <path d="M24.91,11.595c-0.385-3.055-2.963-5.426-6.117-5.426c-1.51,0-2.873,0.559-3.946,1.453c-1.011-1.291-2.565-2.137-4.33-2.137 c-2.636,0-4.832,1.85-5.38,4.32C2.271,10.006,0,12.369,0,15.285c0,3.045,2.471,5.517,5.519,5.517c0.647,0,1.262-0.131,1.839-0.338 c1.005,1.381,2.62,2.287,4.456,2.287c0.675,0,1.314-0.137,1.911-0.359c0-0.432,0-3.252,0-6.122l-6.772,3.067v-0.97l1.749-1.481 v-1.428h0.763v0.779l1.622-1.373v-1.346h0.763v0.699l1.876-1.59c0-1.361,0-2.42,0-2.767c0-1.15,0.711-2.213,0.717-2.206 C14.449,7.647,15.16,8.71,15.16,9.86c0,0.347,0,1.405,0,2.767l1.876,1.59v-0.699h0.762v1.346l1.623,1.373v-0.779h0.762v1.428 l1.75,1.481v0.97l-6.772-3.067c0,2.474,0,4.907,0,5.812c0.959,0.812,2.18,1.32,3.534,1.32c2.203,0,4.09-1.303,4.975-3.17 c0.27,0.053,0.549,0.084,0.834,0.084c2.42,0,4.383-1.961,4.383-4.379C28.882,13.656,27.132,11.806,24.91,11.595z" />
            </svg>
          </div>

          <h1
            className={`text-2xl font-bold transition ${
              scrolled
                ? "text-teal-700 hover:text-green-600"
                : "text-white hover:text-gray-200"
            }`}
          >
            TravelVista
          </h1>
        </div>

        <div className="hidden md:flex md:space-x-10">
          <Link
            to="/about-us"
            className={`font-medium transition ${
              scrolled
                ? "text-gray-600 hover:text-gray-900"
                : "text-white hover:text-gray-200"
            }`}
          >
            About Us
          </Link>

          <a
            href="/destination-view"
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
