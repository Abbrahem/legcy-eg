import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiX } from 'react-icons/fi';

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleQuickAdd = () => {
    if (product.isSoldOut) {
      alert('This product is currently sold out');
      return;
    }
    
    if (selectedSize && selectedColor) {
      // Check if size is sold out
      if (product.soldOutSizes?.includes(selectedSize)) {
        alert('This size is currently sold out');
        return;
      }
      
      // Check if color is sold out
      if (product.soldOutColors?.includes(selectedColor)) {
        alert('This color is currently sold out');
        return;
      }
      
      addToCart({ ...product, size: selectedSize, color: selectedColor });
      setShowQuickOrder(false);
      setSelectedSize('');
      setSelectedColor('');
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (addToWishlist) {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className="group cursor-pointer relative" 
      onClick={() => navigate(`/product/${product._id || product.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square mb-3">
        {/* First Image */}
        <img 
          src={product.images?.[0] || product.image}
          alt={product.name} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && product.images?.[1] ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Second Image (shown on hover) */}
        {product.images?.[1] && (
          <img 
            src={product.images[1]}
            alt={product.name} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        
        {/* Cart & Wishlist Icons - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            onClick={(e) => { e.stopPropagation(); setShowQuickOrder(true); }}>
            <FiShoppingCart size={18} />
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            onClick={handleWishlist}>
            <FiHeart size={18} />
          </button>
        </div>
      </div>
      
      <h3 className="font-semibold text-base mb-1 line-clamp-2">{product.name}</h3>
      <p className="text-gray-700 font-bold text-lg">{product.price} EGP</p>

      {/* Quick Order Dropdown */}
      {showQuickOrder && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
          onClick={(e) => { e.stopPropagation(); setShowQuickOrder(false); }}>
          <div 
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowQuickOrder(false)}>
              <FiX size={24} />
            </button>

            {/* Product Info */}
            <div className="flex gap-4 mb-6">
              <img src={product.images?.[0] || product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 font-bold">{product.price} EGP</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Size:</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => {
                  const isSoldOut = product.soldOutSizes?.includes(size);
                  return (
                    <button 
                      key={size}
                      disabled={isSoldOut}
                      onClick={() => !isSoldOut && setSelectedSize(size)}
                      className={`px-4 py-2 border rounded transition ${
                        isSoldOut
                          ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed line-through'
                          : selectedSize === size 
                            ? 'bg-black text-white border-black' 
                            : 'border-gray-300 hover:border-black'
                      }`}>
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Color:</label>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => {
                  const isSoldOut = product.soldOutColors?.includes(color);
                  return (
                    <div key={color} className="relative">
                      <button 
                        disabled={isSoldOut}
                        onClick={() => !isSoldOut && setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition ${
                          isSoldOut
                            ? 'opacity-50 cursor-not-allowed'
                            : selectedColor === color 
                              ? 'border-black scale-110' 
                              : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{backgroundColor: color}}>
                      </button>
                      {isSoldOut && (
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-xs text-red-600 font-bold">SOLD OUT</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            {product.isSoldOut ? (
              <button 
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-bold mb-3 cursor-not-allowed">
                SOLD OUT
              </button>
            ) : (
              <button 
                onClick={handleQuickAdd}
                disabled={!selectedSize || !selectedColor}
                className="w-full bg-black text-white py-3 rounded-lg font-bold mb-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition">
                ADD TO CART
              </button>
            )}
            <button 
              onClick={() => setShowQuickOrder(false)}
              className="w-full bg-white text-black border-2 border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
