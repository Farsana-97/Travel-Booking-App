import React, { useEffect, useState } from "react";
import { FaUser, FaUsers, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchPackage } from "../../features/packageSlice";
import { fetchBooking } from "../../features/bookingSlice";
import { fetchPayments } from "../../features/paymentSlice";
import { FiBell, FiMessageSquare, FiSearch } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { fetchUsers, logout } from "../../features/authSlice";
import DashboardCharts from "../../components/DashboardCharts";
import Swal from "sweetalert2";

export const Admin = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages } = useSelector((state) => state.package);
  const { users } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.booking);
  const { payments } = useSelector((state) => state.payment);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPackage());
    dispatch(fetchUsers());
    dispatch(fetchBooking());
    dispatch(fetchPayments());
  }, [dispatch]);

  useEffect(() => {
    const revenue = bookings?.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    setTotalRevenue(revenue);
  }, [bookings]);

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
   <div className="flex bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
  <aside
    className={`fixed md:static top-0 left-0 h-screen md:h-auto md:min-h-screen w-64 bg-gradient-to-b from-purple-700 via-pink-600 to-pink-400 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-20 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 text-center border-b border-white/20">
          <h1 className="text-3xl font-extrabold tracking-wide text-amber-50">
            TravelVista
          </h1>
          <p className="font-bold">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link
            to="/admin"
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Dashboard
          </Link>
          <Link
            to="/destination"
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Destinations
          </Link>
          <Link
            to="/packages"
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Packages
          </Link>
          <Link
            to="/bookings"
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Bookings
          </Link>
          <Link
            to="/payments"
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Payments
          </Link>
          <Link
            to="/users-view"
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Users
          </Link>
          <button
            onClick={handleLogout}
            className="w-full block text-left px-4 py-2 rounded-xl text-lg font-serif hover:bg-white/20"
          >
            Logout
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 overflow-auto m-3">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700 text-2xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>

            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-64 md:w-80">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent border-none outline-none px-2 text-gray-700 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <FiBell className="text-gray-600 text-xl" />
            <FiMessageSquare className="text-gray-600 text-xl" />
            <FaUser className="text-gray-600 text-xl" />
          </div>
        </header>

        {!children && (
          <>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl text-blue-800 mb-3">
                    <MdOutlineTravelExplore />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {packages?.length || 0}
                  </h3>
                  <p className="text-gray-500 mt-1">Packages</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl text-cyan-500 mb-3">
                    <BiSolidPlaneAlt />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {bookings?.length || 0}
                  </h3>
                  <p className="text-gray-500 mt-1">Bookings</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl text-amber-800 mb-3">
                    <RiMoneyRupeeCircleLine />
                  </div>
                  <h3 className="text-3xl font-bold">${totalRevenue}</h3>
                  <p className="text-gray-500 mt-1">Total Revenue</p>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl text-green-900 mb-3">
                    <FaUsers />
                  </div>
                  <h3 className="text-3xl font-bold">{users?.length || 0}</h3>
                  <p className="text-gray-500 mt-1">Users</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <DashboardCharts bookings={bookings} payments={payments} />
            </div>
               <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Bookings
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">User</th>
                    <th className="border p-2 text-left">Package</th>
                    <th className="border p-2 text-left">Total Amount</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    ?.slice(-5)
                    .reverse()
                    .map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50">
                        <td className="border p-2">{b.user?.username}</td>
                        <td className="border p-2">{b.package?.title}</td>
                        <td className="border p-2">${b.totalAmount}</td>
                        <td
                          className={`border p-2 capitalize font-semibold ${
                            b.bookingStatus === "confirmed"
                              ? "text-green-600"
                              : b.bookingStatus === "cancelled"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {b.bookingStatus}
                        </td>
                        <td className="border p-2">
                          {new Date(b.bookingDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}

        {children && <div className="p-8">{children}</div>}
      </main>
    </div>
  );
};
