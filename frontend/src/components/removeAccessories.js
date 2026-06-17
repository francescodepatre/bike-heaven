/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./remove.css";

const RemoveAccessories = () => {

    const [accessoryId, setAccessoryId] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(accessoryId === null || accessoryId === undefined || accessoryId === 0){
            alert("Please enter an accessory id")
            return
        }
        let remove = {
            id: accessoryId
        }
        fetch("/api/removeAccessory", {
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
                alert("Attention: accessory delete failed")
            }
        }).catch(error => {
            alert("Attention: accessory delete failed")
        })
    }
    
    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Remove an Accessory</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Accessory ID</h3>
                        <TextField
          id="outlined-number"
          onChange={(e) => setAccessoryId(e.target.value)}
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

export default RemoveAccessories;
