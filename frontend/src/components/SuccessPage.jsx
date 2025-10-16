import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { fetchBookingById } from "../features/bookingSlice";

export const SuccessPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentBooking } = useSelector((state) => state.booking);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchBookingById(sessionId));
    }
  }, [dispatch, sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-100 px-4 relative">
      

      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-xl text-center relative overflow-hidden border border-green-300">
        <div className="flex justify-center -mt-8">
          <div className="bg-green-500 p-6 rounded-full text-white shadow-xl animate-bounce">
            <FaCheckCircle className="text-6xl md:text-7xl" />
          </div>
        </div>

        {loading ? (
          <p className="text-green-700 text-lg mt-6 animate-pulse">Updating payment status...</p>
        ) : error ? (
          <p className="text-red-600 text-lg mt-6">{error}</p>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mt-6 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Your booking has been confirmed. Thank you for your payment.
            </p>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl mb-8 shadow-inner text-left">
              <h3 className="font-bold text-green-800 text-xl mb-4">Booking Summary</h3>
              <p><span className="font-medium">Package:</span> {currentBooking?.package?.title}</p>
              <p><span className="font-medium">Booking Date:</span> {currentBooking?.bookingDate ? new Date(currentBooking.bookingDate).toLocaleDateString() : "N/A"}</p>
              <p><span className="font-medium">Total Amount:</span> ${currentBooking?.totalAmount}</p>
              <p><span className="font-medium">Travelers:</span> {currentBooking?.totalPersons}</p>
              <p><span className="font-medium">Status:</span> <span className="text-green-700 font-semibold">Paid</span></p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <button
                onClick={() => navigate(`/view-my-booking/${userId}`)}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md transform hover:scale-105"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition font-semibold shadow-md transform hover:scale-105"
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
