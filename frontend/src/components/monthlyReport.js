/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import "./style/monthlyReport.css"

const MonthlyReport = () => {

    function HandleDownload(event){
        event.preventDefault()
        fetch('https://bike-heaven.onrender.com/api/download').then(response => {
            if (!response.ok) {
                throw new Error('Errore durante il download');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'MonthlyReport.pdf'; // Imposta il nome del file
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    }

    return (
    <div>
        <div className="ep-header">
        <p className="ep-eyebrow">Report</p>
        <h1 className="ep-title">Report mensile</h1>
        </div>
        <div className="ep-body">
        <div className="ep-report-card">
            <p className="ep-report-desc">
            Scarica il report mensile in formato PDF con il riepilogo delle vendite,
            le spedizioni e l'inventario aggiornato.
            </p>
            <div>
            <button className="ep-download-btn" onClick={HandleDownload}>
                ↓ Scarica PDF
            </button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default MonthlyReport;
