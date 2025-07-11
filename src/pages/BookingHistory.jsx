import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const fetchBookings = async (userId) => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", userId)
        );
        const snapshot = await getDocs(q);
        const bookingData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchBookings(user.uid);
      } else {
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="pt-24 text-center font-poppins text-gray-600">
        Loading bookings...
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="pt-24 pb-16 text-center font-poppins min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700">No Bookings Found</h2>
      </div>
    );

  return (
    <div className="pt-24 pb-16 px-6 md:px-20 font-poppins bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0F0E47]">
        Your Booking History
      </h2>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow p-6 border border-gray-100"
          >
            <p className="text-lg font-semibold text-[#0F0E47] mb-2">
              Booking ID: {booking.id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Pickup: {new Date(booking.pickup).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Dropoff: {new Date(booking.dropoff).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Total: ₹{booking.totalAmount}
            </p>
            <ul className="text-sm text-gray-700 list-disc ml-5">
              {booking.vehicles?.map((v, i) => (
                <li key={i}>
                  {v.title} - ₹{v.pricePerHour || 120}/hr × {v.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
