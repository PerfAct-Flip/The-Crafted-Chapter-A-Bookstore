import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import books from "../data/books.json";
import StarRating from "../components/StarRating";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const book = books.find((b) => b.id === productId);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const [reviews] = useState<Review[]>([
    { user: "Amit", rating: 5, comment: "Amazing book!" },
    { user: "Sneha", rating: 4, comment: "Loved the writing style." }
  ]);

  const handleAddToCart = () => {
    if (!cartContext || !productId) return;
    
    cartContext.addToCart(productId);
    toast.success("Added to cart successfully!");
  };

  const handleBuyNow = () => {
    if (!cartContext || !productId) return;

   
    cartContext.clearCart();
    
    
    cartContext.addToCart(productId);
    
   
    navigate("/cart");
    
    toast.success("Proceeding to checkout!");
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

  const similarBooks = books
    .filter((b) => b.id !== productId && b.id !== undefined)
    .slice(0, 4);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Book Cover */}
      <img 
        src={book.coverImage} 
        alt={book.title} 
        className="w-64 shadow-md rounded-lg object-cover"
      />

      {/* Book Details */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-gray-600">by {book.author}</p>
        <p className="text-xl font-semibold text-green-600 mt-2">₹{book.price}</p>
        <p className="mt-4 text-gray-700">{book.description}</p>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Genres:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {book.genres.map((genre, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Buy Buttons */}
        <div className="mt-6 flex gap-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart 
          </button>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-3 my-2 rounded-md">
                <p className="font-semibold">{review.user}</p>
                <StarRating rating={review.rating} />
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="mt-8 md:mt-0">
        <h2 className="text-lg font-semibold">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {similarBooks.map((b) => (
            <Link 
              key={b.id} 
              to={`/product/${b.id}`} 
              className="border p-3 rounded-md shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src={b.coverImage} 
                alt={b.title} 
                className="w-32 rounded-md object-cover"
              />
              <p className="font-medium mt-2">{b.title}</p>
              <p className="text-sm text-gray-500">{b.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
