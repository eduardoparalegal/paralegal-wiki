import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const BasicForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    caseNumber: '',
    courtDivision: '',
    filingType: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.caseNumber.trim()) newErrors.caseNumber = 'Case number is required';
    if (!formData.courtDivision.trim()) newErrors.courtDivision = 'Court division is required';
    if (!formData.filingType.trim()) newErrors.filingType = 'Filing type is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        caseNumber: '',
        courtDivision: '',
        filingType: '',
        description: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Legal Document Filing Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Case Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Case Number
          </label>
          <input
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.caseNumber ? 'border-red-500' : 'border-gray-300'
            } dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.caseNumber && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.caseNumber}
            </p>
          )}
        </div>

        {/* Court Division */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Court Division
          </label>
          <select
            name="courtDivision"
            value={formData.courtDivision}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.courtDivision ? 'border-red-500' : 'border-gray-300'
            } dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Court Division</option>
            <option value="civil">Civil Division</option>
            <option value="criminal">Criminal Division</option>
            <option value="family">Family Division</option>
            <option value="probate">Probate Division</option>
          </select>
          {errors.courtDivision && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.courtDivision}
            </p>
          )}
        </div>

        {/* Filing Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Filing Type
          </label>
          <select
            name="filingType"
            value={formData.filingType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.filingType ? 'border-red-500' : 'border-gray-300'
            } dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Filing Type</option>
            <option value="complaint">Complaint</option>
            <option value="motion">Motion</option>
            <option value="response">Response</option>
            <option value="appeal">Appeal</option>
          </select>
          {errors.filingType && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.filingType}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Additional Details
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit Filing
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicForm;