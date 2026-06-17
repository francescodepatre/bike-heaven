/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./remove.css";

const RemoveService = () => {
    
    const [serviceId, setServiceId] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(serviceId === null || serviceId === undefined || serviceId === 0){
            alert("Please enter a service id")
            return
        }
        let remove = {
            id: serviceId
        }
        fetch("/api/removeService", {
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
                alert("Attention: service delete failed")
            }
        }).catch(error => {
            alert("Attention: service delete failed")
        })
    }
    
    return (
        <div>
            <div className='remove'>
                    <div className="removeTitle">
                        <h1>Remove a Service</h1>
                    </div>
                    <div className="remContainer">
                        <h3 className="removeName">Service ID</h3>
                        <TextField
          id="outlined-number"
          onChange={(e) => setServiceId(e.target.value)}
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

export default RemoveService;
