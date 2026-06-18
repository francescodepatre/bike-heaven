/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from 'react';
import { Link } from 'react-router-dom';
import './style/shopmenu.css';

function ShopMenu(){

    return(
        <div className="shop-menu-container">
            <div className="menu-container">
                <div className="menu-item">
                    <Link to="/results/Road Bicycles">Road Bicycles</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Mountain Bikes">Mountain Bikes</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/City Bikes">City Bikes</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/E-Bikes">E-Bikes</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Bikes for Kids">Bikes For Kids</Link>
                </div>
                <div className="menu-item">
                    <Link to="/results/Accessories">Accessories</Link>
                </div>
                <div className="menu-item" id="last">
                    <Link to="/results/Services">Services</Link>
                </div>
            </div>
        </div>
    );
}

export default ShopMenu;