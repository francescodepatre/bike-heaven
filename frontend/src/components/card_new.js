/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from "react";
import { useNavigate } from 'react-router-dom';
import './style/card_new.css';

function CardNew({ id, title, price, description, immagine }) {
    const navigate = useNavigate();

    return (
        <div className="card" onClick={() => navigate(`/product/${id}`)} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${id}`)}>
            <div className="card-img-wrap">
                <img className="card-img" src={immagine} alt={title} loading="lazy" />
                <span className="card-price">€ {price}</span>
            </div>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{description}</p>
                <span className="card-cta">Scopri →</span>
            </div>
        </div>
    );
}

export default CardNew;