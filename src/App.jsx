import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import BookingHistory from "./pages/BookingHistory";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ Public Route: No login required */}
        <Route path="/vehicles" element={<Vehicles />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <PrivateRoute>
              <PaymentSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <BookingHistory />
            </PrivateRoute>
          }
        />

        {/* ✅ Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
