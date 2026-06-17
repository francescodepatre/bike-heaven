/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const stripePromise = loadStripe('pk_test_51Nh9CuHKIas7nMAJAWJ7Zs6MPhq5i3OA1SNJ0mrxX7SGj8u3ZeX3qXJNO3owTXtNKkeBki4p2JSlcaEUjWdRrsai00ETKqelC5');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
