import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ShipmentProvider } from './context/ShipmentContext';
import AppRoutes from './routes/AppRoutes';
import EntryPage from './common/EntryPage';
import LoginPage from './common/LoginPage';
import NotFoundPage from './common/NotFoundPage';
import UnauthorizedPage from './common/UnauthorizedPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <ShipmentProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<EntryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="/*" element={<AppRoutes />} />
              </Routes>
            </BrowserRouter>
          </ShipmentProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
