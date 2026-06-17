/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import './navBar.css';
import navbar_logo from './navbar_logo.png';
import search from './search.png';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';

function NavBar(){
    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        setShowComponent(true);
    };

    return(
        <div className="navBar">
            {showComponent  && <SearchBar />}
            <a className="navbar_home_button" href="/home">
                <img src={navbar_logo} alt="logobutton" />
            </a>
            <div className="items">
                <div className="textual_navbar">
                <div className="item">
                        <Link to="/login"><h1>Log-in</h1></Link>
                    </div>
                    <div className="item">
                        <h1>Bicycles</h1>
                    </div>
                    <div className="item">
                        <h1>Accessories</h1>
                    </div>
                    <div className="item">
                        <a href="#about_container" className="scroll-link"><h1>About Us</h1></a>
                    </div>
                    <div className="item">
                        <a href="#contact_container" className="scroll-link"><h1>Contact</h1></a>
                    </div>
                    <div className="item">
                        <a className="navbar_search_button" onClick={handleClick}>
                            <img src={search} alt="searchbutton" />
                        </a>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default NavBar;