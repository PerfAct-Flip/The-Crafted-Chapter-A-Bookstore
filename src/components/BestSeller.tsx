

import React, { useMemo } from "react";
import Title from "./Title";
import books from "../data/books.json";
import { Link } from "react-router-dom";

const BestSeller: React.FC = () => {
  // Randomly select 5 books using Fisher-Yates shuffle algorithm
  const bestSellerBooks = useMemo(() => {
    const shuffled = [...books]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    return shuffled;
  }, []); 

  return (
    <div className="my-10 px-6">
      <div className='text-center text-3xl py-8'>
        <Title text1={'FEATURED'} text2={'BOOKS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our handpicked selection of amazing books.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {bestSellerBooks.map((book) => (
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
    </div>
  );
};

export default BestSeller;
