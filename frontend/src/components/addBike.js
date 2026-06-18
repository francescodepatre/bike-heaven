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
import "./addBike.css";

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
        <div className='bikeUpload'>
                    <div className="bikeTitle">
                        <h1>Sell a Bike</h1>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeName">Name Bike</h3>
                        <TextField id="outlined-basic" className="field" label="Bike Name" variant="outlined" onChange={(e) => setBikeName(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikePrice">Price</h3>
                        <TextField id="outlined-basic" className="field" label="Bike Price" variant="outlined" onChange={(e) => setPrice(e.target.value)}/>
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
                    <div className="bikeContainer">
                        <h3 className="bikeDescription">Description</h3>
                        <TextField id="outlined-multiline-static" label="Description" multiline rows={5} defaultValue="none" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                      <Typography component="legend" className="bikeFeedback">Feedback (set up by customers)</Typography>
                      <Rating name="disabled" value={feedback} disabled />
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeBrand">Brand</h3>
                        <TextField id="outlined-basic" className="field" label="Brand" variant="outlined" onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeFrame">Frame</h3>
                        <TextField id="outlined-basic" className="field" label="Frame" variant="outlined" onChange={(e) => setFrame(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeDimensions">Dimensions</h3>
                        <TextField id="outlined-basic" className="field" label="Dimensions" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setDimensions(e.target.value)} InputProps={{startAdornment: <InputAdornment position="start">cm</InputAdornment>,}}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeGear">Gear</h3>
                        <TextField id="outlined-basic" className="field" label="Gear" variant="outlined" onChange={(e) => setGear(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeBrakes">Brakes</h3>
                        <TextField id="outlined-basic" className="field" label="Brakes" variant="outlined" onChange={(e) => setBrakes(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeSuspensions">Suspensions</h3>
                        <TextField id="outlined-basic" className="field" label="Suspensions" variant="outlined" onChange={(e) => setSuspensions(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeWeight">Weight</h3>
                        <TextField id="outlined-basic" className="field" label="Weight" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setWeight(e.target.value)} InputProps={{startAdornment: <InputAdornment position="start">kg</InputAdornment>,}}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeQuantity">Quantity</h3>
                        <TextField id="outlined-basic" className="field" label="Quantity" variant="outlined" type="number" InputLabelProps={{shrink: true,}} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeImage">Image</h3>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          />
                    </div>
                    <div className="bikeContainer">
                        <h3 className="bikeCategory">Category</h3>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                          >
                            <MenuItem value={1}>Road Bicycle</MenuItem>
                            <MenuItem value={2}>Mountain Bike</MenuItem>
                            <MenuItem value={3}>City Bike</MenuItem>
                            <MenuItem value={4}>E-Bike</MenuItem>
                            <MenuItem value={5}>Bike for Kids</MenuItem>
                          </Select>
                    </div>
                    <div className="bikeContainer">
                        <button id="cancelBike">Cancel</button>
                        <button id='confirmBike' onClick={handleForm}>Confirm</button>
                    </div>
                </div>
    </div>
  );
};

export default AddBike;
