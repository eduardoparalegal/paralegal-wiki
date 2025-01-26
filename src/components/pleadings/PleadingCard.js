// src/components/pleadings/PleadingCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PleadingCard = ({ title, description, date, status, route }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(route);
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-6 rounded-lg border dark:border-gray-700 transition-colors"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <span className={`px-2 py-1 rounded text-xs font-medium 
          ${status === 'New' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      <div className="text-sm text-gray-500 dark:text-gray-400">{date}</div>
    </div>
  );
};

export default PleadingCard;