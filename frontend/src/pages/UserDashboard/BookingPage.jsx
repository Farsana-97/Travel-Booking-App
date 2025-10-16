import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../../features/bookingSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export const BookingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const packagePrice = location.state?.price || 0;

  const [formData, setFormData] = useState({
    userId: userId,
    packageId: id,
    totalPersons: "",
    travelDate: "",
    totalAmount: packagePrice,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (name === "totalPersons") {
      updated.totalAmount = Number(value) * packagePrice;
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        totalPersons: Number(formData.totalPersons),
        totalAmount: Number(formData.totalAmount),
      };

      const response = await dispatch(addBooking(payload)).unwrap();

      const bookingID = response.booking._id;
      navigate(`/payment-session/${bookingID}`);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dphm3tlqe/image/upload/v1760612157/hero2_weyuap.jpg)",
        }}
      >
        <div className="bg-white/90 shadow-2xl rounded-2xl w-full mt-12 max-w-lg p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-center text-teal-700 tracking-wide">
            Book Your Trip
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  From
                </label>
                <input
                  type="text"
                  placeholder="Enter source"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  To
                </label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Total Persons
              </label>
              <input
                type="number"
                name="totalPersons"
                placeholder="Total Persons"
                value={formData.totalPersons}
                onChange={handleChange}
                min="1"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Adults
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Children
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Total Amount
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
