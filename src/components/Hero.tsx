import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/collection');
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">LATEST COLLECTION</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Reads
          </h1>
          <div 
            onClick={handleShopNow}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity text-blue-200"
          >
            <p className="font-semibold text-blue-600 text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right*/}
      <img
        className="w-full sm:w-1/2"
        src={assets.hero_section}
        alt="Fresh Arrivals Banner"
      />
    </div>
  );
};

export default Hero;
