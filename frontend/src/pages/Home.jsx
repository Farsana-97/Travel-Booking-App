import React from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestination } from "../features/destinationSlice";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Home = () => {
  const dispatch = useDispatch();
  const { destinations } = useSelector((state) => state.destination);
  useEffect(() => {
    dispatch(fetchDestination());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <section className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://png.pngtree.com/background/20250121/original/pngtree-a-small-cozy-village-in-switzerland-picture-image_15498851.jpg)",
          }}
        ></div>

        <div className="absolute inset-0  bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Explore the World with TravelMate
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 drop-shadow-md">
            Find your perfect destination and book your dream vacation easily
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl">
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full md:flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-300">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 px-10 py-16 gap-8 items-center">
        <div className="grid grid-cols-2 gap-2  place-items-center">
          <img
            src="https://picsum.photos/id/1015/400/400"
            alt="Activities"
            className="rounded-lg shadow-lg object-cover w-90 h-80"
          />
          <img
            src="https://picsum.photos/id/1016/400/400"
            alt="Travel"
            className="rounded-lg shadow-lg object-cover w-90 h-80"
          />
          <img
            src="https://picsum.photos/id/1018/400/400"
            alt="Guide"
            className="rounded-lg shadow-lg object-cover w-90 h-80"
          />
          <img
            src="https://picsum.photos/id/1020/400/400"
            alt="Location"
            className="rounded-lg shadow-lg object-cover w-90 h-80"
          />
        </div>

        <div>
          <p className="text-orange-500 text-2xl font-serif mb-2 italic">
            Welcome to Travel Mate
          </p>
          <h2 className="text-6xl font-extrabold text-gray-800 leading-tight mb-8">
            It's time to start your adventure
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            A small river named Duden flows by their place and supplies it with
            the necessary regellalia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>

          <p className="text-gray-600 mb-10 leading-relaxed">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regellalia.
          </p>
          <button className="mt-6 px-6 py-3 bg-orange-600 text-white font-medium rounded-md shadow hover:bg-orange-700 transition">
            Search Destination
          </button>
        </div>
      </section>

      <section id="destination" className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-500 font-medium uppercase tracking-widest">
              Top Selling
            </p>
            <h2 className="text-5xl font-serif text-indigo-900 mt-3 leading-snug">
              Top Destinations
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            {destinations.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2500 }}
                pagination={{ clickable: true }}
                navigation={true}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-10"
              >
                {destinations.map((d) => (
                  <SwiperSlide key={d._id || d.id}>
                    <div className="bg-white overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                      <img
                        src={d.imageUrl}
                        alt={d.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 pb-9">
                        <h2 className="text-lg font-serif">{d.name}</h2>
                        <p className="text-gray-600">{d.country}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="border p-2 text-center">No destinations found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
