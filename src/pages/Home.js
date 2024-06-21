import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import '../styles/home.css';
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

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const onSubmit = (data) => {
    const templateParams = {
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };

    emailjs.send('service_6avm2ea', 'template_l21a74o', templateParams, '7r6y9xUxSQMDaPz2B')
      .then((result) => {
          console.log(result.text);
          reset();
          setMessageSent(true);
          setTimeout(() => setMessageSent(false), 5000); 
      }, (error) => {
          console.log(error.text);
      });
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

  return (
    <div className="home container">
      <h1 className="text-center mt-4">Добро пожаловать в интернет-магазин МЕДЯТИНА</h1>
      <p className="text-center">Откройте для себя лучший выбор натурального мёда, созданного с любовью и заботой. От насыщенного и богатого гречишного мёда до нежного акациевого мёда – у нас есть что-то на любой вкус. Каждая баночка наполнена чистой эссенцией природы, приносящей множество полезных свойств и непревзойдённый вкус. Исследуйте наш каталог и привнесите в свой дом доброту природы уже сегодня!</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="products mt-5"
      >
        <h2>Наши товары</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div
                className="product-image"
                style={{ backgroundImage: `url(${imageMap[product.category]})` }}
              ></div>
              <div>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>Цена: {product.price} руб.</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input className="form-control" {...register('name')} placeholder="Ваше имя" required />
        </div>
        <div className="form-group">
          <input className="form-control" {...register('email')} type="email" placeholder="Ваш email" required />
        </div>
        <div className="form-group">
          <textarea className="form-control" {...register('message')} placeholder="Сообщение" required />
        </div>
        <button className="btn btn-yellow" type="submit">Отправить</button>
      </form>
      {messageSent && <div className="alert alert-success mt-3">Сообщение успешно отправлено!</div>}
    </div>
  );
};

export default Home;
