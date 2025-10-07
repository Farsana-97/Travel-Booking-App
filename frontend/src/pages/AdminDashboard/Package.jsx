import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackage,
  editPackage,
  deletePackage,
  addPackage,
} from "../../features/packageSlice";
import { fetchDestination } from "../../features/destinationSlice";
import { Admin } from "./Admin";

export const Package = () => {
  const dispatch = useDispatch();
  const { packages, loading } = useSelector((state) => state.package);
  const { destinations } = useSelector((state) => state.destination);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    description: "",
    itinerary: "",
    price: "",
    availableFrom: "",
    availableTo: "",
    images: null,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchPackage());
    dispatch(fetchDestination());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const itineraryArray = formData.itinerary.split(",").map((i) => i.trim());

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      } else if (key === "itinerary") {
        data.append(key, JSON.stringify(itineraryArray));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (editId) {
      dispatch(editPackage({ id: editId, data })).then(() => {
        setEditId(null);
        resetForm();
      });
    } else {
      dispatch(addPackage(data)).then(() => resetForm());
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      destination: "",
      description: "",
      itinerary: "",
      price: "",
      availableFrom: "",
      availableTo: "",
      images: null,
    });
  };

  return (
    <Admin>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Packages</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 border p-6 rounded-md shadow-md mb-8 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />

            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Destination</option>
              {destinations?.map((dest) => (
                <option key={dest._id} value={dest._id}>
                  {dest.name} ({dest.country})
                </option>
              ))}
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <div className="flex gap-2">
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="date"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="itinerary"
            placeholder="Itinerary (comma separated)"
            value={formData.itinerary}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            {editId ? "Update Package" : "Add Package"}
          </button>
        </form>

        {loading && <p>Loading packages...</p>}

        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Destination</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Itinerary</th>
                <th className="border p-2 text-left">Images</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Available</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages?.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-gray-50">
                  <td className="border p-2">{pkg.title}</td>
                  <td className="border p-2">{pkg.destination?.name}</td>
                  <td className="border p-2">{pkg.description}</td>
                  <td className="border p-2">{pkg.itinerary.join(", ")}</td>
                  <td className="border p-2 flex gap-2 flex-wrap">
                    {pkg.images?.[0] && (
                      <img
                        src={pkg.images[0]}
                        alt=""
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border p-2">${pkg.price}</td>
                  <td className="border p-2">
                    {new Date(pkg.availableFrom).toLocaleDateString()} -{" "}
                    {new Date(pkg.availableTo).toLocaleDateString()}
                  </td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setEditId(pkg._id);
                        setFormData({
                          title: pkg.title,
                          destination: pkg.destination?._id || "",
                          description: pkg.description,
                          itinerary: pkg.itinerary.join(", "),
                          price: pkg.price,
                          availableFrom: pkg.availableFrom?.slice(0, 10),
                          availableTo: pkg.availableTo?.slice(0, 10),
                          images: pkg.images,
                        });
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deletePackage(pkg._id))}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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
