import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0F0E47",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans-serif"
            }
          }}
        />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
