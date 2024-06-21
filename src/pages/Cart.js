import React, { useState } from 'react';
import Checkout from '../components/Checkout';
import '../styles/cart.css';
import lipoviySmall from '../images/lipoviy_small.jpg';
import lipoviyMedium from '../images/lipoviy_medium.jpg';
import cvetochniySmall from '../images/cvetochniy_small.jpg';
import cvetochniyMedium from '../images/cvetochniy_medium.jpg';
import grechishniySmall from '../images/grechishniy_small.jpg';
import grechishniyMedium from '../images/grechishniy_medium.jpg';
import acaciaSmall from '../images/acacia_small.jpg';
import acaciaMedium from '../images/acacia_medium.jpg';
import raznotravyeSmall from '../images/raznotravye_small.jpg';
import raznotravyeMedium from '../images/raznotravye_medium.jpg';

const Cart = ({ cart, clearCart, removeFromCart }) => {
  const [checkout, setCheckout] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const imageMap = {
    lipoviy_small: lipoviySmall,
    lipoviy_medium: lipoviyMedium,
    cvetochniy_small: cvetochniySmall,
    cvetochniy_medium: cvetochniyMedium,
    grechishniy_small: grechishniySmall,
    grechishniy_medium: grechishniyMedium,
    acacia_small: acaciaSmall,
    acacia_medium: acaciaMedium,
    raznotravye_small: raznotravyeSmall,
    raznotravye_medium: raznotravyeMedium
  };

  return (
    <div className="cart container">
      <h1 className="text-center mt-4">Корзина</h1>
      <div className="cart-grid">
        {cart.map(item => (
          <div key={item.product.id} className="cart-card">
            <div
              className="cart-image"
              style={{ backgroundImage: `url(${imageMap[item.product.category] || '/path/to/default/image.jpg'})` }}
            ></div>
            <div className="cart-details">
              <span>{item.product.name}</span>
              <p className="price">{item.product.price} руб. x {item.quantity} = {item.product.price * item.quantity} руб.</p>
              <button className="btn btn-yellow btn-sm" onClick={() => removeFromCart(item.product)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
      <p className="total">Итого: {total} руб.</p>
      <button className="btn btn-yellow" onClick={() => setCheckout(true)}>Оформить заказ</button>
      {checkout && <Checkout cart={cart} clearCart={clearCart} />}
    </div>
  );
};

export default Cart;
