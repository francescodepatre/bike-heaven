/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState} from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./employeeRegistration.css";
import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const EmployeeRegistration = () => {

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

    function HandleForm(event){
        event.preventDefault()
        let employeeData = {
            firstName: firstName,
            lastName: lastName,
            birthDate: formattedBirthDate,
            email: email,
            phone: phone,
            address: address,
            username:username,
            password:password
        }
        fetch("https://bike-heaven.onrender.com/api/setEmployee", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(employeeData)
        }).then(response => response.json()).then(data => {
            if(data.success){
                alert("Employee created successfully")
            }
            else{
                alert("Attention: employee registration failed")
            }
        }).catch(error => {
            alert("Attention: employee registration failed")
        })

    }

    return (

        <div>
                <div className='employeeReg'>
                    <div className="registrationTitle">
                        <h1>Employee Registration</h1>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeeName">Name</h3>
                        <TextField id="outlined-basic" className="field" label="Name" variant="outlined" onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeeSurname">Surname</h3>
                        <TextField id="outlined-basic" className="field" label="Surname" variant="outlined" onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeeBirth">Date of Birth</h3>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Date of Birth" className="field" format="YYYY-MM-DD" onChange={(newValue) => setBirthDate(newValue)}/>
                        </LocalizationProvider>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeeEmail">E-mail</h3>
                        <TextField id="outlined-basic" className="field" label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeePhone">Phone Number</h3>
                        <PhoneInput placeholder="Enter phone number" className="phone_field" value={value} onChange={(newValue) => setPhone(newValue)}/>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeeAddress">Address</h3>
                        <TextField id="outlined-basic" className="field" label="Address" variant="outlined" onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeeUsername">Username</h3>
                        <TextField id="outlined-basic" className="field" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="itemContainer">
                        <h3 className="employeePassword">Password</h3>
                        <TextField id="outlined-basic" className="field" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="itemContainer">
                        <button id="cancelRegistration">Cancel</button>
                        <button id='confirmRegistration' onClick={HandleForm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default EmployeeRegistration;
