import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
    const shopContext = useContext(ShopContext);
    const products = shopContext?.products || [];
    const wishlist = shopContext?.wishlist || [];
    const toggleWishlist = shopContext?.toggleWishlist;

    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="my-10"
        >
            <div className="text-center py-8 text-3xl">
                <Title text1="MY" text2="WISHLIST" />
                <p className="w-3/4 m-auto text-sm md:text-base text-gray-600">
                    Save your favorite picks for later.
                </p>
            </div>

            <div className="mt-8">
                <AnimatePresence mode="popLayout">
                    {wishlistProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                        >
                            {wishlistProducts.map((book) => (
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
                                        className="block transition-transform hover:-translate-y-1"
                                    >
                                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col bg-white">
                                            <div className="aspect-[2/3] w-full relative">
                                                <img
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    className="absolute w-full h-full object-cover"
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

                                    {/* Remove Button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleWishlist?.(book.id);
                                        }}
                                        className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-red-500 hover:bg-red-50 transition-colors border border-gray-100 opacity-0 group-hover:opacity-100"
                                        title="Remove from Wishlist"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
                        >
                            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-6">Your wishlist is empty.</p>
                            <Link
                                to="/collection"
                                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg inline-block"
                            >
                                Browse Collection
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Wishlist;
