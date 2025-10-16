import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking, fetchUserBooking } from "../../features/bookingSlice";
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

  const handleCancelBooking = (id, status) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking({ id, status }));
    }
    dispatch(fetchUserBooking(userId));
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-600 animate-pulse">
        Loading your bookings...
      </p>
    );
  if (error)
    return <p className="text-center mt-20 text-red-600 text-lg">{error}</p>;
  if (bookings.length === 0)
    return (
      <p className="text-center mt-20 text-lg text-gray-600">
        No bookings found yet.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />

      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dphm3tlqe/image/upload/v1760612146/img5_nq25ri.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 " />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
            My Bookings
          </h1>
          <p className="text-lg">
            Home ›{" "}
            <span className="text-yellow-400 font-semibold">Bookings</span>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-300 pb-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {b.package?.title}
                  </h2>
                  <p className="text-gray-700 flex items-center gap-2 text-lg">
                    <FaMapMarkerAlt className="text-blue-600" />
                    {b.package?.destination?.name}
                  </p>
                </div>

                <div
                  className={`mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold text-sm ${
                    b.bookingStatus === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : b.bookingStatus === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {b.bookingStatus.charAt(0).toUpperCase() +
                    b.bookingStatus.slice(1)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-lg">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <span className="font-semibold">Travel Date:</span>{" "}
                  {new Date(b.travelDate).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-blue-500" />
                  <span className="font-semibold">Total Persons:</span>{" "}
                  {b.totalPersons}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-500" />
                  <span className="font-semibold">Total Amount:</span> ₹
                  {b.totalAmount.toFixed(2)}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
                    Booking ID:
                  </span>{" "}
                  {b._id.slice(-8).toUpperCase()}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleCancelBooking(b._id, "cancelled")}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 shadow-md transition duration-300"
                >
                  Cancel Booking
                </button>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
