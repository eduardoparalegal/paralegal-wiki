import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import PleadingsPage from './components/PleadingsPage';
import MotionsPage from './components/MotionsPage';
import FormsPage from './components/FormsPage';
import ResourcesPage from './components/ResourcesPage';
import ClientForm from './components/ClientForm';
import AnimatedLogin from './components/AnimatedLogin/AnimatedLogin';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';

import CaseSearchPage from './pages/CaseSearchPage';
import HistoryPage from './pages/HistoryPage';
import SavedCasesPage from './pages/SavedCasesPage';

// Import pleadings pages
import EligibilityCheck from './components/pleadings/EligibilityCheck';
import CaseTypeGuidelines from './components/pleadings/CaseTypeGuidelines';
import NtaTemplates from './components/pleadings/NtaTemplates';
import SpecialCases from './components/pleadings/SpecialCases';
import InformationPleadings from './components/pleadings/InformationPleadings';
import HowToDraftPleadings from './components/pleadings/HowToDraftPleadings';
import HowToKnowPleadings from './components/pleadings/HowToKnowPleadings';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loader />;
  }
  
  return children;
};

const DeclarationPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route
          path="/new"
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
          path="/search"
          element={
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <input
                  type="search"
                  className="form-input"
                  placeholder="Search declarations..."
                />
              </div>
            </div>
          }
        />
        <Route
          path="/edit"
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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<AnimatedLogin />} />
            
            {/* Cambiado para redirigir a /home en lugar de /login */}
            <Route 
              path="/" 
              element={<Layout><HomePage /></Layout>} 
            />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="home" element={<HomePage />} />
                      <Route path="pleadings" element={<PleadingsPage />} />
                      <Route path="motions" element={<MotionsPage />} />
                      <Route path="declaration" element={<ClientForm />} />
                      <Route path="case-search" element={<CaseSearchPage />} />
                      <Route path="history" element={<HistoryPage />} />
                      <Route path="saved" element={<SavedCasesPage />} />
                      
                      {/* Pleadings subrutas */}
                      <Route path="pleadings/how-to-draft" element={<HowToDraftPleadings />} />
                      <Route path="pleadings/how-to-know" element={<HowToKnowPleadings />} />
                      <Route path="pleadings/eligibility" element={<EligibilityCheck />} />
                      <Route path="pleadings/guidelines" element={<CaseTypeGuidelines />} />
                      <Route path="pleadings/templates" element={<NtaTemplates />} />
                      <Route path="pleadings/special" element={<SpecialCases />} />
                      <Route path="pleadings/information" element={<InformationPleadings />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;