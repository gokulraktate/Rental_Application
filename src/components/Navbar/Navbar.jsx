import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
      console.error(error);
    }
  };

  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/bookings", label: "Bookings" },
    { path: "/history", label: "History" }, // ✅ NEW
  ];

  return (
    <nav
      className={`fixed top-2 left-2 right-2 z-50 transition duration-300 px-4 md:px-8 py-2 rounded-2xl shadow-xl ${
        isScrolled ? "bg-[#8686AC]/50 backdrop-blur-md" : "bg-[#8686AC]/95"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          RentDrive
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium items-center">
          {menuLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-[#272757] transition ${
                  location.pathname === link.path ? "text-[#0F0E47]" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {currentUser ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-[#505081] text-white flex items-center justify-center rounded-full cursor-pointer"
              >
                {currentUser.email.charAt(0).toUpperCase()}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md p-3 z-50">
                  <p className="text-sm text-gray-800 font-semibold truncate mb-2">
                    {currentUser.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`hover:text-[#272757] transition ${
                    location.pathname === "/login" ? "text-[#0F0E47]" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`hover:text-[#272757] transition ${
                    location.pathname === "/register" ? "text-[#0F0E47]" : ""
                  }`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="text-3xl text-white cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-3xl text-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#8686AC] px-6 py-4 rounded-b-3xl shadow">
          <ul className="flex flex-col space-y-4 text-white font-medium">
            {menuLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover:text-[#272757] transition ${
                    location.pathname === link.path ? "text-[#0F0E47]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {currentUser ? (
              <>
                <li className="text-sm text-white font-semibold truncate">
                  {currentUser.email}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`hover:text-[#272757] transition ${
                      location.pathname === "/login" ? "text-[#0F0E47]" : ""
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`hover:text-[#272757] transition ${
                      location.pathname === "/register" ? "text-[#0F0E47]" : ""
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
