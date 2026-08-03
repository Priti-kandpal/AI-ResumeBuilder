import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppRoutes />
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
