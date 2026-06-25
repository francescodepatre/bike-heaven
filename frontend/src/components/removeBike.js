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
        <div className="ep-header">
        <p className="ep-eyebrow">Catalogo</p>
        <h1 className="ep-title">Rimuovi bici</h1>
        </div>
        <div className="ep-body">
        <div className="ep-form-panel" style={{maxWidth: '400px'}}>
            <div className="ep-form-grid single">
            <div className="ep-field">
                <label htmlFor="rb-id">ID bici</label>
                <input id="rb-id" type="number" placeholder="es. 42"
                onChange={(e) => setBikeId(e.target.value)} />
            </div>
            </div>
            {success && <p className="ep-alert ep-alert--success">{success}</p>}
            {error && <p className="ep-alert ep-alert--error">{error}</p>}
            <div className="ep-actions">
            <button className="ep-btn ep-btn--ghost" onClick={() => navigate('/')}>Annulla</button>
            <button className="ep-btn ep-btn--danger" onClick={HandleForm}>Rimuovi</button>
            </div>
        </div>
        </div>
    </div>
    );  
}

export default RemoveBike;
