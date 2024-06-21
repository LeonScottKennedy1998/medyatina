import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => (
  <header className="header bg-warning text-dark p-3">
    <nav className="navbar navbar-expand-lg navbar-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Главная</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/catalog">Каталог</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Избранное</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Корзина</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
