import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);
  const shopContext = useContext(ShopContext);
  const products = shopContext?.products || [];
  const navigate = useNavigate();

  if (!cartContext) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { cartItems, addToCart, removeFromCart, clearCart } = cartContext;

  // Calculate cart details
  const cartDetails = Object.entries(cartItems)
    .map(([productId, quantity]) => {
      const book = products.find((b) => b.id === productId);
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
    navigate("/checkout");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-[60vh]">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        <span className="text-gray-500 font-medium">
          {cartDetails.length} {cartDetails.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {cartDetails.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-6 font-medium">Your cart feels a bit light...</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Go to Bookstore
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartDetails.map(({ id, book, quantity, total }) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row items-center justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white gap-4"
              >
                <Link
                  to={`/product/${id}`}
                  className="flex items-center space-x-4 flex-1 group w-full"
                >
                  <img
                    src={book?.coverImage}
                    alt={book?.title}
                    className="w-20 sm:w-24 aspect-[2/3] object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {book?.title}
                    </h3>
                    <p className="text-sm text-gray-500 italic">by {book?.author}</p>
                    <p className="text-blue-600 font-bold mt-2">₹{book?.price}</p>
                  </div>
                </Link>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 bg-gray-50 p-2 sm:p-0 rounded-lg sm:bg-transparent">
                  <div className="flex items-center space-x-3 bg-white border rounded-lg p-1">
                    <button
                      onClick={() => removeFromCart(id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-gray-700">{quantity}</span>
                    <button
                      onClick={() => addToCart(id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-green-50 hover:text-green-600 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">₹{total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12  text-white p-6 sm:p-8 rounded-3xl shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="w-full sm:w-auto">
                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-1">Total Order Value</p>
                <p className="text-4xl font-extrabold text-blue-400">₹{totalAmount}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => clearCart()}
                  className="px-6 py-3 text-red-500 font-bold border-2 border-red-900/50 rounded-xl hover:bg-red-900/20 transition-all active:scale-95"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-10 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                >
                  Place Order
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
