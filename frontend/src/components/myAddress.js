/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import "./style/myAddress.css";
import PhoneInput from 'react-phone-number-input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const MyAddress = () => {

    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token")
            try{
                const response = await fetch(`https://bike-heaven.onrender.com/api/getAddress/${token}`)
                if (response.status === 500) {
                    throw new Error("Fetching data failed");
                }
                const JSONData = await response.json();
                setEmail(JSONData.email)
                setPhone(JSONData.phone)
                setAddress(JSONData.address)
            
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
            email: email,
            phone: phone,
            address: address,
        }
        fetch("https://bike-heaven.onrender.com/api/setAddress", {
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
        <div className='contactsPage'>
            <div className='contactsContainer'>
                <div className='contactsItem'>
                    <p className='itemDescription'>Email: </p><TextField id="outlined-basic" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='contactsItem'>
                    <p className='itemDescription'>Phone: </p><TextField id="outlined-basic" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className='contactsItem'>
                    <p className='itemDescription'>Address: </p><TextField id="outlined-basic" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className='cancelConfirmaddress'>
                    <Button className="addressButton" variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                    <Button className="addressButton" variant="contained" onClick={HandleForm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}

export default MyAddress;
