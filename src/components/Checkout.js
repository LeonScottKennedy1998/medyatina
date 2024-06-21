import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import '../styles/checkout.css';

const Checkout = ({ cart, clearCart }) => {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const orderDetails = cart.map(item => `${item.product.name}: ${item.quantity} x ${item.product.price} руб. = ${item.quantity * item.product.price} руб.`).join('\n');

    const emailData = {
      to_name: data.name,
      to_email: data.email,  
      order_details: orderDetails,
      total: total,
    };

    emailjs.send('service_6avm2ea', 'template_qv0slgr', emailData, '7r6y9xUxSQMDaPz2B')
      .then((result) => {
        console.log(result.text);
        clearCart();
        reset();
        setSubmitted(true);
      }, (error) => {
        console.log(error.text);
        alert('Ошибка отправки письма, попробуйте еще раз.');
      });
  };

  return (
    <div className="checkout container">
      <h1 className="text-center mt-4">Оформление заказа</h1>
      {!submitted ? (
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input className="form-control" {...register('name')} placeholder="Ваше имя" required />
          </div>
          <div className="form-group">
            <input className="form-control" {...register('email')} type="email" placeholder="Ваш email" required />
          </div>
          <button className="btn btn-yellow" type="submit">Отправить</button>
        </form>
      ) : (
        <div className="alert alert-success mt-3">Ваш заказ был успешно оформлен!</div>
      )}
    </div>
  );
};

export default Checkout;
