import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking, fetchBooking } from "../../features/bookingSlice";
import { Admin } from "./Admin";

export const Booking = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    dispatch(fetchBooking(status));
  }, [dispatch, status]);

  const handleStatusChange = (id, status) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking({ id, status }));
      dispatch(fetchBooking()); 
    }
  };

  return (
    <Admin>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Bookings</h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Package</th>
                <th className="border p-2 text-left">Persons</th>
                <th className="border p-2 text-left">Booking Date</th>
                <th className="border p-2 text-left">Travel Date</th>
                <th className="border p-2 text-left">Amount</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center p-4">Loading...</td>
                </tr>
              ) : bookings?.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-4">No bookings found</td>
                </tr>
              ) : (
                bookings.map((x) => (
                  <tr key={x._id} className="hover:bg-gray-50">
                    <td className="border p-2">{x.user?.username}</td>
                    <td className="border p-2">{x.package?.title}</td>
                    <td className="border p-2">{x.totalPersons}</td>
                    <td className="border p-2">{new Date(x.bookingDate).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(x.travelDate).toLocaleDateString()}</td>
                    <td className="border p-2">₹{x.totalAmount}</td>
                    <td
                      className={`border p-2 capitalize font-semibold ${
                        x.bookingStatus === "confirmed"
                          ? "text-green-600"
                          : x.bookingStatus === "cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {x.bookingStatus}
                    </td>
                    <td className="border p-2">
                      {x.bookingStatus !== "cancelled" && (
                        <button
                          onClick={() => handleStatusChange(x._id, "cancelled")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};
