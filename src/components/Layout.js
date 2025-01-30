import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Book, 
  Scale, 
  Calculator, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  History,
  LogOut,
  BookmarkCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Pleadings', href: '/pleadings', icon: FileText },
    { 
      name: 'Motions', 
      href: '/motions', 
      icon: Scale, 
      submenu: [
        { name: 'Motion for name correction', href: '/motions/name-correction' },
        { name: 'Motion to advance hearing', href: '/motions/advance-hearing' },
        { name: 'Motion to consolidate', href: '/motions/consolidate' },
        { name: 'Motion to reopen', href: '/motions/reopen' }
      ]
    },
    { 
      name: 'Declaration', 
      href: '/declaration', 
      icon: Calculator,
      submenu: [
        { name: 'New Declaration', href: '/declaration/new' },
        { name: 'Search Declarations', href: '/declaration/search' },
        { name: 'Edit Declaration', href: '/declaration/edit' }
      ]
    },
    { 
      name: 'EOIR Search', 
      href: '/eoir', 
      icon: Search,
      submenu: [
        { name: 'Case Search', href: '/case-search', icon: Search },
        { name: 'Search History', href: '/history', icon: History },
        { name: 'Saved Cases', href: '/saved', icon: BookmarkCheck }
      ]
    }
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebar = document.querySelector('.mobile-sidebar');
      const menuButton = document.querySelector('.mobile-menu-button');
      
      if (
        isSidebarOpen && 
        sidebar && 
        menuButton && 
        !sidebar.contains(event.target) && 
        !menuButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (window.innerWidth < 1024) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isSidebarOpen]);

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isCurrentPath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    logout();
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`${!isSidebarOpen && !mobile ? 'hidden' : 'block'} h-full`}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-14 items-center border-b border-gray-700 px-4">
          <Link to="/home" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-200">Wiki Paralegal</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`${
                      isCurrentPath(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    } w-full group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium`}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0 sidebar-icon" />
                      {item.name}
                    </div>
                    {expandedMenus[item.name] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedMenus[item.name] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`${
                            isCurrentPath(subItem.href)
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          } group flex items-center rounded-md px-2 py-1.5 text-sm`}
                        >
                          {subItem.icon && <subItem.icon className="mr-3 h-4 w-4" />}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`${
                    isCurrentPath(item.href)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium mt-4"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar for desktop */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900 border-r border-gray-700 transition-all duration-300 ${
        isSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
      }`}>
        <Sidebar />
      </div>

      {/* Mobile menu button and header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center border-b border-gray-700 bg-gray-900 px-4 lg:hidden">
        <button
          className="mobile-menu-button text-gray-400 hover:text-gray-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <span className="ml-4 text-lg font-semibold text-gray-200">Wiki Paralegal</span>
      </div>

      {/* Mobile sidebar */}
      <div 
        className={`mobile-sidebar lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar mobile />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-gray-900/80 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`flex-1 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'} transition-all duration-300`}>
        <main className="py-14 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;