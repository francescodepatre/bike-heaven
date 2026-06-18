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
import "./style/addService.css";

const AddService = () => {

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
    const [serviceName, setServiceName] = useState(null);
    const [price, setPrice] = useState(null);
    const [description,setDescription] = useState("none");
    const feedback = 0;
    const [brand, setBrand] = useState(null);
    const category = 7;

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
        name: serviceName,
        price: price,
        description: description,
        feedback: feedback,
        brand: brand,
        image: base64Image,
        category: category
      }
      console.log(bikeData);
      fetch('https://bike-heaven.onrender.com/api/postService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bikeData)
      }).then(response => response.json()).then(data => {
        if(data.success){
            alert('Service posted successfully')
        }
        else{
            alert("Attention: Service not posted")
        }
      }).catch(error => {
        console.log(error)
      })
    }

  return (
    <div>
        <div className='serviceUpload'>
                    <div className="serviceTitle">
                        <h1>Offer a Service</h1>
                    </div>
                    <div className="serviceContainer">
                        <h3 className="serviceName">Name Service</h3>
                        <TextField id="outlined-basic" className="field" label="Service Name" variant="outlined" onChange={(e) => setServiceName(e.target.value)}/>
                    </div>
                    <div className="serviceContainer">
                        <h3 className="servicePrice">Price</h3>
                        <TextField id="outlined-basic" className="field" label="Service Price" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setPrice(e.target.value)}/>
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
                    <div className="serviceContainer">
                        <h3 className="serviceDescription">Description</h3>
                        <TextField id="outlined-multiline-static" label="Description" multiline rows={5} defaultValue="none" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="serviceContainer">
                      <Typography component="legend" className="serviceFeedback">Feedback (set up by customers)</Typography>
                      <Rating name="disabled" value={feedback} disabled />
                    </div>
                    <div className="serviceContainer">
                        <h3 className="serviceBrand">Brand</h3>
                        <TextField id="outlined-basic" className="field" label="Brand" variant="outlined" onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="serviceContainer">
                        <h3 className="serviceImage">Image</h3>
                          <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          />
                    </div>
                    <div className="serviceContainer">
                        <button id="cancelService">Cancel</button>
                        <button id='confirmService' onClick={handleForm}>Confirm</button>
                    </div>
                </div>
    </div>
  );
};

export default AddService;
