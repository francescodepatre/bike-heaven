/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import "./myDetails.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const MyDetails = () => {

    //invia richiesta che riceve nome, cognome e data di nascita del cliente e alla pressione del tasto confirm invia modifiche
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [birth, setBirth] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token")
            try{
                const response = await fetch(`/api/getDetails/${token}`)
                if (response.status === 500) {
                    throw new Error("Fetching data failed");
                }
                const JSONData = await response.json();
                setName(JSONData.firstName)
                setSurname(JSONData.lastName)
                const birthDate = dayjs(JSONData.birthDate);
                setBirth(birthDate)
            
            }catch(error){
                console.log("Error: " + error)
            }
        }

        fetchData()

    },[])

    function HandleForm(event){
        event.preventDefault()
        let userData = {
            token: localStorage.getItem("token"),
            name:name,
            surname: surname,
            birth: birth,
        }
        fetch("/api/setAddress", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }).then(response => response.json()).then(data => {
            if(data.success){
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
        <div className='detailsPage'>
            <div className='detailsContainer'>
                <div className='detailsItem'>
                    <p className='itemDescription'>Name: </p><TextField id="outlined-basic" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='detailsItem'>
                    <p className='itemDescription'>Surname: </p><TextField id="outlined-basic" variant="outlined" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                </div>
                <div className='detailsItem'>
                    <p className='itemDescription'>Date of Birth: </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField label="Date of Birth" format="YYYY-MM-DD" value={birth} onChange={newDate => setBirth(dayjs(newDate))}/>
                    </LocalizationProvider>
                </div>
                <div className='cancelConfirm'>
                    <Button className="detailButton" variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                    <Button className="detailButton" variant="contained" onClick={() => HandleForm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}

export default MyDetails;
