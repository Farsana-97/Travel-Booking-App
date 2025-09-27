import React from "react";
import Navbar from "../components/Navbar";

export const Home = () => {
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

      <main className="container mx-auto px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <section className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr"></section>

          <section className="md:col-span-7 pt-10 px-8">
            <p className="text-orange-500 text-2xl font-serif mb-2 italic">
              Welcome to Travel Mate
            </p>
            <h2 className="text-6xl font-extrabold text-gray-800 leading-tight mb-8">
              It's time to start your adventure
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              A small river named Duden flows by their place and supplies it
              with the necessary regellalia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>

            <p className="text-gray-600 mb-10 leading-relaxed">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regellalia.
            </p>

            <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
              Search Destination
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};
