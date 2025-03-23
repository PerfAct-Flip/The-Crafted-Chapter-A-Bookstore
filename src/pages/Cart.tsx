import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import books from "../data/books.json";

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const { cartItems, addToCart, removeFromCart, clearCart } = cartContext;

  // Calculate cart details
  const cartDetails = Object.entries(cartItems)
    .map(([productId, quantity]) => {
      const book = books.find((b) => b.id === productId);
      return {
        id: productId,
        book,
        quantity,
        total: book ? book.price * quantity : 0,
      };
    })
    .filter((item) => item.book); 

  const totalAmount = cartDetails.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cartDetails.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartDetails.map(({ id, book, quantity, total }) => (
              <div
                key={id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={book?.coverImage}
                    alt={book?.title}
                    className="w-20 h-28 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{book?.title}</h3>
                    <p className="text-gray-600">₹{book?.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => addToCart(id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-semibold">₹{total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-xl font-bold">₹{totalAmount}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

