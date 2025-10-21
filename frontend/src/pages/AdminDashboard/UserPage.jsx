import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "./Admin";
import { deleteUser, fetchUsers } from "../../features/authSlice";

export const UserPage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(id));
      }
    };

  return (
    <Admin>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">View Users</h2>

        {loading && <p>Loading users...</p>}

        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Username</th>

                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((x) => (
                <tr key={x._id} className="hover:bg-gray-50">
                  <td className="border p-2">{x.username}</td>
                  <td className="border p-2">{x.email}</td>
                  <td className="border p-2">
                    <button
                        onClick={() => handleDelete(x._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};
