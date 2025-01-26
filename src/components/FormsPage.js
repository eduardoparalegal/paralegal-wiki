import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  UserPlus, 
  FileEdit, 
  Calendar 
} from 'lucide-react';
import '../styles/animations.css';

const FormsPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { id: 'personal', title: 'Personal Information', icon: UserPlus },
    { id: 'case', title: 'Case Information', icon: FileEdit },
    { id: 'additional', title: 'Additional Details', icon: Calendar }
  ];

  const formFields = {
    0: [
      { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter your first name' },
      { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter your last name' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter your phone number' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-2xl font-bold mb-8">New Declaration</h1>
      
      <div className="max-w-4xl mx-auto bg-[#1e293b] rounded-xl shadow-xl p-6">
        {/* Steps Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                index === activeStep
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <step.icon className="w-5 h-5" />
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-700 rounded mb-8">
          <div
            className="absolute h-full bg-blue-500 rounded transition-all duration-300 ease-out"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Form Content */}
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4">{steps[activeStep].title}</h2>
          <p className="text-gray-400 mb-6">Please provide your contact details</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields[activeStep]?.map((field) => (
              <div key={field.name} className="animate-slideIn">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-[#2d3748] border border-gray-600 
                           text-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg transition-colors
              ${activeStep === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            className="flex items-center px-6 py-2 rounded-lg bg-blue-600 text-white 
                     hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormsPage;