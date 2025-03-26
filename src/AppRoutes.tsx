// src/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/HomePage";
import TransferPage from "./pages/TransferPage";

export function AppRoutes() {
/*
  <Route path="/login" element={
    <PublicRouter isAuthenticated={isAuthenticated}>
      <RegisterPage />
    </PublicRouter>
  } />

  <Route path="/register" element={
    <PublicRouter isAuthenticated={isAuthenticated}>
      <RegisterPage />
    </PublicRouter>
  } />*/
  return (
    <Routes>
      <Route path="/transferencias" element={<TransferPage />} />
      <Route path="/home" element={<Home />} />

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
