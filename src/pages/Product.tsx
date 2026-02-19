import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import StarRating from "../components/StarRating";
import { CartContext } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const shopContext = useContext(ShopContext);
  const products = shopContext?.products || [];
  const book = products.find((b) => b.id === productId);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const isFavorite = productId ? shopContext?.wishlist.includes(productId) : false;

  const [reviews] = useState<Review[]>([
    { user: "Amit", rating: 5, comment: "Amazing book!" },
    { user: "Sneha", rating: 4, comment: "Loved the writing style." }
  ]);

  const handleAddToCart = async () => {
    if (!cartContext || !productId) return;

    await cartContext.addToCart(productId);
  };

  const handleBuyNow = async () => {
    if (!cartContext || !productId) return;

    await cartContext.clearCart(true);
    await cartContext.addToCart(productId);

    navigate("/cart");
  };


  if (!book) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Book not found</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">
          Return to Home
        </Link>
      </div>
    );
  }

  const similarBooks = products
    .filter((b) => b.id !== productId && b.id !== undefined)
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-12 p-6 max-w-7xl mx-auto"
    >
      {/* Main Content Area: Cover + Details + Reviews */}
      <div className="flex-1">
        <div className="flex flex-col gap-8">
          {/* Book Cover */}
          <div className="w-full max-w-[500px] mx-auto lg:mx-0 relative group">
            <motion.img
              layoutId={`product-image-${book.id}`}
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto max-h-[600px] shadow-2xl rounded-2xl object-contain bg-gray-50 p-2 border"
            />
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => productId && shopContext?.toggleWishlist(productId)}
              className="absolute top-6 right-6 p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-red-500 hover:bg-white transition-colors border border-gray-100"
            >
              <Heart
                fill={isFavorite ? "currentColor" : "none"}
                className={`w-6 h-6 transition-colors ${isFavorite ? 'fill-current' : ''}`}
              />
            </motion.button>
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>
                <div className="hidden lg:block">
                  {/* Desktop Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => productId && shopContext?.toggleWishlist(productId)}
                    className="p-3 bg-gray-50 rounded-full text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      fill={isFavorite ? "currentColor" : "none"}
                      className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`}
                    />
                  </motion.button>
                </div>
              </div>
              <p className="text-lg text-gray-600 mt-1 italic">by {book.author}</p>
              <div className="flex items-center gap-4 mt-3">
                <p className="text-2xl font-bold text-green-700">₹{book.price}</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded uppercase tracking-wide">
                  In Stock
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{book.description}</p>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre, index) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {genre}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Buy Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                Add to Cart
                <AnimatePresence>
                  {productId && cartContext?.cartItems[productId] && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200 shadow-sm"
                    >
                      {cartContext.cartItems[productId]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 min-w-[200px] bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                onClick={handleBuyNow}
              >
                Buy Now
              </motion.button>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="bg-gray-50 p-5 rounded-2xl border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-800">{review.user}</p>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-600 italic">"{review.comment}"</p>
                    </motion.div>
                  )) || null}
                </div>
              ) : (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar: Similar Books Section */}
      <div className="lg:w-80 shrink-0">
        <div className="sticky top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600 inline-block">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {similarBooks.map((b) => (
              <Link
                key={b.id}
                to={`/product/${b.id}`}
                className="group flex gap-4 bg-white p-3 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="w-20 shrink-0">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full aspect-[2/3] object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {b.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">{b.author}</p>
                  <p className="text-blue-600 font-bold mt-1">₹{b.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
