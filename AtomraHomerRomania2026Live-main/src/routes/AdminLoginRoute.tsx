import React from 'react';
import { AdminProvider } from '../context/AdminContext';
import AdminLogin from '../components/AdminLogin';

const AdminLoginRoute = () => {
  return (
    <AdminProvider>
      <AdminLogin />
    </AdminProvider>
  );
};

export default AdminLoginRoute;
