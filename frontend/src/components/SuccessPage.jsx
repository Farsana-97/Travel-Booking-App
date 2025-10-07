import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentStatus } from "../features/paymentSlice";

export const SuccessPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, updatePayment } = useSelector((state) => state.payment);
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (sessionId) {
      dispatch(updatePaymentStatus({ sessionId, status: "success" }));
    }
  }, [sessionId, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 px-4">
      {loading ? (
        <p className="text-green-700 text-lg mb-4">Updating payment status...</p>
      ) : error ? (
        <p className="text-red-600 mb-4">{error}</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h2>
          <p className="text-center mb-6 text-gray-700">
            Your booking has been confirmed. Thank you for your payment.
          </p>
          <button
            onClick={() => navigate(`/view-my-booking/${userId}`)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
          >
            View My Bookings
          </button>
        </>
      )}
    </div>
  );
};
