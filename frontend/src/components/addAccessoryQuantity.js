/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./style/remove.css";

const AddAccessoryQuantity = () => {


    const [accId, setaccId] = useState(0)
    const [quantity, setQuantity] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(accId === null || accId === undefined || accId === 0){
            alert("Please enter a bike id")
            return
        }
        let increase = {
            id: accId,
            quantity: quantity
        }
        fetch("https://bike-heaven.onrender.com/api/increaseAccessory", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(increase)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Accessory quantity increased successfully")
            }
            else{
                alert("Attention: Accessory quantity was not increased")
            }
        }).catch(error => {
            alert("Attention: Accessory increasing failed")
        })
    }
    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Increase Accessory Quantity</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Accessory ID</h3>
                        <TextField id="outlined-number" onChange={(e) => setaccId(e.target.value)} label="Accessory Id" type="number" InputLabelProps={{shrink: true,}}/>
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

export default AddAccessoryQuantity;
