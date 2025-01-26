import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar,
  Hash,
  Users,
  FileText,
  Plus,
  Trash2,
  Check,
  Bell, 
  Edit,
  CalendarDays
} from 'lucide-react';

const ClientManagementApp = () => {
  // Shared states
  const [activeTab, setActiveTab] = useState('info');
  const [showNotifications, setShowNotifications] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    clientNumber: '',
    clientName: '',
    hearingDate: '',
    riders: [{
      aNumber: '',
      name: '',
      isMinor: false
    }],
    additionalNotes: '',
    calendar: [],
    editHistory: []
  });

  // Sample notifications
  const notifications = [
    { id: 1, title: 'New client update', time: '5m ago', type: 'info' },
    { id: 2, title: 'Document submitted', time: '1h ago', type: 'success' },
    { id: 3, title: 'Meeting scheduled', time: '2h ago', type: 'warning' },
  ];

  // Helper functions
  const formatANumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const matches = numbers.match(/\d{1,3}/g);
    if (matches) {
      return matches.join('-').substr(0, 11);
    }
    return '';
  };

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clientNumber') {
      setFormData(prev => ({
        ...prev,
        [name]: formatANumber(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRiderChange = (index, field, value) => {
    const updatedRiders = [...formData.riders];
    if (field === 'aNumber') {
      updatedRiders[index][field] = formatANumber(value);
    } else {
      updatedRiders[index][field] = value;
    }
    setFormData(prev => ({
      ...prev,
      riders: updatedRiders
    }));
  };

  const addRider = () => {
    setFormData(prev => ({
      ...prev,
      riders: [...prev.riders, { aNumber: '', name: '', isMinor: false }]
    }));
  };

  const removeRider = (index) => {
    if (formData.riders.length > 1) {
      setFormData(prev => ({
        ...prev,
        riders: prev.riders.filter((_, i) => i !== index)
      }));
    }
  };

  const addEditHistory = () => {
    const timestamp = new Date().toISOString();
    setFormData(prev => ({
      ...prev,
      editHistory: [...prev.editHistory, {
        timestamp,
        changes: 'Client information updated',
        user: 'Current User'
      }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    addEditHistory();
  };

  const addCalendarEvent = () => {
    const newEvent = {
      title: document.getElementById('eventTitle').value,
      date: document.getElementById('eventDate').value
    };
    setFormData(prev => ({
      ...prev,
      calendar: [...prev.calendar, newEvent]
    }));
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
  };

  // Render functions for different tabs
  const renderEditHistory = () => (
    <div className="overflow-y-auto h-full pr-4">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
        <Edit className="h-5 w-5 text-blue-400" />
        Edit History
      </h2>
      <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
        {formData.editHistory.map((edit, index) => (
          <div key={index} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <div className="flex justify-between text-gray-300">
              <span>{edit.changes}</span>
              <span className="text-sm">{new Date(edit.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">By: {edit.user}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="overflow-y-auto h-full pr-4">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
        <CalendarDays className="h-5 w-5 text-blue-400" />
        Calendar Events
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <input
              id="eventTitle"
              type="text"
              placeholder="Event Title"
              className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              id="eventDate"
              type="datetime-local"
              className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
            <button
              type="button"
              onClick={addCalendarEvent}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
            >
              Add Event
            </button>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
            {formData.calendar.map((event, index) => (
              <div key={index} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                <div className="text-gray-300">{event.title}</div>
                <div className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="overflow-y-auto h-full pr-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client A# */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Hash className="h-4 w-4 text-blue-400" />
              Client A#
            </label>
            <div className="relative group">
              <input
                type="text"
                name="clientNumber"
                value={formData.clientNumber}
                onChange={handleInputChange}
                placeholder="123-456-789"
                className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Client Name */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-400" />
              Client Name
            </label>
            <div className="relative group">
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
                className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Hearing Date */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              Hearing Date
            </label>
            <div className="relative group">
              <input
                type="date"
                name="hearingDate"
                value={formData.hearingDate}
                onChange={handleInputChange}
                className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              Additional Notes
            </label>
            <div className="relative group">
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes..."
                rows={4}
                className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Riders Section */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700/50 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Riders
          </h2>
          <button
            type="button"
            onClick={addRider}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            Add Rider
          </button>
        </div>

        <div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
          {formData.riders.map((rider, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="relative p-6 bg-gray-900/50 rounded-xl border border-gray-700/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rider A# */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-blue-400" />
                    Rider A#
                  </label>
                  <input
                    type="text"
                    value={rider.aNumber}
                    onChange={(e) => handleRiderChange(index, 'aNumber', e.target.value)}
                    placeholder="123-456-789"
                    className="w-full bg-gray-800/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  />
                </div>

                {/* Rider Name */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-400" />
                    Rider Name
                  </label>
                  <input
                    type="text"
                    value={rider.name}
                    onChange={(e) => handleRiderChange(index, 'name', e.target.value)}
                    placeholder="Enter rider name"
                    className="w-full bg-gray-800/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  />
                </div>

                {/* Minor Checkbox */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={rider.isMinor}
                      onChange={() => handleRiderChange(index, 'isMinor', !rider.isMinor)}
                      className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-700 rounded"
                    />
                    <span className="text-sm font-medium text-gray-300">Is Minor</span>
                  </label>
                </div>

                {/* Remove Rider Button (only if more than one rider) */}
                {formData.riders.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRider(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200"
        >
          <Check className="h-5 w-5" />
          Submit Client Information
        </button>
      </div>
    </form>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case 'info':
        return renderClientForm();
      case 'calendar':
        return renderCalendar();
      case 'edit':
        return renderEditHistory();
      default:
        return renderClientForm();
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Client Management</h1>
        <div className="flex items-center space-x-4">
          <nav className="flex gap-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'info' ? 'bg-blue-600' : 'text-gray-400 hover:text-white'
              }`}
            >
              Information
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'calendar' ? 'bg-blue-600' : 'text-gray-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'edit' ? 'bg-blue-600' : 'text-gray-400 hover:text-white'
              }`}
            >
              Edit History
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 custom-scroll">
        {activeTab === 'info' && renderClientForm()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'edit' && renderEditHistory()}
      </div>
    </div>
  );
};

export default ClientManagementApp;