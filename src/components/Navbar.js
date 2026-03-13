import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';

const Navbar = ({ cartCount, wishlistCount = 0 }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - User Avatar */}
          <button className="hover:opacity-80 transition">
            <img 
              src="/legcy.jpg" 
              alt="Legcy Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
          
          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 -ml-0.5 text-2xl font-bold text-black hover:text-gray-700 transition">
            Legcy
          </Link>
          
          {/* Right - Wishlist & Cart */}
          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <FiHeart size={24} className="text-black" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <FiShoppingBag size={24} className="text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
