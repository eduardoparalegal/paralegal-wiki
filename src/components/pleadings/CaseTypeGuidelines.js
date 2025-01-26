
// src/components/pleadings/CaseTypeGuidelines.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

const CaseTypeGuidelines = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Case Type Guidelines
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Procedures for different case types and locations
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Important Notes</p>
          </div>
          <ul className="list-disc pl-4 space-y-2">
            <li>Withholding only cases: No NTA or pleadings required</li>
            <li>Removal cases: NTA present, pleadings may be required</li>
            <li>San Francisco cases: No coversheets needed</li>
          </ul>
          <p className="font-medium mt-4">Extra declarations required for:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Concord</li>
            <li>Houston</li>
            <li>IJ Haer of Atlanta – Peachtree</li>
            <li>San Francisco</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseTypeGuidelines;