import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "./Admin";
import { fetchPayments } from "../../features/paymentSlice";

export const Payments = () => {
  const dispatch = useDispatch();
  const { payments, loading } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  return (
    <Admin>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">View Payments</h2>

        {loading && <p>Loading payments...</p>}

        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Transaction ID</th>

                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Booking ID</th>
                <th className="border p-2 text-left">Amount</th>
                <th className="border p-2 text-left">Paymnet Method</th>
                <th className="border p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((x) => (
                <tr key={x._id} className="hover:bg-gray-50">
                  <td className="border p-2">{x.transactionId}</td>
                  <td className="border p-2">{x.user?.username}</td>
                  <td className="border p-2">{x.booking}</td>
                  <td className="border p-2">{x.amount}</td>
                  <td className="border p-2">{x.paymentMethod}</td>
                  <td className="border p-2">{x.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};
