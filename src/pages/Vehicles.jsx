import React, { useState, useEffect } from "react";
import { bikes, cars } from "../constants";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Vehicles = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setQuantity(1);
  };

  const handleCloseModal = () => setSelectedVehicle(null);

  const handleBookNow = () => {
    if (selectedVehicle) {
      sessionStorage.setItem(
        "directBooking",
        JSON.stringify({ ...selectedVehicle, quantity })
      );
      navigate("/payment");
    }
  };

  const handleAddToCart = () => {
    if (selectedVehicle) {
      addToCart({ ...selectedVehicle, quantity });
      handleCloseModal();
    }
  };

  if (loading) return <Loader />;

  const Section = ({ title, data }) => (
    <motion.div
      className="mb-20"
      initial={hasAnimated ? false : { opacity: 0, y: 40 }}
      animate={hasAnimated ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => setHasAnimated(true)}
    >
      <h2 className="text-3xl font-bold text-center text-[#0F0E47] mb-10">
        {title}
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 md:px-20">
        {data.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleOpenModal(vehicle)}
            className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-purple-500/40"
          >
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="w-full h-48 object-contain rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-[#0F0E47] mb-2">
              {vehicle.title}
            </h3>
            <p className="text-gray-500 line-clamp-3 mb-2">
              {vehicle.description}
            </p>
            <p className="text-purple-600 font-bold">
              ₹{vehicle.pricePerHour || 120}/hr
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="pt-24 font-poppins bg-gray-50 min-h-screen">
      <Section title="Popular Bikes" data={bikes} />
      <Section title="Popular Cars" data={cars} />

      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-purple-600"
              >
                &times;
              </button>
              <div className="p-6 md:p-8">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.title}
                  className="w-full h-64 object-contain rounded-xl mb-6"
                />
                <h3 className="text-2xl font-bold text-[#0F0E47] mb-2">
                  {selectedVehicle.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedVehicle.description}
                </p>
                <p className="text-purple-600 font-bold text-lg mb-6">
                  ₹{selectedVehicle.pricePerHour || 120}/hr
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <label className="text-[#0F0E47] font-medium">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 px-2 py-1 border rounded-md text-center"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    className="w-full bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-xl font-semibold transition"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full bg-[#0F0E47] hover:bg-[#292864] text-white px-6 py-2 rounded-xl font-semibold transition"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vehicles;