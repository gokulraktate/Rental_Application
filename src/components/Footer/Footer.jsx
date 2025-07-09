import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-[#1E1E1E] font-poppins border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-[#3A5BFF]">RENTDRIVE</h2>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Our vision is to provide convenience <br />
            and help increase your travel experience.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-3 gap-8 md:col-span-3 text-sm">
          <div>
            <h3 className="font-semibold mb-3">About Us</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/">How it Works</Link></li>
              <li><Link to="/">Partnership</Link></li>
              <li><Link to="/">Business</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/">Events</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Invite a friend</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Social</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/">Instagram</Link></li>
              <li><Link to="/">Facebook</Link></li>
              <li><Link to="/">Twitter</Link></li>
              <li><Link to="/">YouTube</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-600">© {new Date().getFullYear()} RENTDRIVE. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0 font-medium text-[#1E1E1E]">
            <Link to="/" className="hover:text-[#3A5BFF]">Privacy Policy</Link>
            <Link to="/" className="hover:text-[#3A5BFF]">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
