import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestination } from "../../features/destinationSlice";

export const ViewDestination = () => {
  const dispatch = useDispatch();
  const { destinations, loading } = useSelector((state) => state.destination);

  useEffect(() => {
    dispatch(fetchDestination());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section
        className="relative bg-cover bg-center h-72 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dphm3tlqe/image/upload/v1760612031/img4_udfu8n.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Our Destinations</h1>
          <p className="text-gray-200">
            Home › <span className="text-green-400">Destinations</span>
          </p>
        </div>
      </section>

      <section id="destination" className="py-16">
        {loading && <p>Loading packages...</p>}
        <div className="max-w-7xl mx-auto px-6">
          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((d) => (
                <div
                  key={d.id}
                  className="bg-white shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-full bg-gray-100">
                    <img
                      src={d.imageUrl}
                      alt={d.name}
                      className="w-full h-95 object-cover"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-2xl font-semibold text-indigo-800">
                      {d.name}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-2">
                      {d.country}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="border p-3 text-center text-gray-600 rounded-md">
              No destinations found
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
