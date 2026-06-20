/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useEffect, useState} from 'react';
import "./style/employeesLogin.css";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const EmployeesLogin = () => {

    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')

    function handleSuccessfulLogin(){
        navigate('/employees')
    }

    function HandleForm(event){
        event.preventDefault()
        let userData = {
            username:username,
            password:password
        }
        fetch("https://bike-heaven.onrender.com/api/employeesLogin", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
            }).then(response => response.json()).then(data => {
                if(data.success){
                    localStorage.setItem("token", data.token)
                    handleSuccessfulLogin()
                }
                else{
                    alert("Attention: login failed")
                }
            }).catch(error => {

            })}

    return (
        <div className="employeesLogin_page">
            <div className="employeesLogin_container">
                <h1 className="employeesLogin_title">Employees Log-in</h1>
                <div className="Econt1">
                    <h3 className="Elogin_usr">Username or E-mail </h3>
                    <TextField id="outlined-basic" className="Eusername_field" label="Username or E-mail" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="Econt1">
                    <h3 className="Elogin_usr">Password </h3>
                    <TextField id="outlined-basic" className="Eusername_field" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="Econt3">
                    <button id="Ecancel" onClick={() => navigate("/")}>Cancel</button>
                    <button id='Elogin' onClick={HandleForm}>Log-in</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeesLogin;
