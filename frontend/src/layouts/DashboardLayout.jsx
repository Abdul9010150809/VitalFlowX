import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';

const DashboardLayout = ({ role, links, children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600 capitalize">{role} Portal</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={`/${role}/${link.path}`}
                className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:hidden">
          <button className="text-gray-500 hover:text-gray-700">
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-4 font-bold capitalize">{role}</span>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
