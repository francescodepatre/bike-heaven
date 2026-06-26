/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from 'react';
import "./style/Help.css";

const Help = () => {
    return (
        <div className="help-page">
            <div className="help-card">
                <p className="help-eyebrow">Supporto</p>
                <h1 className="help-title">Come possiamo aiutarti?</h1>
                <p className="help-text">
                    Per qualsiasi problema puoi contattarci via email o compilando
                    il modulo nella sezione contatti in fondo alla pagina principale.
                </p>
                <a className="help-email" href="mailto:bikeheaven.business@hotmail.com">
                    bikeheaven.business@hotmail.com
                </a>
                <p className="help-footer">
                    Questo e-commerce è stato realizzato da Francesco De Patre
                    come progetto per il corso di Tecnologie Internet — Università di Parma.
                </p>
            </div>
        </div>
    );
};

export default Help;