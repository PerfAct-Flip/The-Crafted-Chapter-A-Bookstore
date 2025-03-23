import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import books from "../data/books.json";
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); 

  if (!context) {
    console.error("ShopContext is null!");
    return null;
  }
  
  const { token, setToken, setCartItems } = context;

  const getCartItemsCount = () => {
    if (!cartContext) return 0;
    return Object.values(cartContext.cartItems).reduce((sum, quantity) => sum + quantity, 0);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login"); 
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <p className="text-3xl">The Crafted Chapter</p>
      </Link>

      {/* Hamburger Menu Button */}
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
        <div className="relative group">
          <img 
            onClick={() => (token ? null : navigate("/login"))} 
            className="w-5 cursor-pointer" 
            src={assets.profile_icon} 
            alt="Profile" 
          />
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-4 bg-white shadow-md p-3 rounded-md">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
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
