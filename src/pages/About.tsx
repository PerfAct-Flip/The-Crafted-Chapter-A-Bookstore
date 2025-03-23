import React from "react";
import Title from "../components/Title";
import assets from "../assets/assets";

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-10">
      {/* Header  */}
      <div className="text-center py-8 text-3xl">
        <Title text1="ABOUT" text2="STORE" />
        <p className="w-3/4 m-auto text-sm md:text-base text-gray-600 mb-8">
          A personal book collection turning into something bigger
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="md:w-1/2">
          <img
            src={assets.hero_section}
            alt="Book Collection"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold">Story</h2>
          <p className="text-gray-600">
            The Crafted Chapter started as a showcase of my personal book collection - 
            books that I've collected, read, and cherished over the years. Each book 
            in the current collection has been personally selected and represents my 
            journey as a reader and book enthusiast.
          </p>
          <p className="text-gray-600">
            While the current collection features books from my personal library, 
            The Crafted Chapter is evolving. In the future, we plan to expand into 
            a full-fledged online bookstore, offering a wider selection of books 
            from various publishers and distributors.
          </p>
        </div>
      </div>

      {/* Current & Future */}
      <div className="bg-gray-50 py-16 px-4 rounded-lg mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">Present & Future</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-medium mb-4">Current Collection</h3>
                <p className="text-gray-600">
                  Currently showcasing my personal book collection, featuring carefully 
                  chosen titles across various genres that I've collected over time. 
                  Each book has been read and appreciated, making this collection truly special.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-medium mb-4">Future Vision</h3>
                <p className="text-gray-600">
                  Planning to transform into a comprehensive online bookstore, 
                  offering a vast selection of books from various publishers. 
                  The goal is to share the joy of reading with a wider audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Highlights */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Collection Highlights</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start">
            <div className="bg-black text-white p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Diverse Genres</h3>
              <p className="text-gray-600">From classics to contemporary fiction, the collection spans multiple genres</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-black text-white p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Growing Collection</h3>
              <p className="text-gray-600">Regularly updated with new additions to the personal library</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-black text-white p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Curated Selection</h3>
              <p className="text-gray-600">Each book personally chosen and read, ensuring quality content</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-black text-white p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Future Expansion</h3>
              <p className="text-gray-600">Plans to expand into a full online bookstore with wider selections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
