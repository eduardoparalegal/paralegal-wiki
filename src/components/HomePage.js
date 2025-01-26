import React from 'react';
import { FileText, Scale, Calculator } from 'lucide-react';
import Card from './Card';

const FeatureCard = ({ icon: Icon, title, description, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    <Card className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors h-full">
      <div className="flex flex-col space-y-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </Card>
  </div>
);

const RecentCard = ({ title, description, date, onClick }) => (
  <Card className="p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 dark:text-gray-500">{date}</span>
      <button
        onClick={onClick}
        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
      >
        More... →
      </button>
    </div>
  </Card>
);

const HomePage = ({ onNavigate = () => {} }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Paralegal Wiki
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A safe place for Paralegals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={FileText}
          title="Pleadings information"
          description="Examples, information on pleadings and their complements."
          onClick={() => onNavigate('/pleadings')}
        />
        <FeatureCard
          icon={Scale}
          title="Motions Information"
          description="All motions explained, and how to do them."
          onClick={() => onNavigate('/recursos')}
        />
        <FeatureCard
          icon={Calculator}
          title="Declarations and others"
          description="General information about the declaration and registration form and registration."
          onClick={() => onNavigate('/forms')}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Recent additions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentCard
            title="Declaration search engine"
            description="Now you can search for declaration by A#, modify and delete them.."
            date="2025-01-06"
            onClick={() => onNavigate('/forms')}
          />
          <RecentCard
            title="42-B"
            description="Explanation of how, when to make a 42-B."
            date="2025-01-06"
            onClick={() => onNavigate('/forms')}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;