import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes/AppRoutes';
import EntryPage from './common/EntryPage';
import LoginPage from './common/LoginPage';
import NotFoundPage from './common/NotFoundPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
