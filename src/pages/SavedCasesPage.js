import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/Card';

const SavedCasesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Saved Cases</CardTitle>
          <CardDescription>
            Access your bookmarked and saved cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Aquí irán los casos guardados */}
            <p className="text-gray-600">No saved cases found.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedCasesPage;