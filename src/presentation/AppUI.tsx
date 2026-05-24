import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import PreparacionPage from './pages/PreparacionPage';
import JuegoPage from './pages/JuegoPage';
import CraniumPage from './pages/CraniumPage';
import { useAuthStore } from '@gamecards/application';

export const AppUI: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/preparacion" element={user ? <PreparacionPage /> : <Navigate to="/login" />} />
        <Route path="/juego" element={user ? <JuegoPage /> : <Navigate to="/login" />} />
        <Route path="/cranium" element={user ? <CraniumPage /> : <Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
};
