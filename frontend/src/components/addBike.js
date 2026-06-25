/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import "./style/addBike.css";

const AddBike = () => {

    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

      const [base64Image,setBase64Image] = useState(null);
      const [selectedImage, setSelectedImage] = useState(null);
      const [bikeName, setBikeName] = useState(null);
      const [price, setPrice] = useState(null);
      const [description,setDescription] = useState("none");
      const [feedback, setFeedback] = useState(0);
      const [brand, setBrand] = useState(null);
      const [frame, setFrame] = useState(null);
      const [dimensions,setDimensions] = useState(null);
      const [gear, setGear] = useState(null);
      const [brakes,setBrakes] = useState(null);
      const [suspensions, setSuspensions] = useState(null);
      const [weight, setWeight] = useState(null);
      const [quantity, setQuantity] = useState(0);
      const [category, setCategory] = useState(1);

      const handleChange = (event) => {
        setCategory(event.target.value);
      };
    
    const handleImageChange = (event) => {
      const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setSelectedImage(file);
      setBase64Image(reader.result);
    };
    
    reader.readAsDataURL(file);
    };  

    const handleForm = (event) => {
      event.preventDefault();
      let bikeData = {
        name: bikeName,
        price: price,
        description: description,
        feedback: feedback,
        brand: brand,
        frame: frame,
        dimensions: dimensions,
        gear: gear,
        brakes: brakes,
        suspensions: suspensions,
        weight: weight,
        quantity: quantity,
        image: base64Image,
        category: category
      }
      fetch('https://bike-heaven.onrender.com/api/setBike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bikeData)
      }).then(response => response.json()).then(data => {
        if(data.success){
            alert('Bike posted successfully')
        }
        else{
            alert("Attention: Bike not posted")
        }
      }).catch(error => {
        console.log(error)
      })
    }

  return (
  <div>
    <div className="ep-header">
      <p className="ep-eyebrow">Catalogo</p>
      <h1 className="ep-title">Aggiungi una bici</h1>
    </div>
    <div className="ep-body">
      <div className="ep-form-panel">
        <div className="ep-form-grid">
          <div className="ep-field">
            <label htmlFor="ab-name">Nome bici</label>
            <input id="ab-name" type="text" placeholder="es. Trek Domane SL 6"
              onChange={(e) => setBikeName(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-brand">Brand</label>
            <input id="ab-brand" type="text" placeholder="es. Trek"
              onChange={(e) => setBrand(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-price">Prezzo (€)</label>
            <input id="ab-price" type="number" placeholder="0.00"
              onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-qty">Quantità</label>
            <input id="ab-qty" type="number" placeholder="0"
              onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-frame">Telaio</label>
            <input id="ab-frame" type="text" onChange={(e) => setFrame(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-gear">Cambio</label>
            <input id="ab-gear" type="text" onChange={(e) => setGear(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-brakes">Freni</label>
            <input id="ab-brakes" type="text" onChange={(e) => setBrakes(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-susp">Sospensioni</label>
            <input id="ab-susp" type="text" onChange={(e) => setSuspensions(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-dim">Dimensioni (cm)</label>
            <input id="ab-dim" type="number" onChange={(e) => setDimensions(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-weight">Peso (kg)</label>
            <input id="ab-weight" type="number" onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="ep-field">
            <label htmlFor="ab-cat">Categoria</label>
            <select id="ab-cat" onChange={handleChange} value={category}>
              <option value={1}>Bici da strada</option>
              <option value={2}>Mountain bike</option>
              <option value={3}>City bike</option>
              <option value={4}>E-bike</option>
              <option value={5}>Bici per bambini</option>
            </select>
          </div>
          <div className="ep-field full">
            <label htmlFor="ab-desc">Descrizione</label>
            <textarea id="ab-desc" placeholder="Descrivi il prodotto…"
              onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="ep-field full">
            <label htmlFor="ab-img">Immagine</label>
            <input id="ab-img" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="ep-rating-row full">
            <span className="ep-rating-label">Feedback clienti</span>
            <span className="ep-stars">★★★★★</span>
            <span style={{fontSize:'11px', color:'var(--ep-text-muted)'}}>impostato dai clienti</span>
          </div>
        </div>

        {feedback && <p className="ep-alert ep-alert--success">{feedback}</p>}
        {error && <p className="ep-alert ep-alert--error">{error}</p>}

        <div className="ep-actions">
          <button className="ep-btn ep-btn--ghost" onClick={() => navigate('/')}>Annulla</button>
          <button className="ep-btn ep-btn--primary" onClick={handleForm} disabled={loading}>
            {loading ? 'Pubblicazione…' : 'Pubblica prodotto'}
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default AddBike;
