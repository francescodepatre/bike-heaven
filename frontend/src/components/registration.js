/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/registration.css";
import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigate, Link } from 'react-router-dom';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Registration(){

    const navigate = useNavigate()
    const [value, setValue] = useState(); 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const formattedBirthDate = birthDate ? birthDate.format("YYYY-MM-DD") : ''

    function handleSuccessfulRegistration(){
        console.log('Registration successful')
        window.location.reload()
        alert('Welcome to bikeHeaven!')
        navigate('/')
        
    }

    function HandleForm(event){
        event.preventDefault()
        let userData = {
            firstName: firstName,
            lastName: lastName,
            birthDate: formattedBirthDate,
            email: email,
            phone: phone,
            address: address,
            username:username,
            password:password
        }
        fetch("/api/register", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }).then(response => response.json()).then(data => {
            if(data.success){
                localStorage.setItem("token", data.token)
                handleSuccessfulRegistration()
            }
            else{
                alert("Attention: registration failed")
            }
        }).catch(error => {

        })

    }

    return(
        <div className="registration_page">
            <div className="registration_container">
                <h1 className="registration_title">Registration</h1>
                <div className="cont4">
                    <h3 className="login_string">Already have an account? <Link id="login_link" to='/login'>Click here to Sign-in</Link></h3>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Name</h3>
                    <TextField id="outlined-basic" className="field" label="Name" variant="outlined" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Surname</h3>
                    <TextField id="outlined-basic" className="field" label="Surname" variant="outlined" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Date of Birth</h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField label="Date of Birth" className="field" format="YYYY-MM-DD" onChange={(newValue) => setBirthDate(newValue)}/>
                    </LocalizationProvider>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">E-mail</h3>
                    <TextField id="outlined-basic" className="field" label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Phone Number</h3>
                    <PhoneInput placeholder="Enter phone number" className="phone_field" value={value} onChange={(newValue) => setPhone(newValue)}/>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Address</h3>
                    <TextField id="outlined-basic" className="field" label="Address" variant="outlined" onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Username</h3>
                    <TextField id="outlined-basic" className="field" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="cont1">
                    <h3 className="registration_name">Password</h3>
                    <TextField id="outlined-basic" className="field" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="cont3">
                    <button id="cancel" onClick={() => navigate("/")}>Cancel</button>
                    <button id='registration' onClick={HandleForm}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Registration;