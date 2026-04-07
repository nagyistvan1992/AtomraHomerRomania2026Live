import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from './Header';
import Footer from './Footer';

const CartDrawer = lazy(() => import('./CartDrawer'));

const MainLayout: React.FC = () => {
  const { state } = useCart();
  const shouldRenderCartDrawer = state.isOpen || state.showAddAnimation || state.items.length > 0;

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        {shouldRenderCartDrawer ? <CartDrawer /> : null}
      </Suspense>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
