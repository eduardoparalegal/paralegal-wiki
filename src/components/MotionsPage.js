import React from 'react';
import { Scale, ArrowRight } from 'lucide-react';
import Card from './Card';

const MotionCard = ({ title, description, category, deadline }) => (
  <Card className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <Scale className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Category: {category}</span>
            {deadline && (
              <span className="text-sm text-red-600 dark:text-red-400">Deadline: {deadline}</span>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
      View motion details
      <ArrowRight className="ml-2 h-4 w-4" />
    </div>
  </Card>
);

const MotionsPage = () => {
  const motions = [
    {
      title: "Motion to Dismiss",
      description: "Guidelines and templates for filing motions to dismiss under various grounds",
      category: "Pre-trial Motions",
      deadline: "30 days from service"
    },
    {
      title: "Motion for Summary Judgment",
      description: "Complete guide for summary judgment motions including requirements and standards",
      category: "Dispositive Motions",
      deadline: "After discovery"
    },
    {
      title: "Motion to Compel",
      description: "Templates and procedures for motions to compel discovery responses",
      category: "Discovery Motions",
      deadline: null
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Motions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Access comprehensive information about different types of motions, 
          including templates, filing procedures, and important deadlines.
        </p>
      </div>

      <div className="grid gap-6">
        {motions.map((motion, index) => (
          <MotionCard key={index} {...motion} />
        ))}
      </div>
    </div>
  );
};

export default MotionsPage;