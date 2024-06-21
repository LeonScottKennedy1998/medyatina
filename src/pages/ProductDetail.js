import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/productDetail.css';

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

const ProductDetail = ({ addToFavorites, addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleFavorite = (product) => {
    addToFavorites(product);
    setFavorites(prevFavorites =>
      prevFavorites.includes(product.id)
        ? prevFavorites.filter(id => id !== product.id)
        : [...prevFavorites, product.id]
    );
  };

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

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="product-detail container"
    >
      <div className="row">
        <div className="col-md-6">
          <img src={imageMap[product.category]} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1 className="text-center mt-4">{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">Цена: {product.price} руб.</p>
          <div className="quantity-selector">
            <label htmlFor={`quantity-${product.id}`}>Количество:</label>
            <input 
              id={`quantity-${product.id}`}
              type="number"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="button-group">
            <button
              className="btn btn-outline-dark btn-sm mr-2"
              onClick={() => handleFavorite(product)}
            >
              <i className={`fas fa-heart ${favorites.includes(product.id) ? 'text-danger' : ''}`}></i>
            </button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => addToCart(product, quantity)}>В корзину</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
