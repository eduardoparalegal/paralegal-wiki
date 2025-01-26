import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientForm from '../components/ClientForm';

const DeclarationRoutes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route
          path="new"
          element={
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                New Declaration
              </h2>
              <ClientForm />
            </div>
          }
        />
        <Route
          path="search"
          element={
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <input
                  type="search"
                  className="form-input w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Search declarations..."
                />
              </div>
            </div>
          }
        />
        <Route
          path="edit"
          element={
            <div className="space-y-6">
              <ClientForm />
            </div>
          }
        />
        <Route
          index
          element={
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Declaration Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please select an option from the menu to continue
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default DeclarationRoutes;