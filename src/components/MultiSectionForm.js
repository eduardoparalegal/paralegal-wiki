import React, { useState } from 'react';
import { 
  User, 
  FileEdit, 
  Calendar,
  ArrowLeft, 
  ArrowRight, 
  Check,
  Mail,
  Phone,
  Building,
  FileText
} from 'lucide-react';

const MultiSectionForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  const sections = [
    {
      title: 'Add Information',
      description: 'Enter basic client details',
      icon: User,
      color: 'bg-blue-500 dark:bg-blue-600'
    },
    {
      title: 'Edit Information',
      description: 'Modify existing details',
      icon: FileEdit,
      color: 'bg-purple-500 dark:bg-purple-600'
    },
    {
      title: 'Schedule',
      description: 'Set appointments',
      icon: Calendar,
      color: 'bg-green-500 dark:bg-green-600'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(curr => curr + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(curr => curr - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderAddClientSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter first name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Last Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Company</label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="Enter company name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Additional Notes</label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="4"
            className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            placeholder="Enter any additional notes"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return renderAddClientSection();
      case 1:
      case 2:
        return <div className="p-4 text-center text-gray-500 dark:text-gray-400">This section is under development</div>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="max-w-4xl mx-auto p-6 h-screen overflow-y-auto" 
      style={{ maxHeight: '100vh', overflowY: 'auto' }}
    >
      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`relative cursor-pointer rounded-xl p-6 ${
                index === currentSection 
                  ? section.color 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              } transform transition-all duration-300 hover:scale-105 shadow-lg`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  index === currentSection 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    index === currentSection 
                      ? 'text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    index === currentSection 
                      ? 'text-white' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {section.title}
                  </h3>
                  <p className={`text-sm ${
                    index === currentSection 
                      ? 'text-white/80' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {section.description}
                  </p>
                </div>
              </div>
              {index === currentSection && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-white dark:bg-blue-600 rounded-full p-1.5 shadow-lg">
                    <Check className="h-4 w-4 text-blue-600 dark:text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          {renderCurrentSection()}
        </form>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePreviousSection}
          disabled={currentSection === 0}
          className={`flex items-center px-6 py-3 rounded-lg transition-all ${
            currentSection === 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Previous
        </button>
        
        {currentSection === sections.length - 1 ? (
          <button
            type="submit"
            className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all"
          >
            <Check className="h-5 w-5 mr-2" />
            Submit Form
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextSection}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all"
          >
            Next
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiSectionForm;