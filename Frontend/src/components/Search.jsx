import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const handleSearch = async () => {
    console.log("Searching for book:", searchTerm); // Log search term to verify it's correct
    try {
      const response = await axios.get(
        `https://bookstore-backend-1-chms.onrender.com/book/search?name=${searchTerm}`
      );
      console.log("Response from API:", response.data); // Log the API response

      if (response.data.available) {
        setBook(response.data.book);
        setMessage("Book is Available");
      } else {
        setBook(null);
        setMessage("Book is not available");
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      setBook(null);
      setMessage("Error fetching book or book not found");
    }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-row gap-2 ">
        <label className="input input-bordered bg-gray-700 flex items-center gap-2 sm:w-[350px]">
          {/* <input
            type="text"
            className="grow"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ...."
            className="w-[180px] md:w-[660px] p-2 sm:p-3 rounded-lg sm:rounded-l-lg border-gray-500 bg-gray-700  mx-auto"
          />
        </label>
        <button
          onClick={handleSearch}
          className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Search
        </button>
      </div>
      {message && <h3 className="mt-4 text-lg font-bold">{message}</h3>}
      {book && (
        <div className="mt-4">
          <img
            src={book.image}
            alt={book.title}
            className="w-32 h-32 object-cover"
          />
          <p className="mt-2 font-semibold">{book.title}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
