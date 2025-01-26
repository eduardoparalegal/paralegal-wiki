// src/components/FormCard.js
import React from 'react';
import { ArrowRight } from 'lucide-react';

const FormCard = ({ title, description, icon: Icon, active, disabled }) => {
  return (
    <div
      className={`relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 
        ${active ? 'border-blue-500' : 'border-transparent'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 cursor-pointer'}
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      {!disabled && (
        <div className="mt-4 flex items-center text-sm text-blue-500">
          Access form
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      )}
      {disabled && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 bg-opacity-50 rounded-lg flex items-center justify-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
};

export default FormCard;