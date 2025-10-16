import React from "react";
import Navbar from "../components/Navbar";
import {
  FaCalendarAlt,
  FaGlobe,
  FaMapMarkedAlt,
  FaParachuteBox,
  FaSmile,
  FaUsers,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FooterPage from "../components/FooterPage";

export const AboutUs = () => {
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
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-gray-200">
            Home › <span className="text-green-400">About Us</span>
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6">
          <div className="order-1 lg:order-none">
            <img
              src="https://res.cloudinary.com/dphm3tlqe/image/upload/v1760611988/image3_zwqkuh.jpg"
              alt="Scenic Village"
              className="w-full h-[550px] object-cover shadow-lg"
            />
          </div>

          <div className="space-y-5">
            <p className="text-orange-500 font-semibold uppercase tracking-wide">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Explore All Corners of <br /> The World With Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-orange-600 transition-all duration-300">
              Read More
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-white to-green-50 overflow-hidden">
        <div className="absolute top-[35%] w-full hidden md:block z-0">
          <svg
            className="w-full h-40"
            viewBox="0 0 2000 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              d="M 100 100 Q 400 0 700 100 T 1100 100 T 1500 100 T 1900 100"
              stroke="#6EE7B7"
              strokeWidth="2"
              strokeDasharray="8 8"
              fill="transparent"
            />
          </svg>
        </div>

        <div className="text-center mb-16 relative z-10">
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
            Our Step by Step
          </h2>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
          <div className="flex-1 text-center relative">
            <div className="relative inline-block">
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow-md">
                1
              </div>
              <div className="w-24 h-24 flex items-center justify-center border-2 border-green-400 rounded-full mx-auto mb-6 bg-white shadow-lg">
                <FaMapMarkedAlt className="text-green-600 text-4xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Select Package
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              In a free hour, when our power of choice is untrammelled and when
              nothing prevents dolor sit amet, consectetur.
            </p>
          </div>

          <div className="flex-1 text-center relative">
            <div className="relative inline-block">
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow-md">
                2
              </div>
              <div className="w-24 h-24 flex items-center justify-center border-2 border-green-400 rounded-full mx-auto mb-6 bg-white shadow-lg">
                <FaUsers className="text-green-600 text-4xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Make An Booking
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Integer feugiat tortor non, there are many other nullam. In a free
              hour, when our power of choice is untrammelled.
            </p>
          </div>

          <div className="flex-1 text-center relative">
            <div className="relative inline-block">
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow-md">
                3
              </div>
              <div className="w-24 h-24 flex items-center justify-center border-2 border-green-400 rounded-full mx-auto mb-6 bg-white shadow-lg">
                <FaSmile className="text-green-600 text-4xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Enjoy Your Trip
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              In a free hour, when our power of choice is untrammelled and when
              nothing prevents non there.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-white to-green-50 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex gap-6 flex-1 justify-center">
            <div className="flex flex-col gap-6">
              <img
                src="https://res.cloudinary.com/dphm3tlqe/image/upload/v1759406671/TravelImages/s39d7zjtehop4knh7zri.jpg"
                alt="Castle"
                className="w-48 h-64 md:w-56 md:h-72 object-cover rounded-[3rem]"
              />
              <img
                src="https://res.cloudinary.com/dphm3tlqe/image/upload/v1759403681/TravelImages/ft63lbxf2ovb53zratij.jpg"
                alt="Beach"
                className="w-48 h-64 md:w-56 md:h-72 object-cover rounded-[3rem]"
              />
            </div>
            <img
              src="https://res.cloudinary.com/dphm3tlqe/image/upload/v1760611962/image1_qjfmie.jpg"
              alt="Eiffel Tower"
              className="w-48 h-[35rem] md:w-84 md:h-[37rem] object-cover rounded-[3rem]"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Get The <span className="text-green-600 italic">Best Travel</span>{" "}
              Experience With Gotur
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto md:mx-0 mb-8">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-3 p-4 bg-green-100/50 rounded-xl border border-green-200 hover:bg-green-100 transition">
                <FaMapMarkedAlt className="text-green-600 text-2xl" />
                <span className="font-semibold text-gray-700 text-sm">
                  Trusted Travel Guide
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-100/50 rounded-xl border border-green-200 hover:bg-green-100 transition">
                <FaCalendarAlt className="text-green-600 text-2xl" />
                <span className="font-semibold text-gray-700 text-sm">
                  Instant Booking
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-100/50 rounded-xl border border-green-200 hover:bg-green-100 transition">
                <FaGlobe className="text-green-600 text-2xl" />
                <span className="font-semibold text-gray-700 text-sm">
                  World Class Travel
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-100/50 rounded-xl border border-green-200 hover:bg-green-100 transition">
                <FaParachuteBox className="text-green-600 text-2xl" />
                <span className="font-semibold text-gray-700 text-sm">
                  Adventure
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-white to-green-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 relative z-10">
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
              Recent Client Reviews
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 w-full">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
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
                <SwiperSlide>
                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative">
                    <FaQuoteLeft className="text-green-600 text-2xl mx-auto mb-4" />
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-green-100 overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="Courtney Henry"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Courtney Henry
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Consectetur adipiscing elit. Integer nunc viverra laoreet
                      est the is porta pretium metus aliquam eget maecenas porta
                      is nunc viverra Aenean pulvinar maximus leo.
                    </p>
                    <div className="flex justify-center text-orange-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative">
                    <FaQuoteLeft className="text-green-600 text-2xl mx-auto mb-4" />
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-green-100 overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Jacob Jones"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Jacob Jones
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Consectetur adipiscing elit. Integer nunc viverra laoreet
                      est the is porta pretium metus aliquam eget maecenas porta
                      is nunc viverra Aenean pulvinar maximus leo.
                    </p>
                    <div className="flex justify-center text-orange-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </SwiperSlide>

                {/* Testimonial 3 */}
                <SwiperSlide>
                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative">
                    <FaQuoteLeft className="text-green-600 text-2xl mx-auto mb-4" />
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-green-100 overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/25.jpg"
                        alt="Eleanor Pena"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Eleanor Pena
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Consectetur adipiscing elit. Integer nunc viverra laoreet
                      est the is porta pretium metus aliquam eget maecenas porta
                      is nunc viverra Aenean pulvinar maximus leo.
                    </p>
                    <div className="flex justify-center text-orange-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative">
                    <FaQuoteLeft className="text-green-600 text-2xl mx-auto mb-4" />
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-green-100 overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/25.jpg"
                        alt="Eleanor Pena"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Eleanor Pena
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Consectetur adipiscing elit. Integer nunc viverra laoreet
                      est the is porta pretium metus aliquam eget maecenas porta
                      is nunc viverra Aenean pulvinar maximus leo.
                    </p>
                    <div className="flex justify-center text-orange-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <FooterPage />
    </div>
  );
};
