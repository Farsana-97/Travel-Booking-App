import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackage,
  fetchFilteredPackages,
} from "../../features/packageSlice";
import Navbar from "../../components/Navbar";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchDestination } from "../../features/destinationSlice";

export const PackagePage = () => {
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.package);
  const { destinations } = useSelector((state) => state.destination);

  const [filters, setFilters] = useState({
    destination: "",
    minPrice: "",
    maxPrice: "",
    title: "",
    availableFrom: "",
    availableTo: "",
  });

  useEffect(() => {
    dispatch(fetchPackage());
    dispatch(fetchDestination());
  }, [dispatch]);

  const handleFilter = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    dispatch(fetchFilteredPackages(activeFilters));
  };

  const handleClear = () => {
    setFilters({
      destination: "",
      minPrice: "",
      maxPrice: "",
      title: "",
      availableFrom: "",
      availableTo: "",
    });
    dispatch(fetchPackage());
  };

  return (
    <div>
      <Navbar />
      <section
        className="relative bg-cover bg-center h-72 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Our Packages</h1>
          <p>
            Home › <span className="text-green-400">Packages</span>
          </p>
        </div>
      </section>

      <section>
        <div className="flex gap-8 px-6 py-12">
          <aside className="w-1/4 bg-white p-6 rounded shadow space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Filter by Destination</h3>
              <select
                className="border p-2 w-full rounded"
                value={filters.destination}
                onChange={(e) =>
                  setFilters({ ...filters, destination: e.target.value })
                }
              >
                <option value="">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Filter by Price</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border p-2 w-1/2 rounded"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="border p-2 w-1/2 rounded"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Search by Title</h3>
              <input
                type="text"
                placeholder="e.g. Manali"
                className="border p-2 w-full rounded"
                value={filters.title}
                onChange={(e) =>
                  setFilters({ ...filters, title: e.target.value })
                }
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3">Available Date</h3>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="border p-2 w-1/2 rounded"
                  value={filters.availableFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, availableFrom: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="border p-2 w-1/2 rounded"
                  value={filters.availableTo}
                  onChange={(e) =>
                    setFilters({ ...filters, availableTo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleFilter}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Apply Filters
              </button>

              <button
                onClick={handleClear}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <main className="w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="font-semibold">{packages.length} Tour Packages</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-68 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      {p.destination?.name}
                    </div>
                    <h3 className="font-serif text-xl text-gray-950 mb-2">
                      {p.title}
                    </h3>

                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{p.price.toFixed(2)}{" "}
                        <span className="text-sm text-gray-500 font-normal">
                          /person
                        </span>
                      </p>

                      <Link
                        to={`/package-view/${p._id}`}
                        className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
                      >
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};
