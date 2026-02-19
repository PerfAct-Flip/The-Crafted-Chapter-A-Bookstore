import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import StarRating from "../components/StarRating";
import { CartContext } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";

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
    <div className="flex flex-col lg:flex-row gap-12 p-6 max-w-7xl mx-auto">
      {/* Main Content Area: Cover + Details + Reviews */}
      <div className="flex-1">
        <div className="flex flex-col gap-8">
          {/* Book Cover */}
          <div className="w-full max-w-[500px] mx-auto lg:mx-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto max-h-[600px] shadow-2xl rounded-2xl object-contain bg-gray-50 p-2 border"
            />
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>
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
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Buy Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button
                className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                Add to Cart
                {productId && cartContext?.cartItems[productId] ? (
                  <span className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full border border-blue-200 shadow-sm animate-pulse">
                    {cartContext.cartItems[productId]}
                  </span>
                ) : null}
              </button>
              <button
                className="flex-1 min-w-[200px] bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-800">{review.user}</p>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-600 italic">"{review.comment}"</p>
                    </div>
                  ))}
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
    </div>
  );
};

export default Product;
