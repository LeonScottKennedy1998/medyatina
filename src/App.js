import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const addToFavorites = (product) => {
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (product) => {
    setFavorites(favorites.filter(fav => fav.id !== product.id));
  };

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.product.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog addToFavorites={addToFavorites} addToCart={addToCart} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} addToCart={addToCart} removeFromFavorites={removeFromFavorites} />} />
          <Route path="/cart" element={<Cart cart={cart} clearCart={clearCart} removeFromCart={removeFromCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToFavorites={addToFavorites} addToCart={addToCart} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
