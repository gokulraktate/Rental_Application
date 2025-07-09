import React from "react";

const MapSection = () => {
  return (
    <section className="px-6 md:px-20 pt-10 pb-20 bg-gradient-to-b from-white to-gray-100 font-poppins">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F0E47] mb-4">
        Our Rental Location
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        All vehicles are available for pickup and drop at our rental hub inside the Sanjivani College of Engineering campus.
      </p>

      <div className="overflow-hidden rounded-3xl shadow-xl border-2 border-purple-200 max-w-5xl mx-auto">
        <iframe
          title="Sanjivani College Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5714945202926!2d74.49224227468534!3d19.900308025579378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc4474a245d261%3A0x806a6b9889186a80!2sSanjivani%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1752071917832!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[450px]"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
