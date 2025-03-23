import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="The Crafted Chapter Logo" />
          <p className="w-full md:w-2/3 text-gray-600"> 
            The Crafted Chapter started as a showcase of a personal book collection - 
            books that have been collected, read, and cherished over the years. 
            While currently featuring carefully chosen titles from a personal library, 
            we're evolving towards becoming a comprehensive online bookstore.
          </p>
        </div>

        {/* Links */}
        <div>
            <h3 className="text-xl font-medium mb-5">Our Links</h3>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li><Link to="/" className="hover:text-black">HOME</Link></li>
                <li><Link to="/collection" className="hover:text-black">COLLECTION</Link></li>
                <li><Link to="/about" className="hover:text-black">ABOUT</Link></li>
                <li><Link to="/contact" className="hover:text-black">CONTACT</Link></li>
            </ul>
        </div>

        {/* Contact info */}
        <div>
            <h3 className="text-xl font-medium mb-5">Contact Info</h3>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>X - xxx,Greater Noida</li>
                <li>Uttar Pradesh, India</li>
                <li>(91) 8376900474</li>
                <li>info@thecraftedchapter.com</li>
            </ul>
        </div>

        {/* footer copyright */}
        <div className="mt-10 text-center text-gray-600">
            &copy; 2025 The Crafted Chapter. All rights reserved.
        </div>
    </div>
  );
};

export default Footer;
