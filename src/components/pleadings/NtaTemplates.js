
// src/components/pleadings/SpecialCases.jsx
import React from 'react';

const SpecialCases = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Special Cases
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Guidelines for Cuban, Venezuelan, Haitian, and Ukrainian cases
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Cuban Cases:</h4>
            <ul className="list-disc pl-4 space-y-2">
              <li>Check birth certificate and NTA</li>
              <li>Verify parole/humanitarian parole status in contract</li>
              <li>Look for I-131 form in "Hearings & Apps"</li>
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="font-medium">TPS Eligible Cases (Entry before 08/01/2023):</h4>
            <ul className="list-disc pl-4 space-y-2">
              <li>Venezuelan nationals</li>
              <li>Haitian nationals</li>
              <li>Ukrainian nationals</li>
              <li>Check for I-821 TPS form</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCases;