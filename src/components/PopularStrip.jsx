import React from "react";

import bike1 from "../assets/popular/bike1.png";
import bike2 from "../assets/popular/bike2.png";
import bike3 from "../assets/popular/bike3.png";
import bike4 from "../assets/popular/bike4.png";
import bike5 from "../assets/popular/bike5.png";
import car1 from "../assets/popular/car1.png";
import car2 from "../assets/popular/car2.png";
import car3 from "../assets/popular/car3.png";
import car4 from "../assets/popular/car4.png";
import car5 from "../assets/popular/car5.png";

const popularItems = [
  { src: bike1, name: "Royal Enfield Classic 350" },
  { src: bike2, name: "KTM Duke 390" },
  { src: bike3, name: "Yamaha FZ-S FI" },
  { src: bike4, name: "Bajaj Dominar 400" },
  { src: bike5, name: "TVS Apache RR 310" },
  { src: car1, name: "Maruti Suzuki Swift" },
  { src: car2, name: "Hyundai Creta" },
  { src: car3, name: "Kia Sorento" },
  { src: car4, name: "Mahindra Thar" },
  { src: car5, name: "Toyota Innova Crysta" },
];

const PopularStrip = () => {
  const duplicatedItems = [...popularItems, ...popularItems];

  return (
    <div className="bg-[#F8F8F8] py-6 overflow-hidden">
      <h2 className="text-2xl font-semibold text-center text-[#0F0E47] mb-4">
        🔥 Popular Picks
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee w-max gap-10 items-center">
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="mt-2 text-sm text-[#0F0E47] font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularStrip;
