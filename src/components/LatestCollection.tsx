import React, { useMemo, useContext } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const LatestCollection: React.FC = () => {
  const context = useContext(ShopContext);
  const products = context?.products || [];

  // Get the last 5 books from the collection
  const latestBooks = useMemo(() => {
    return [...products].slice(-5).reverse();
  }, [products]);

  return (
    <div className="my-10 px-6">
      <div className='text-center text-3xl py-8'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover the latest arrivals in our collection. From bestsellers to new releases,
          we have something for everyone. Browse our collection today and find your next favorite book.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {latestBooks.map((book) => (
          <Link
            key={book.id}
            to={`/product/${book.id}`}
            className="group transition-transform hover:-translate-y-1"
          >
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="aspect-[2/3] w-full relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="absolute w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
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
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          to="/collection"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-md"
        >
          View All Collections
        </Link>
      </div>
    </div>
  );
};

export default LatestCollection;
