import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicles, setVehicles] = useState([]);
  const [pickup, setPickup] = useState(new Date());
  const [dropoff, setDropoff] = useState(new Date(Date.now() + 60 * 60 * 1000)); // default +1 hour

  useEffect(() => {
    const direct = sessionStorage.getItem("directBooking");
    if (direct) {
      try {
        const data = JSON.parse(direct);
        const isArray = Array.isArray(data);
        setVehicles(isArray ? data : [data]);
      } catch (e) {
        console.error("Invalid booking data", e);
        setVehicles([]);
      }
    } else {
      setVehicles([]);
    }
  }, []);

  const isSameDay = pickup.toDateString() === dropoff.toDateString();

  const getTotalPrice = () => {
    const durationInHours = Math.max(
      1,
      Math.ceil((dropoff - pickup) / (1000 * 60 * 60))
    );
    return vehicles.reduce((acc, vehicle) => {
      const pricePerHour = vehicle.pricePerHour || 120;
      const qty = vehicle.quantity || 1;
      return acc + qty * pricePerHour * durationInHours;
    }, 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const amount = getTotalPrice() * 100; // in paise

    const options = {
      key: "rzp_test_AV8ijy8hIyMrji", // 🔁 Replace with your Razorpay Test Key
      amount: amount,
      currency: "INR",
      name: "RentDrive",
      description: "Vehicle Booking Payment",
      handler: function (response) {
        console.log("Payment success", response);
        sessionStorage.removeItem("directBooking");
        navigate("/payment-success");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        booking_time: `${pickup.toString()} - ${dropoff.toString()}`,
      },
      theme: {
        color: "#505081",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 font-poppins px-4 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0F0E47]">Checkout</h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-lg">No booking found.</p>
      ) : (
        <>
          {/* Date/Time Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block mb-2 font-medium text-[#0F0E47]">Pickup Date & Time</label>
              <DatePicker
                selected={pickup}
                onChange={(date) => {
                  setPickup(date);
                  if (dropoff < date) {
                    setDropoff(new Date(date.getTime() + 60 * 60 * 1000));
                  }
                }}
                showTimeSelect
                minDate={new Date()}
                dateFormat="Pp"
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#0F0E47]">Drop-off Date & Time</label>
              <DatePicker
                selected={dropoff}
                onChange={(date) => setDropoff(date)}
                showTimeSelect
                minDate={pickup}
                minTime={
                  isSameDay
                    ? pickup
                    : new Date().setHours(0, 0, 0, 0)
                }
                maxTime={
                  isSameDay
                    ? new Date(pickup.getFullYear(), pickup.getMonth(), pickup.getDate(), 23, 59)
                    : new Date().setHours(23, 59, 59, 999)
                }
                dateFormat="Pp"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            {vehicles.map((v, i) => (
              <div key={v.id || i} className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-[#0F0E47] mb-1">{v.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{v.description}</p>
                <p className="text-gray-700 font-medium">
                  ₹{v.pricePerHour || 120}/hr × {v.quantity || 1} unit(s)
                </p>
              </div>
            ))}
          </div>

          {/* Summary & Pay */}
          <div className="text-center">
            <p className="text-xl font-bold mb-4 text-[#0F0E47]">
              Total Amount: ₹{getTotalPrice()}
            </p>
            <button
              onClick={handlePayment}
              className="bg-purple-600 hover:bg-purple-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Proceed to Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
