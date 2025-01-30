import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CaseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-white tracking-tight">
        Case Search
      </h1>
      
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter case number or keywords..."
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl 
                     text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 ease-in-out
                     text-lg"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 
                   text-white font-medium rounded-lg
                   transition-colors duration-200 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default CaseSearch;