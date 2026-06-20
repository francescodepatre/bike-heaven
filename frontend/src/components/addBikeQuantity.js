/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./style/remove.css";

const AddBikeQuantity = () => {

    const [bikeId, setBikeId] = useState(0)
    const [quantity, setQuantity] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(bikeId === null || bikeId === undefined || bikeId === 0){
            alert("Please enter a bike id")
            return
        }
        let increase = {
            id: bikeId,
            quantity: quantity
        }
        fetch("https://bike-heaven.onrender.com/api/increaseBike", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(increase)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Bike quantity increased successfully")
            }
            else{
                alert("Attention: bike quantity was not increased")
            }
        }).catch(error => {
            alert("Attention: bike increasing failed")
        })
    }

    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Increase Bicycle Quantity</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Bicycle ID</h3>
                        <TextField id="outlined-number" onChange={(e) => setBikeId(e.target.value)} label="Bike Id" type="number" InputLabelProps={{shrink: true,}}/>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Quantity</h3>
                        <TextField id="outlined-number" onChange={(e) => setQuantity(e.target.value)} label="Quantity" type="number" InputLabelProps={{shrink: true,}}/>
                    </div>
                    <div className="remContainer">
                        <button id="cancelRemove">Cancel</button>
                        <button id='confirmRemove' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default AddBikeQuantity;
