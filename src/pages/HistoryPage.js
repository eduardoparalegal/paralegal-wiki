import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';

const CaseSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Aquí iría tu lógica de búsqueda
      console.log('Searching for:', searchQuery);
      // Simular resultados de búsqueda
      setSearchResults([]);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Case Search</CardTitle>
          <CardDescription>
            Search through cases using keywords, dates, or case numbers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search terms..."
                className="flex-1 p-2 border rounded"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {searchResults.length > 0 && (
            <div className="mt-6">
              {/* Resultados de búsqueda aquí */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseSearchPage;