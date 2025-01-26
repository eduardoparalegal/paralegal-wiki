
// src/components/pleadings/InformationPleadings.jsx
import React from 'react';

const InformationPleadings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Information Pleadings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Initial verification process for pleadings
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <p className="text-sm">Before proceeding with pleadings:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Check if client has been in the US for 10 years</li>
            <li>Contact Diana and/or Susana to confirm if client wants dismissal or 42-B</li>
            <li>For dismissal cases, proceed with regular pleadings</li>
            <li>For 42-B cases, review Paragraph 6 requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationPleadings;