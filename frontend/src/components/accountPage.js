/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import "./style/accountPage.css";
import DefaultAccount from './defaultAccount';
import MyDetails from './myDetails';
import MyAddress from './myAddress';
import MyData from './myData';
import Help from './Help';

const AccountPage = () => {

    const [defaultAccount, setDefaultAccount] = useState(true)
    const [myDetails, setMyDetails] = useState(false)
    const [myAddress, setMyAddress] = useState(false)
    const [myData, setMyData] = useState(false)
    const [help, setHelp] = useState(false)

    const handleItemClick = (option) => {
        switch (option) {
            case 'My Details':
                setDefaultAccount(false)
                setMyDetails(true)
                setMyAddress(false)
                setMyData(false)
                setHelp(false)
                break
            case 'My Address':
                setDefaultAccount(false)
                setMyDetails(false)
                setMyAddress(true)
                setMyData(false)
                setHelp(false)
                break
            case 'Password & Username':
                setDefaultAccount(false)
                setMyDetails(false)
                setMyAddress(false)
                setMyData(true)
                setHelp(false)
                break
            case 'Help':
                setDefaultAccount(false)
                setMyDetails(false)
                setMyAddress(false)
                setMyData(false)
                setHelp(true)
                break
            default:
                setDefaultAccount(true)
                setMyDetails(false)
                setMyAddress(false)
                setMyData(false)
                setHelp(false)
                break
        }
      }

    return (
        <div className='accountPage'>
            <div className='accountContainer'>
                <div className='accountTitle'>
                    <h2>Account Settings</h2>
                </div>
                <div className='accountOptions'>
                    <ul>
                        <li className='optionItem' onClick={() => handleItemClick('My Details')}>My Details</li>
                        <li className='optionItem' onClick={() => handleItemClick('My Address')}>My Address</li>
                        <li className='optionItem' onClick={() => handleItemClick('Password & Username')}>Password & Username</li>
                        <li className='optionItem' onClick={() => handleItemClick('Help')}>About & Help</li>
                    </ul>
                </div>
            </div>
            <div className='contentContainer'>
                {defaultAccount ?(
                    <DefaultAccount />
                ): myDetails ?(
                    <MyDetails />
                ): myAddress ? (
                    <MyAddress />
                ): myData ? (
                    <MyData />
                ): help ? (
                    <Help />
                ): null}
            </div>
        </div>
    );
}

export default AccountPage;
