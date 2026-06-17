/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

import React, { useState } from 'react';
import "./checkout.css";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

function Checkout() {
  const params = useParams();
  const type = params.type;
  const id = params.id;

  const stripe = useStripe();
  const elements = useElements();

  const handleCancel = (event) => {
    event.preventDefault();
    window.history.back();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { token } = await stripe.createToken(elements.getElement(CardElement));
      const purchaseData = {
        token: localStorage.getItem('token'),
        type: type,
        id: id,
        paymentToken: token.id, 
      };

      fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Payment successful! Thanks!");
            window.history.back();
          } else {
            alert("Attention: Something went wrong.");
            window.history.back();
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    } catch (error) {
      console.error("Errore durante la creazione del token di pagamento:", error);
    }
  };

  return (
    <div className="checkoutPage">
      <div className="checkOut">
        <h1 id="paytitle">Check-out</h1>
        <div className="payContent">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
          />
        </div>
        <div className="payementActions">
          <div className="accept">
            <Button id="acc" variant="contained" onClick={handleSubmit}>Proceed</Button>
          </div>
          <div className="deny">
            <Button id="den" variant="outlined" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
