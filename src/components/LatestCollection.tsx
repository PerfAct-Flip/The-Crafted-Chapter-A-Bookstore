import React, { useMemo, useContext } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const LatestCollection: React.FC = () => {
  const shopContext = useContext(ShopContext);
  const products = shopContext?.products || [];
  const wishlist = shopContext?.wishlist || [];
  const toggleWishlist = shopContext?.toggleWishlist;

  // Get the last 5 books from the collection
  const latestBooks = useMemo(() => {
    return [...products].slice(-5).reverse();
  }, [products]);

  return (
    <div className="my-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-center text-3xl py-8'
      >
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover the latest arrivals in our collection. From bestsellers to new releases,
          we have something for everyone. Browse our collection today and find your next favorite book.
        </p>
      </motion.div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        <AnimatePresence>
          {latestBooks.map((book, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={book.id}
              className="group relative"
            >
              <Link
                to={`/product/${book.id}`}
                className="block h-full transition-transform hover:-translate-y-1"
              >
                <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col bg-white">
                  <div className="aspect-[2/3] w-full relative">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                      New
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-gray-800 line-clamp-1 text-sm sm:text-base">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-blue-600 font-semibold text-sm sm:text-base mt-auto">
                      ₹{book.price}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Quick Wishlist Button */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist?.(book.id);
                }}
                className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-red-500 hover:bg-white transition-colors border border-gray-100 opacity-0 group-hover:opacity-100 z-20"
              >
                <Heart
                  fill={wishlist.includes(book.id) ? "currentColor" : "none"}
                  className="w-4 h-4"
                />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-12"
      >
        <Link
          to="/collection"
          className="inline-block px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-medium rounded-full shadow-sm hover:shadow-md"
        >
          View All Collections
        </Link>
      </motion.div>
    </div>
  );
};

export default LatestCollection;
