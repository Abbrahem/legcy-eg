import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { mockCategories } from '../data/mockData';

const HomePage = ({ addToCart, addToWishlist }) => {
  const navigate = useNavigate();
  const bestSellersRef = useRef(null);
  const categoriesRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [latestProduct, setLatestProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch all products
      const response = await axios.get('http://localhost:5000/api/products');
      const allProducts = response.data;
      
      // Filter best sellers
      const bestSellers = allProducts.filter(p => p.isBestSeller);
      setProducts(bestSellers);
      
      // Get latest product (last one added)
      if (allProducts.length > 0) {
        const sorted = allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestProduct(sorted[0]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center">
        <img 
          src="/hero.jpg" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="relative z-10 text-center px-4 -mt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            LEGCY SNEAKERS
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 drop-shadow-lg">
            Premium Branded Sneakers & Shoes
          </p>
          <div className="mt-40">
            <button 
              className="bg-gradient-to-r from-[#F2D27A] via-[#C9A24A] to-[#C9A24A] text-black px-12 py-4 rounded-full font-bold text-xl shadow-2xl hover:from-[#A8842F] hover:via-[#A8842F] hover:to-[#8B6F2A] hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => navigate('/products')}>
              SHOP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">SHOP BY BRAND</h2>
          <p className="text-gray-600 text-lg">Explore our collection of premium brands</p>
        </div>
        <div className="relative">
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
            onClick={() => scrollLeft(categoriesRef)}>
            <span className="text-2xl">‹</span>
          </button>
          <div 
            ref={categoriesRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {mockCategories.map(category => (
              <div 
                key={category.id} 
                className="min-w-[200px] cursor-pointer group"
                onClick={() => navigate(`/category/${category.name}`)}>
                <div className="relative overflow-hidden rounded-lg aspect-square mb-3 shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-center font-semibold text-lg">{category.name}</p>
              </div>
            ))}
          </div>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
            onClick={() => scrollRight(categoriesRef)}>
            <span className="text-2xl">›</span>
          </button>
        </div>
      </section>

      {/* Best Sellers Section */}
      {products.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">BEST SELLERS</h2>
              <p className="text-gray-600 text-lg">Most popular sneakers this month</p>
            </div>
            <div className="relative">
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
                onClick={() => scrollLeft(bestSellersRef)}>
                <span className="text-2xl">‹</span>
              </button>
              <div 
                ref={bestSellersRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {products.map(product => (
                  <div key={product._id} className="min-w-[280px]">
                    <ProductCard product={{ ...product, id: product._id, image: product.images[0] }} addToCart={addToCart} addToWishlist={addToWishlist} />
                  </div>
                ))}
              </div>
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
                onClick={() => scrollRight(bestSellersRef)}>
                <span className="text-2xl">›</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Latest Arrival Section */}
      {latestProduct && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">NEW ARRIVAL</h2>
            <p className="text-gray-600 text-lg">Check out our latest addition</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-full">
              <img 
                src={latestProduct.images[0]} 
                alt={latestProduct.name}
                className="w-full h-full object-cover min-h-[400px]" />
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{latestProduct.name}</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">{latestProduct.price} EGP</p>
              
              <div className="mb-6">
                <p className="font-semibold mb-3 text-lg">Available Sizes:</p>
                <div className="flex gap-2 flex-wrap">
                  {latestProduct.sizes.map(size => (
                    <span key={size} className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-black transition font-semibold">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <p className="font-semibold mb-3 text-lg">Available Colors:</p>
                <div className="flex gap-2 flex-wrap">
                  {latestProduct.colors.map(color => (
                    <span 
                      key={color} 
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/product/${latestProduct._id}`)}
                className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition">
                VIEW PRODUCT
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">WHY CHOOSE LEGCY?</h2>
            <p className="text-gray-300 text-lg">Your trusted partner for premium sneakers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Premium Quality Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-300 leading-relaxed">
                We source only authentic, high-quality sneakers from trusted suppliers. Every pair is carefully inspected to ensure you receive nothing but the best. Our commitment to quality means you can shop with confidence, knowing you're getting genuine branded products that will last.
              </p>
            </div>

            {/* Fast Delivery Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20">
              <div className="text-5xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Fast & Secure Shopping</h3>
              <p className="text-gray-300 leading-relaxed">
                Experience hassle-free shopping with our streamlined checkout process. We offer fast delivery across Egypt with secure payment options. Track your order in real-time and enjoy our customer-friendly return policy. Your satisfaction is our priority, and we're here to make your shopping experience smooth and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
