import { Navigate } from 'react-router-dom';

// Importar páginas
import HomePage from '../../pages/HomePage';
import CaseSearchPage from '../../pages/CaseSearchPage';
import CaseHistoryPage from '../../pages/CaseHistoryPage';
import UserProfilePage from '../../pages/UserProfilePage';
import LoginPage from '../../pages/LoginPage';

// Definir rutas principales
export const routes = [
  {
    path: '/login',
    element: LoginPage,
    public: true
  },
  {
    path: '/home',
    element: HomePage,
    protected: true
  },
  {
    path: '/case-search',
    element: CaseSearchPage,
    protected: true
  },
  {
    path: '/case-history',
    element: CaseHistoryPage,
    protected: true
  },
  {
    path: '/profile',
    element: UserProfilePage,
    protected: true
  },
  {
    path: '/',
    element: () => <Navigate to="/login" replace />,
    public: true
  }
];

// Rutas anidadas de búsqueda de casos
export const caseSearchRoutes = [
  {
    path: 'new',
    element: CaseSearchPage
  },
  {
    path: 'history',
    element: CaseHistoryPage
  }
];