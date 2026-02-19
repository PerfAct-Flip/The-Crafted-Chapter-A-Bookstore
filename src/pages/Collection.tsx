import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const Collection: React.FC = () => {
  const shopContext = useContext(ShopContext);
  const products = shopContext?.products || [];
  const wishlist = shopContext?.wishlist || [];
  const toggleWishlist = shopContext?.toggleWishlist;

  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // get all genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    products.forEach(book => {
      book.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres);
  }, [products]);

  const toggleGenre = (genre: string) => {
    const newSelectedGenres = new Set(selectedGenres);
    if (selectedGenres.has(genre)) {
      newSelectedGenres.delete(genre);
    } else {
      newSelectedGenres.add(genre);
    }
    setSelectedGenres(newSelectedGenres);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const clearFilters = () => {
    setSelectedGenres(new Set());
    setCurrentPage(1);
  };

  // Filtering books based on selected genres 
  const filteredBooks = useMemo(() => {
    if (selectedGenres.size === 0) return products;
    return products.filter(book =>
      book.genres.some(genre => selectedGenres.has(genre))
    );
  }, [selectedGenres, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-10"
    >
      <div className="text-center py-8 text-3xl">
        <Title text1="OUR" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-sm md:text-base text-gray-600 mb-8">
          Explore our vast collection of books across different genres
        </p>
      </div>

      {/* Genre Filter Menu */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Browse by Genre</h3>
          {selectedGenres.size > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {allGenres.map((genre) => (
            <motion.button
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedGenres.has(genre)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {genre}
              {selectedGenres.has(genre) && (
                <span className="ml-2 inline-flex items-center">
                  ✓
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 min-h-[600px]"
      >
        <AnimatePresence mode="popLayout">
          {paginatedBooks.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <Link
                to={`/product/${book.id}`}
                className="block h-full"
              >
                <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col bg-white group-hover:-translate-y-2">
                  <div className="aspect-[2/3] w-full relative overflow-hidden">
                    <motion.img
                      layoutId={`product-image-${book.id}`}
                      src={book.coverImage}
                      alt={book.title}
                      className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-gray-800 line-clamp-1 text-sm sm:text-base">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-blue-600 font-semibold text-sm sm:text-base mt-auto">₹{book.price}</p>
                  </div>
                </div>
              </Link>

              {/* Quick Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist?.(book.id);
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-red-500 hover:bg-white transition-colors border border-gray-100 opacity-0 group-hover:opacity-100 active:scale-90"
              >
                <Heart
                  fill={wishlist.includes(book.id) ? "currentColor" : "none"}
                  className="w-4 h-4"
                />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 pb-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-full disabled:opacity-30 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full border transition-all ${currentPage === i + 1
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-full disabled:opacity-30 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* No Results Message */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No books found matching your selection.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-600 font-medium hover:underline transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Collection;


















































