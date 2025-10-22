import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FooterPage from "../components/FooterPage";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMessage } from "../features/contactSlice";

export const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMessage(formData));
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section
        className="relative bg-cover bg-center h-72 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dphm3tlqe/image/upload/v1760612146/img5_nq25ri.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-200">
            Home › <span className="text-green-400">Contact Us</span>
          </p>
        </div>
      </section>

      <div className="bg-white flex justify-center items-center px-5 py-16">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
          <div className="space-y-8 pl-7">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p className="text-gray-700">(123) 456-78-910</p>
              <p className="text-gray-700">Info.colorlib@gmail.com</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Address</h2>
              <p className="text-gray-700">
                96 Ernser Vista Suite 437, NY, United States
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Opentime</h2>
              <p className="text-gray-700">Monday – Friday</p>
              <p className="text-gray-800 font-semibold">8 am – 9 pm</p>
              <p className="text-gray-700 mt-3">Saturday – Sunday</p>
              <p className="text-gray-800 font-semibold">8 am – 9 pm</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Your question?</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-700 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-700 py-2"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-700 py-2"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="text-gray-900 font-semibold border-b-2 border-yellow-400 hover:border-gray-900 transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            </form>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
