import React from "react";
import { Link } from "react-router-dom";
import { FaMotorcycle, FaRupeeSign, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import bikeLineupImage from "../assets/Images/home_bikes_line.png";
import carLineupImage from "../assets/Images/home_cars_line.png";
import PopularStrip from "../components/PopularStrip";
import MapSection from "../components/MapSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  return (
    <div className="pt-20 font-poppins overflow-hidden">
      {/* Bike Hero Image */}
      <motion.section
        className="w-full bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <motion.img
          src={bikeLineupImage}
          alt="Motorcycle Lineup"
          className="w-full max-h-[500px] object-contain mx-auto"
        />
      </motion.section>

      {/* Welcome Text */}
      <motion.section
        className="text-center px-4 py-10 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F0E47] mb-4">
          Welcome to RentDrive
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Your one-stop platform to rent premium bikes and cars with ease.
          We bring you flexibility, affordability, and a ride for every road.
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <Link to="/vehicles?type=bike">
            <button className="px-6 py-3 bg-[#505081] text-white rounded-lg hover:bg-[#272757] transition">
              Browse Bikes
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Car Hero Image */}
      <motion.section
        className="w-full bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <motion.img
          src={carLineupImage}
          alt="Car Lineup"
          className="w-full max-h-[500px] object-contain mx-auto"
        />
      </motion.section>

      {/* Car Text */}
      <motion.section
        className="text-center px-4 py-10 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F0E47] mb-4">
          Rent Powerful & Comfortable Cars
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          From city drives to weekend getaways — pick the perfect car for any journey.
        </p>
        <div className="mt-6">
          <Link to="/vehicles?type=car">
            <button className="px-6 py-3 bg-[#505081] text-white rounded-lg hover:bg-[#272757] transition">
              Browse Cars
            </button>
          </Link>
        </div>
      </motion.section>

      {/* 🗺️ Location Section with Google Map */}
      <motion.section
        className="bg-gray-100 py-10 px-4 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0F0E47]">Pickup & Drop Location</h2>
        <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
          All rentals are picked up and returned at our main location in Sanjivani College of Engineering.
        </p>
        <div className="flex justify-center">
          <iframe
            title="Pickup Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5714945202926!2d74.49224227468534!3d19.900308025579378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc4474a245d261%3A0x806a6b9889186a80!2sSanjivani%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1752071917832!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl border-4 border-[#505081] shadow-lg w-full max-w-4xl"
          ></iframe>
        </div>
      </motion.section>

      {/* PopularStrip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        viewport={{ once: true }}
      >
        <PopularStrip />
      </motion.div>

      {/* Services Section */}
      <motion.section
        className="bg-gray-50 py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-[#0F0E47]">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <motion.div
            className="p-6 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaMotorcycle className="text-4xl text-[#505081] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Vehicles</h3>
            <p className="text-gray-600">
              Choose from a wide selection of bikes & cars, always well-maintained and ready to go.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaRupeeSign className="text-4xl text-[#505081] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
            <p className="text-gray-600">
              Transparent pricing, no hidden charges. Pay only for what you use.
            </p>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaClock className="text-4xl text-[#505081] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexible Rentals</h3>
            <p className="text-gray-600">
              Rent by the hour, day, or week — your convenience is our priority.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
