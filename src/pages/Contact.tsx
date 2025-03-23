import React from "react";
import assets from "../assets/assets";

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6">
      {/* Left Section - Contact Form */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-500 mt-2">
          Say hi or ask any query you have!
        </p>
        <form className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="What's your name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
          <input
            type="email"
            placeholder="Your magical email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
          <textarea
            placeholder="Enter message here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black h-32"
          ></textarea>
          <button
            type="submit"
            className="self-start bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Send →
          </button>
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2 p-6">
        <img
          src={assets.contact_icon} 
          alt="Contact Icon"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Contact;
