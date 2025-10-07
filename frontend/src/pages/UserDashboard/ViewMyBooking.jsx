import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBooking } from "../../features/bookingSlice";
import Navbar from "../../components/Navbar";
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const ViewMyBooking = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) dispatch(fetchUserBooking(userId));
  }, [dispatch, userId]);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-600 animate-pulse">
        Loading bookings...
      </p>
    );
  if (error)
    return <p className="text-center mt-20 text-red-600 text-lg">{error}</p>;
  if (bookings.length === 0)
    return (
      <p className="text-center mt-20 text-lg text-gray-600">
        No bookings found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section
        className="relative bg-cover bg-center h-72 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p>
            Home › <span className="text-green-400">My Bookings</span>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-2xl transition duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {b.package?.title}
                  </h2>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    {b.package?.destination?.name || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt className="text-indigo-500" />
                    Travel Date: {new Date(b.travelDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaUsers className="text-indigo-500" />
                    Total Persons: {b.totalPersons}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-500" />
                    Total Amount: ₹{b.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <p
                className={`mt-4 md:mt-0 font-semibold text-lg ${
                  b.bookingStatus === "confirmed"
                    ? "text-green-600"
                    : b.bookingStatus === "cancelled"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                Status:{" "}
                {b.bookingStatus.charAt(0).toUpperCase() +
                  b.bookingStatus.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
