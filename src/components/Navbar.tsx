import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import assets from "../assets/assets";
import MenuOptions from './MenuOptions';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const context = useContext(ShopContext);
  const cartContext = useContext(CartContext);
  const products = context?.products || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = products.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  if (!context) {
    console.error("ShopContext is null!");
    return null;
  }

  const { token, setToken } = context;

  const getCartItemsCount = () => {
    if (!cartContext) return 0;
    return Object.values(cartContext.cartItems).reduce((sum, quantity) => sum + quantity, 0);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    if (cartContext) {
      cartContext.clearCart(true);
    }
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <p className="text-3xl">The Crafted Chapter</p>
      </Link>

      {/* Menu Button */}
      <button
        className="sm:hidden p-2"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 sm:hidden w-48"
        >
          <MenuOptions
            isMobile={true}
            onItemClick={() => setShowMobileMenu(false)}
          />
        </div>
      )}

      {/* Desktop Menu */}
      <MenuOptions />

      {/* Search Bar */}
      <div ref={searchRef} className="hidden sm:block flex-1 max-w-md mx-8 relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            placeholder="Search books by title or author..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
          />
          {searchQuery && showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/product/${book.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSearchQuery("");
                      setShowResults(false);
                    }}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{book.title}</p>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-gray-600 text-center">
                  No books found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Auth Section */}
        <div className="relative group">
          {!token ? (
            /* LOGIN BUTTON */
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 border rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              Login
            </button>
          ) : (
            /* PROFILE + DROPDOWN */
            <>
              <img
                className="w-5 cursor-pointer"
                src={assets.profile_icon}
                alt="Profile"
              />

              <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
                <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-white text-gray-500 rounded-xl shadow-xl border border-gray-100">
                  <p
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer hover:text-black transition-colors"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black transition-colors"
                  >
                    My Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600 transition-colors"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          )}
        </div>


        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartItemsCount()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
