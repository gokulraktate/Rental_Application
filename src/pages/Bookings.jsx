import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bookSelected = () => {
    const selectedVehicles = cart.filter((item) =>
      selectedIds.includes(item.cartItemId)
    );

    if (selectedVehicles.length === 0) {
      setShowAlert(true);
      return;
    }

    const paymentData = selectedVehicles.map((v) => ({
      ...v,
      totalPrice: (v.pricePerHour || 1) * (v.quantity || 1),
    }));

    // Remove booked items from cart
    selectedVehicles.forEach((v) => removeFromCart(v.cartItemId));

    sessionStorage.setItem("directBooking", JSON.stringify(paymentData));
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="pt-100 pb-70 min-h-[60vh] flex flex-col items-center justify-center font-poppins text-center">
        <h2 className="text-2xl font-semibold text-[#0F0E47] mb-4">
          No vehicles added to cart.
        </h2>
        <p className="text-gray-500 text-sm">
          Browse vehicles and add them to cart to continue booking.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 md:px-16 min-h-screen font-poppins bg-gray-50">
      <h2 className="text-3xl font-bold text-[#0F0E47] mb-10 text-center">
        Your Bookings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cart.map((vehicle) => (
          <div
            key={vehicle.cartItemId}
            className={`bg-white shadow-xl rounded-xl p-4 border-2 transition ${
              selectedIds.includes(vehicle.cartItemId)
                ? "border-purple-600"
                : "border-transparent"
            }`}
            onClick={() => toggleSelection(vehicle.cartItemId)}
          >
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="w-full h-48 object-contain rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-[#0F0E47]">
              {vehicle.title}
            </h3>
            <p className="text-gray-600 my-2">{vehicle.description}</p>
            <p className="text-purple-600 font-bold">
              ₹{vehicle.pricePerHour || 1}/hr
            </p>
            <p className="text-sm mt-1 text-gray-700">
              Quantity: {vehicle.quantity || 1}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  // Create payment session for this single vehicle
                  const totalPrice =
                    (vehicle.pricePerHour || 1) * (vehicle.quantity || 1);

                  // Remove it from cart
                  removeFromCart(vehicle.cartItemId);

                  navigate("/payment", {
                    state: {
                      vehicle: {
                        ...vehicle,
                        totalPrice,
                      },
                    },
                  });
                }}
                className="flex-1 bg-[#0F0E47] hover:bg-[#292864] text-white py-2 rounded-lg text-sm"
              >
                Book Now
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(vehicle.cartItemId);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 relative">
        {showAlert && (
          <div className="absolute -top-8 text-sm text-red-600 font-semibold">
            Please select at least one vehicle to proceed to payment.
          </div>
        )}
        <button
          onClick={bookSelected}
          className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Book Selected
        </button>

        <button
          onClick={clearCart}
          className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Bookings;
