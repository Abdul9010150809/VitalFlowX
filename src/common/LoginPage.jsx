import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const roles = [
    { id: 'producer', name: 'Producer' },
    { id: 'transporter', name: 'Transporter' },
    { id: 'warehouse', name: 'Warehouse' },
    { id: 'retailer', name: 'Retailer' },
    { id: 'inspector', name: 'Inspector' },
    { id: 'regulator', name: 'Regulator' }
  ];

  const handleLogin = (role) => {
    localStorage.setItem('userRole', role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login / Select Role</h2>
        <div className="grid grid-cols-2 gap-4">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => handleLogin(role.id)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
