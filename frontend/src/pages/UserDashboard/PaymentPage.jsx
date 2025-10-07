import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addPaymentSession } from "../../features/paymentSlice";
import { fetchBookingById } from "../../features/bookingSlice";
import Navbar from "../../components/Navbar";
import {
  FaPlaneDeparture,
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

export const PaymentPage = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { session, loading } = useSelector((state) => state.payment);
  const { currentBooking } = useSelector((state) => state.booking);
  const userId = localStorage.getItem("userId");
  console.log(userId, bookingId);

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingById(bookingId));
    }
  }, [bookingId, dispatch]);

  const handlePayment = () => {
    if (!userId || !bookingId) {
      alert("Booking Id or User Not Found");
      return;
    }
    dispatch(addPaymentSession({ userId, bookingId }));
  };

  useEffect(() => {
    if (session?.url) {
      window.location.href = session.url;
    }
  }, [session]);

  if (!currentBooking)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading booking details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16 px-4 flex justify-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Confirm Your Payment
          </h2>

          <div className="bg-gray-100 p-5 rounded-xl mb-8 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaPlaneDeparture className="text-indigo-500 text-xl" />
              <p>
                <strong>Package:</strong> {currentBooking.package?.title}
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaUser className="text-indigo-500 text-xl" />
              <p>
                <strong>User:</strong> {currentBooking.user?.username}
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaCalendarAlt className="text-indigo-500 text-xl" />
              <p>
                <strong>Travel Date:</strong>{" "}
                {new Date(currentBooking.travelDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaUsers className="text-indigo-500 text-xl" />
              <p>
                <strong>Total Persons:</strong> {currentBooking.totalPersons}
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaMoneyBillWave className="text-indigo-500 text-xl" />
              <p>
                <strong>Total Amount:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  ₹{currentBooking.totalAmount.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {loading ? (
            <button
              className="w-full bg-gray-400 py-3 rounded-xl text-white cursor-not-allowed"
              disabled
            >
              Processing...
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Pay Now
            </button>
          )}

          <p className="text-sm text-gray-500 text-center mt-4">
            Your payment is secure with 256-bit encryption.
          </p>
        </div>
      </section>
    </div>
  );
};
