import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/catalog.css';
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

const Catalog = ({ addToFavorites, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach(product => initialQuantities[product.id] = 1);
        setQuantities(initialQuantities);
      });
  }, []);

  const handleFavorite = (product) => {
    if (!favorites.includes(product.id)) {
      addToFavorites(product);
      setFavorites([...favorites, product.id]);
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || product.category === category)
  );

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
    <div className="catalog container">
      <h1 className="text-center mt-4">Каталог товаров</h1>
      <div className="filters mb-4">
        <input 
          className="form-control mb-2"
          type="text" 
          placeholder="Поиск..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Все категории</option>
          <option value="lipoviy_small">Липовый малый</option>
          <option value="lipoviy_medium">Липовый средний</option>
          <option value="cvetochniy_small">Цветочный малый</option>
          <option value="cvetochniy_medium">Цветочный средний</option>
          <option value="grechishniy_small">Гречишный малый</option>
          <option value="grechishniy_medium">Гречишный средний</option>
          <option value="acacia_small">Акациевый малый</option>
          <option value="acacia_medium">Акациевый средний</option>
          <option value="raznotravye_small">Разнотравье малый</option>
          <option value="raznotravye_medium">Разнотравье средний</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <div
                className="product-image"
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
                value={quantities[product.id]}
                onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-yellow btn-sm mr-2"
                onClick={() => handleFavorite(product)}
              >
                <i className={`fas fa-heart ${favorites.includes(product.id) ? 'text-danger' : ''}`}></i>
              </button>
              <button 
                className="btn btn-yellow btn-sm" 
                onClick={() => addToCart(product, quantities[product.id])}
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

export default Catalog;
