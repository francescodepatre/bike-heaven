/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import "./style/removeEmployee.css";

const RemoveEmployee = () => {

    const [removeId, setRemoveId] = useState(0)

    function HandleForm(event){
        event.preventDefault()
        if(removeId === null || removeId === undefined || removeId === 0){
            alert("Please enter an employee id")
            return
        }
        let employee = {
            id: removeId
        }
        fetch("api/deleteEmployee", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(employee)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Employee deleted successfully")
            }
            else{
                alert("Attention: employee delete failed")
            }
        }).catch(error => {
            alert("Attention: employee delete failed")
        })
    }

    return (
        <div>
            <div className='employeeDel'>
                    <div className="deleteTitle">
                        <h1>Delete Employee</h1>
                    </div>
                    <div className="delContainer">
                        <h3 className="employeeName">Employee ID</h3>
                        <TextField
          id="outlined-number"
          onChange={(e) => setRemoveId(e.target.value)}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>
                    <div className="delContainer">
                        <button id="cancelDelete">Cancel</button>
                        <button id='confirmDelete' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default RemoveEmployee;
