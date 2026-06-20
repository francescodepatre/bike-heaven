/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from 'react';
import "./style/defaultAccount.css";

const DefaultAccount = () => {
    return (
        <div className='defaultPage'>
            <p>
                In the BikeHeaven e-commerce platform, users can manage their account details seamlessly.<br />
                To update their personal information, users simply need to click on the 'My Details' option.<br />
                This action opens up a form where they can edit details like name, email, and contact information.<br />
                Changes are saved with a confirmation, ensuring that user data remains up-to-date.<br />
                <br /><br />
                Users can also change their personal address by clicking on the 'My Address' option to <br />
                update the address for future orders.<br />
                <br /><br />
                To update Username and Password, users have to click 'Username & Password' option<br />
                <br /><br />
                For any problems or questions please feel free to contact us at: "bikeheaven.business@hotmail.com".<br />
            </p>
        </div>
    );
}

export default DefaultAccount;
