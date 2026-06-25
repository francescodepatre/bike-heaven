/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./style/remove.css";

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
            <div className="ep-header">
            <p className="ep-eyebrow">Catalogo</p>
            <h1 className="ep-title">Rimuovi accessorio</h1>
            </div>
            <div className="ep-body">
            <div className="ep-form-panel" style={{maxWidth: '400px'}}>
                <div className="ep-form-grid single">
                <div className="ep-field">
                    <label htmlFor="rb-id">ID accessorio</label>
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

export default RemoveAccessories;
