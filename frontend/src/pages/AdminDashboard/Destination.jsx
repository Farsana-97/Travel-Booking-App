import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addDestination,
  deleteDestination,
  editDestination,
  fetchDestination,
} from "../../features/destinationSlice";
import { useSelector } from "react-redux";
import { Admin } from "./Admin";
import toast from "react-hot-toast";

export const Destination = () => {
  const dispatch = useDispatch();
  const { destinations, loading } = useSelector((state) => state.destination);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchDestination());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("country", country);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await dispatch(editDestination({ id: editId, data: formData }));
        toast.success("Destination updated successfully");
      } else {
        await dispatch(addDestination(formData));
        toast.success("New destination added successfully");
      }

      dispatch(fetchDestination());

      setName("");
      setCountry("");
      setDescription("");
      setImage(null);
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (d) => {
    setName(d.name);
    setCountry(d.country);
    setDescription(d.description);
    setImage(null);
    setEditId(d._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      dispatch(deleteDestination(id));
    }
  };

  return (
    <Admin>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Destination</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Destination Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Country Name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading
              ? editId
                ? "Updating..."
                : "Adding..."
              : editId
              ? "Update Destination"
              : "Add Destination"}
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-3">All Destinations</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Country</th>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.length > 0 ? (
                destinations.map((d) => (
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2">{d.name}</td>
                    <td className="border p-2">{d.country}</td>
                    <td className="border p-2">
                      <img
                        src={d.imageUrl}
                        alt={d.name}
                        className="w-20 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="border p-2">{d.description}</td>
                    <td className="border p-2 text-center space-x-2">
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        onClick={() => handleEdit(d)}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(d._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border p-2 text-center" colSpan="4">
                    No destinations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};
