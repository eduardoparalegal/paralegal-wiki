// src/components/pleadings/EligibilityCheck.jsx
import React from 'react';
import { ArrowLeft, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EligibilityCheck = () => {
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              42-B Eligibility Check
            </h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Initial verification process for 42-B eligibility
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Required Verifications
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Pre-Check Requirements
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-blue-800 dark:text-blue-200">
                    <li>Verify 10-year presence in the United States</li>
                    <li>Review all submitted documentation for timeline consistency</li>
                    <li>Check for any breaks in presence documentation</li>
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/50 p-4 rounded-lg">
                  <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                    Client Confirmation Process
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-amber-800 dark:text-amber-200">
                    <li>Contact Diana or Susana for case direction confirmation</li>
                    <li>Document client's preference (dismissal vs 42-B)</li>
                    <li>Obtain written confirmation when possible</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Case Processing
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border dark:border-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                    Dismissal Cases
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Follow standard pleading procedures</li>
                    <li>Prepare dismissal documentation</li>
                    <li>Review court requirements</li>
                  </ul>
                </div>

                <div className="border dark:border-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                    42-B Cases
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Review Paragraph 6 requirements in detail</li>
                    <li>Verify supporting documentation</li>
                    <li>Prepare 42-B specific forms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Additional Resources
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <FileText className="h-5 w-5 mr-2 text-gray-500" />
                    <span>42-B Eligibility Checklist</span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <FileText className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Documentation Timeline Template</span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <FileText className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Client Confirmation Form</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCheck;