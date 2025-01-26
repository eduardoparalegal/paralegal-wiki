
// src/components/pleadings/SpecialCases.jsx
import React from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SpecialCases = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
        onClick={() => navigate('/pleadings')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Pleadings
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Special Cases
            </h1>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Cuban Cases
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-blue-800 dark:text-blue-200">
                <li>Check birth certificate and NTA</li>
                <li>Verify parole/humanitarian parole status in contract</li>
                <li>Look for I-131 form in "Hearings & Apps"</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/50 p-4 rounded-lg">
              <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                TPS Eligible Cases (Entry before 08/01/2023)
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-amber-800 dark:text-amber-200">
                <li>Venezuelan nationals</li>
                <li>Haitian nationals</li>
                <li>Ukrainian nationals</li>
                <li>Check for I-821 TPS form</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCases;