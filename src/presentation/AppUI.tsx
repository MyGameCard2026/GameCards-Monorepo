import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import PreparacionPage from './pages/PreparacionPage';
import JuegoPage from './pages/JuegoPage';
import { useAuthStore } from '@gamecards/application';

export const AppUI: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/preparacion" element={user ? <PreparacionPage /> : <Navigate to="/login" />} />
        <Route path="/juego" element={user ? <JuegoPage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
