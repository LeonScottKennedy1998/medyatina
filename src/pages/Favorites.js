import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/favorites.css';
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

const Favorites = ({ favorites, addToCart, removeFromFavorites }) => {
  const [quantities, setQuantities] = useState({});

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

  const handleQuantityChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value
    });
  };

  return (
    <div className="favorites container">
      <h1 className="text-center mt-4">Избранное</h1>
      <div className="favorites-grid">
        {favorites.map(product => (
          <div key={product.id} className="favorites-card">
            <Link to={`/product/${product.id}`} className="favorites-link">
              <div
                className="favorites-image"
                style={{ backgroundImage: `url(${imageMap[product.category]})` }}
              ></div>
              <span>{product.name}</span>
            </Link>
            <p className="price">Цена: {product.price} руб.</p>
            <div className="quantity-selector">
              <label htmlFor={`quantity-${product.id}`}>Количество:</label>
              <input 
                id={`quantity-${product.id}`}
                type="number"
                min="1"
                max={product.quantity}
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-yellow btn-sm mr-2"
                onClick={() => removeFromFavorites(product)}
              >
                <i className="fas fa-heart-broken"></i>
              </button>
              <button 
                className="btn btn-yellow btn-sm" 
                onClick={() => addToCart(product, quantities[product.id] || 1)}
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
