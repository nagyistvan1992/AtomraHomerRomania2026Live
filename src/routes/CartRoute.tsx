import React from 'react';
import { StripeProvider } from '../context/StripeContext';
import CartPage from '../pages/CartPage';

const CartRoute = () => {
  return (
    <StripeProvider>
      <CartPage />
    </StripeProvider>
  );
};

export default CartRoute;
