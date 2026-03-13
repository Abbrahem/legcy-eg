import React from 'react';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4">Legcy</h3>
        <p className="text-gray-600 mb-6">We're here on these platforms</p>
        <div className="flex justify-center gap-6 mb-6">
          <a 
            href="https://www.instagram.com/legacy_sneakers_eg?igsh=cmY4dms2NzZ0ajhp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-black hover:text-pink-500 transition transform hover:scale-110">
            <FaInstagram size={28} />
          </a>
          <a 
            href="https://www.tiktok.com/@legacy.sneakers4?_r=1&_t=ZS-94f2MN2n9JI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition transform hover:scale-110">
            <FaTiktok size={28} />
          </a>
          <a 
            href="https://wa.me/201044192114" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-green-500 transition transform hover:scale-110">
            <FaWhatsapp size={28} />
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          Contact us: <a href="https://wa.me/201044192114" className="text-green-600 hover:underline font-semibold">+20 10 44192114</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
