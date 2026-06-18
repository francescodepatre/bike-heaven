/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./myData.css";

const MyData = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token")
            try{
                const response = await fetch(`https://bike-heaven.onrender.com/api/getData/${token}`)
                if (response.status === 500) {
                    throw new Error("Fetching data failed");
                }
                const JSONData = await response.json();
                setUsername(JSONData.username)
                setPassword(JSONData.password)
            }catch(error){
                console.log("Error: " + error)
            }
        }

        fetchData()

    },[])

    function handleDataForm(event){
        event.preventDefault()
        let userData = {
            token: localStorage.getItem("token"),
            username:username,
            password: password
        }
        fetch("https://bike-heaven.onrender.com/api/setData", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }).then(response => response.json()).then(data => {
            if(data){
                alert("Details successfully upgraded")
            }
            else{
                alert("Attention: something went wrong")
            }
        }).catch(error => {
            console.log(error)
        })

    }

    return (
        <div className='dataPage'>
            <div className='dataContainer'>
                <div className='dataItem'>
                    <p className='itemDescription'>Username: </p><TextField id="outlined-basic" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='dataItem'>
                    <p className='itemDescription'>Password: </p><TextField id="outlined-basic" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='cancelConfirmdata'>
                    <Button className="dataButton" variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                    <Button className="dataButton" variant="contained" onClick={handleDataForm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}

export default MyData;
