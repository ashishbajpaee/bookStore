import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { sender: 'user', text: userInput }];
      setMessages(newMessages);
      getBookRecommendations(userInput);
      setUserInput('');
    }
  };

  const getBookRecommendations = async (input) => {
    const genre = input.toLowerCase().trim();
    const recommendations = await fetchBooksFromGoogle(genre);
    const botResponse = recommendations.length
      ? recommendations.join('\n')
      : "Sorry, I didn't find any books in that genre. Please try another genre.";
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'bot', text: botResponse },
    ]);
  };

  const fetchBooksFromGoogle = async (genre) => {
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    if (!API_KEY) {
      console.error('Google Books API key is missing!');
      return [];
    }
  
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.items) {
        // Shuffle the array of books
        const shuffledBooks = data.items.sort(() => Math.random() - 0.5);
  
        // Get the top 5 random books
        return shuffledBooks.slice(0, 5).map((item, index) => `${index + 1}. ${item.volumeInfo.title}`);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    return [];
  };
  
  
  return (
    <div className="w-screen md:mt-5 container text-gray-300 dark:text-white mx-auto md:left-0 md:right-0">
      {/* Chatbot Box */}
      <div className="md:max-w-[545px] max-w-[300px] mx-auto md:mx-0 p-4 sm:p-6 rounded-lg shadow-lg flex flex-col space-y-0 bg-gray-700">
        {/* Messages Window */}
        <div className="chatbot-window max-h-64 overflow-y-auto mb-0 mt-0">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender} mb-3`}>
              <div
                className={`p-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-pink-400' : 'bg-gray-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chatbot Input Section */}
        <div className="chatbot-input flex flex-row sm:flex-row sm:items-center space-y-1 sm:space-y-0 space-x-2  ">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask for book recommendations..."
            className="w-[180px] md:w-[660px] p-2 sm:p-3 border rounded-lg sm:rounded-l-lg border-gray-500 bg-gray-700  mx-auto"
          />
          <button
            onClick={handleSendMessage}
            className="md:w-[140px] w-[90px] bg-pink-500 text-white p-1 sm:p-3 rounded-lg sm:rounded-r-lg hover:bg-pink-700 items-center mx-auto cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
