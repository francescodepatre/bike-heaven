/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./refund.css"

const Refund = () => {

    const [refundId, setRefundId] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(refundId === null || refundId === undefined || refundId === 0){
            alert("Please enter a sale id")
            return
        }
        let refund = {
            id: refundId
        }
        fetch("https://bike-heaven.onrender.com/api/refund", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(refund)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Sale refunded successfully")
            }
            else{
                alert("Attention: sale refund failed")
            }
        }).catch(error => {
            alert("Attention: sale refund failed")
        })
    }

    return (
        <div>
            <div className='refund'>
                    <div className="refundTitle">
                        <h1>Refund a sale</h1>
                    </div>
                    <div className="refContainer">
                        <h3 className="refundName">Sale ID</h3>
                        <TextField
          id="outlined-number"
          onChange={(e) => setRefundId(e.target.value)}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>
                    <div className="refContainer">
                        <button id="cancelRefund">Cancel</button>
                        <button id='confirmRefund' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default Refund;
