import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchPackageById } from "../../features/packageSlice";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export const PackageDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singlePackage, loading } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(fetchPackageById(id));
  }, [dispatch, id]);

  if (loading || !singlePackage) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading package details...
      </div>
    );
  }

  const handleViewDetails = () => {
    navigate(`/book-your-pkg/${id}`, {
      state: { price: singlePackage.price },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${
            singlePackage.images?.[0] || "https://via.placeholder.com/1200x500"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">
            {singlePackage.title}
          </h1>
          <p className="flex items-center justify-center gap-2 text-lg">
            <FaMapMarkerAlt className="text-red-400" />
            {singlePackage.destination?.name}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-12 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About this Package</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {singlePackage.description}
          </p>

          {singlePackage.images?.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery</h2>

              <div className="relative overflow-x-auto overflow-y-hidden flex gap-6 snap-x snap-mandatory px-2">
                {singlePackage.images.slice(0, 6).map((img, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 snap-center relative"
                  >
                    <img
                      src={img}
                      alt={`gallery-${idx}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
          <ol className="relative border-l border-gray-300 space-y-6 mb-10">
            {singlePackage.itinerary?.map((item, idx) => (
              <li key={idx} className="ml-6">
                <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5 mt-1.5"></div>
                <h4 className="font-medium text-gray-800">Day {idx + 1}</h4>
                <p className="text-gray-600">{item}</p>
              </li>
            ))}
          </ol>

          <Link
            to="/package-view"
            className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition"
          >
            <FaArrowLeft /> Back to Packages
          </Link>
        </div>

        <aside className="bg-white shadow-lg rounded-2xl p-8 sticky self-start w-full md:w-80 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 border-b pb-4">
            Book This Package
          </h3>

          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center gap-2 font-medium">
              <FaClock className="text-green-500" /> Duration
            </span>
            <span className="text-gray-900">
              {singlePackage.itinerary?.length || 0} Days /{" "}
              {singlePackage.itinerary?.length - 1 || 0} Nights
            </span>
          </div>

          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center gap-2 font-medium">
              <FaCalendarAlt className="text-green-500" /> Available From
            </span>
            <span className="text-gray-900 ">
              {new Date(singlePackage.availableFrom).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center gap-2 font-medium">
              <FaCalendarAlt className="text-green-500" /> Available To
            </span>
            <span className="text-gray-900">
              {new Date(singlePackage.availableTo).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold text-gray-900 border-t pt-4">
            <span>Price</span>
            <span className="text-green-600 text-xl font-bold">
              ${singlePackage.price?.toFixed(2)} / person
            </span>
          </div>

          <button
            onClick={handleViewDetails}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-md"
          >
            Book Now
          </button>
        </aside>
      </section>
    </div>
  );
};
