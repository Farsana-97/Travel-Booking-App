import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking } from "../../features/bookingSlice";
import { Admin } from "./Admin";

export const Booking = () => {
  const dispatch = useDispatch();
  const { bookings} = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBooking());
  }, [dispatch]);

  return (
    <Admin>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">View Bookings</h2>

        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Package</th>
                <th className="border p-2 text-left">Total Persons</th>
                <th className="border p-2 text-left">Booking Date</th>
                <th className="border p-2 text-left">Travel Date</th>
                <th className="border p-2 text-left">Total Amount</th>
                <th className="border p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((x) => (
                <tr key={x._id} className="hover:bg-gray-50">
                  <td className="border p-2">{x.user?.username}</td>
                  <td className="border p-2">{x.package?.title}</td>
                  <td className="border p-2">{x.totalPersons}</td>
                  <td className="border p-2">
                    {new Date(x.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(x.travelDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">${x.totalAmount}</td>
                  <td className="border p-2 capitalize">
                    {x.bookingStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};
