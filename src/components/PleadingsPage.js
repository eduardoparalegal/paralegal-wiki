// src/components/PleadingsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PleadingCard from './pleadings/PleadingCard';

const PleadingsPage = () => {
  const navigate = useNavigate();

  const pleadings = [
    {
      id: 1,
      title: "Basic Information about Pleadings: Portal",
      description: "Complete guide for drafting effective legal pleadings with templates and examples",
      date: "Updated: January 2024",
      status: "New",
      route: "/pleadings/how-to-draft-pleadings"
    },
    {
      id: 2,
      title: "How to Know if the Respondent Can Be Pleadings: NTA",
      description: "Complete guide for drafting effective legal pleadings with templates and examples",
      date: "Updated: January 2024",
      status: "New",
      route: "/pleadings/how-to-know-respondent-pleadings"
    },
    {
      id: 3,
      title: "How to Draft Pleadings?",
      description: "Complete guide for drafting effective legal pleadings with templates and examples",
      date: "Updated: January 2024",
      status: "New",
      route: "/pleadings/how-to-draft-pleadings"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Pleadings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Access comprehensive information about legal pleadings, including templates, 
          guidelines, and best practices for various types of legal documents.
        </p>
      </div>

      <div className="grid gap-6">
        {pleadings.map((pleading) => (
          <PleadingCard 
            key={pleading.id} 
            {...pleading} 
          />
        ))}
      </div>
    </div>
  );
};

export default PleadingsPage;