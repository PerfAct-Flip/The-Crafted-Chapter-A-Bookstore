import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import books from '../data/books.json';
import Title from '../components/Title';
const Collection: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  // get all genres
  
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    books.forEach(book => {
      book.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres);
  }, []);

  
  const toggleGenre = (genre: string) => {
    const newSelectedGenres = new Set(selectedGenres);
    if (selectedGenres.has(genre)) {
      newSelectedGenres.delete(genre);
    } else {
      newSelectedGenres.add(genre);
    }
    setSelectedGenres(newSelectedGenres);
  };

  
  const clearFilters = () => {
    setSelectedGenres(new Set());
  };

  // Filtering books based on selected genres 
  const filteredBooks = useMemo(() => {
    if (selectedGenres.size === 0) return books;
    return books.filter(book => 
      book.genres.some(genre => selectedGenres.has(genre))
    );
  }, [selectedGenres]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="OUR" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-sm md:text-base text-gray-600 mb-8">
          Explore our vast collection of books across different genres
        </p>
      </div>

      {/* Genre Filter Menu */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Browse by Genre</h3>
          {selectedGenres.size > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedGenres.has(genre)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {genre}
              {selectedGenres.has(genre) && (
                <span className="ml-2 inline-flex items-center">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
        {selectedGenres.size > 0 && (
          <p className="mt-4 text-sm text-gray-600">
            Selected Genres: {Array.from(selectedGenres).join(', ')}
          </p>
        )}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredBooks.map((book) => (
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
                <p className="text-blue-600 font-semibold text-sm sm:text-base">₹{book.price}</p>
                <div className="mt-auto pt-2 flex flex-wrap gap-1">
                  {book.genres.map((genre, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded-full ${
                        selectedGenres.has(genre)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No books found with the selected genre combination.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Collection;


















































