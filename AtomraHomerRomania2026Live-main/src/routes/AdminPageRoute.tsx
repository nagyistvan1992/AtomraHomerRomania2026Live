import React from 'react';
import { AdminProvider } from '../context/AdminContext';
import AdminPage from '../pages/AdminPage';

const AdminPageRoute = () => {
  return (
    <AdminProvider>
      <AdminPage />
    </AdminProvider>
  );
};

export default AdminPageRoute;
