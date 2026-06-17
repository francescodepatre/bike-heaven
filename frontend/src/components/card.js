/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

import React from 'react';
import cart from './cart.png';
import './card.css'
import bike from './bike_test.png';

function Card(){
    return(
        <div className="card-container">
            {/* Solo a scopo dimostrativo correggere immagine, titolo, descrizione, prezzo */ }
            <div className="card_image">
                <img id="card_img" src={bike} />
            </div>
            <div className="card_title">
                <h1>Mountain Bike</h1>
            </div>
            <div className="card_description">
                <p>Fast Mountain Bike</p>
            </div>
            <div className="card_actions">
                <div className="card_price">
                    <h1>149,99€</h1>
                    <button className="add_to_cart">
                    <img src={cart}/>
                    </button>
                </div>
               
            </div>
        </div>
    );
}

export default Card;