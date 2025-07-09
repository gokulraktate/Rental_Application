// src/components/Loader.jsx
import React from "react";
import "../index.css"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
