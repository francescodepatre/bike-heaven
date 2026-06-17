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
import "./addAccessory.css";

const AddAccessory = () => {

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

    const [selectedImage, setSelectedImage] = useState(null);
    const [base64Image,setBase64Image] = useState(null);
    const [accessoryName, setaccessoryName] = useState(null);
    const [price, setPrice] = useState(null);
    const [description,setDescription] = useState("none");
    const feedback = 0;
    const [brand, setBrand] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const category = 6;

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
      name: accessoryName,
      price: price,
      description: description,
      feedback: feedback,
      brand: brand,
      quantity: quantity,
      image: base64Image,
      category: category
    }
    fetch('/api/setAccessory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bikeData)
    }).then(response => response.json()).then(data => {
      if(data.success){
          alert('Accessory posted successfully')
      }
      else{
          alert("Attention: Accessory not posted")
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
        <div className='accessoryUpload'>
                    <div className="accessoryTitle">
                        <h1>Sell an Accessory</h1>
                    </div>
                    <div className="accessoryContainer">
                        <h3 className="accessoryName">Name Accessory</h3>
                        <TextField id="outlined-basic" className="field" label="Accessory Name" variant="outlined" onChange={(e) => setaccessoryName(e.target.value)}/>
                    </div>
                    <div className="accessoryContainer">
                        <h3 className="accessoryPrice">Price</h3>
                        <TextField id="outlined-basic" className="field" label="Accessory Price" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setPrice(e.target.value)}/>
                        <TextField
                              id="outlined-select-currency-native"
                              className='currencySelector'
                              select
                              label="Currency"
                              defaultValue="EUR"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                          </TextField>                    
                      </div>
                    <div className="accessoryContainer">
                        <h3 className="accessoryDescription">Description</h3>
                        <TextField id="outlined-multiline-static" label="Description" multiline rows={5} defaultValue="none" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="accessoryContainer">
                      <Typography component="legend" className="accessoryFeedback">Feedback (set up by customers)</Typography>
                      <Rating name="disabled" value={feedback} disabled />
                    </div>
                    <div className="accessoryContainer">
                        <h3 className="accessoryBrand">Brand</h3>
                        <TextField id="outlined-basic" className="field" label="Brand" variant="outlined" onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    
                    <div className="accessoryContainer">
                        <h3 className="accessoryQuantity">Quantity</h3>
                        <TextField id="outlined-basic" className="field" label="Quantity" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className="accessoryContainer">
                        <h3 className="accessoryImage">Image</h3>
                          <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          />
                    </div>
                    <div className="accessoryContainer">
                        <button id="cancelAccessory">Cancel</button>
                        <button id='confirmAccessory' onClick={handleForm}>Confirm</button>
                    </div>
                </div>
    </div>
  );
};

export default AddAccessory;
