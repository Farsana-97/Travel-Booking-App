import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPackage } from "../../features/packageSlice";
import { fetchBooking } from "../../features/bookingSlice";
import { fetchPayments } from "../../features/paymentSlice";
import { FiBell, FiMessageSquare, FiSearch } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { logout } from "../../features/authSlice";


export const Admin = ({ children }) => {
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.package);
  const { users } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.booking);
  const { payments } = useSelector((state) => state.payment);

  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    dispatch(fetchPackage());
    // dispatch(fetchUsers());
    dispatch(fetchBooking());
    dispatch(fetchPayments());
  }, [dispatch]);

  useEffect(() => {
    const revenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0);
    setTotalRevenue(revenue);
  }, [payments]);

  const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };

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

<button onClick={handleLogout}>
        <div className="p-6 border-t border-white/20 flex items-center gap-2 cursor-pointer hover:bg-white/20 transition rounded-xl">
          <FaSignOutAlt /> Logout
        </div></button>
      </aside>

      {children ? (
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      ) : (
        <main className="flex-1 overflow-auto m-3">
          <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-80">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent border-none outline-none px-2 text-gray-700 w-full"
              />
            </div>

            <div className="flex items-center gap-5">
              <FiBell className="text-gray-600 text-xl" />
              <FiMessageSquare className="text-gray-600 text-xl" />
              <img
                src="https://via.placeholder.com/40"
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </header>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                <div className={`text-4xl text-blue-800 col mb-3`}><MdOutlineTravelExplore /></div>
                <h3 className="text-3xl  font-bold">{packages?.length || 0}</h3>
                <p className="text-gray-500 mt-1">Packages</p>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                <div className={`text-4xl text-cyan-500 col mb-3`}><BiSolidPlaneAlt /></div>
                <h3 className="text-3xl font-bold">{bookings?.length || 0}</h3>
                <p className="text-gray-500 mt-1">Booking</p>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                <div className={`text-4xl text-amber-800 col mb-3`}><RiMoneyRupeeCircleLine /></div>
                <h3 className="text-3xl font-bold"> ${totalRevenue}</h3>
                <p className="text-gray-500 mt-1">Total Revenue</p>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                <div className={`text-4xl col mb-3`}>hh</div>
                <h3 className="text-3xl font-bold">120</h3>
                <p className="text-gray-500 mt-1">vbn</p>
              </div>
            </div>
          </div>


          {/* Recent Bookings */}
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
                    <th className="border p-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    ?.slice(-5)
                    .reverse()
                    .map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50">
                        <td className="border p-2">
                          {b.user?.username || "Unknown"}
                        </td>
                        <td className="border p-2">
                          {b.package?.title || "Unknown"}
                        </td>
                        <td className="border p-2">${b.totalAmount || 0}</td>
                        <td
                          className={`border p-2 capitalize font-semibold ${
                            b.status === "confirmed"
                              ? "text-green-600"
                              : b.status === "cancelled"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {b.status || "pending"}
                        </td>
                        <td className="border p-2">
                          {new Date(b.bookingDate).toLocaleDateString() || "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

         
        </main>
      )}
    </div>
  );
};
