/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./style/remove.css";

const RemoveBike = () => {

    const [bikeId, setBikeId] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(bikeId === null || bikeId === undefined || bikeId === 0){
            alert("Please enter a bike id")
            return
        }
        let remove = {
            id: bikeId
        }
        fetch("/api/removeBike", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(remove)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Bike removed successfully")
            }
            else{
                alert("Attention: bike delete failed")
            }
        }).catch(error => {
            alert("Attention: bike delete failed")
        })
    }
    
    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Remove a bicycle</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Bicycle ID</h3>
                        <TextField
          id="outlined-number"
          onChange={(e) => setBikeId(e.target.value)}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>
                    <div className="remContainer">
                        <button id="cancelRemove">Cancel</button>
                        <button id='confirmRemove' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default RemoveBike;
