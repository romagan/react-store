import React from 'react';
import CartTotal from '../cart-total';

const CartPage = () => {
  return (
    <div>
      <h1 className="text-center mb-5">Your Order</h1>

      <CartTotal />
    </div>
  )
}

export default CartPage;
