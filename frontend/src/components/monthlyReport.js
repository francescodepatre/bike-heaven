/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import "./monthlyReport.css"

const MonthlyReport = () => {

    function HandleDownload(event){
        event.preventDefault()
        fetch('/api/download').then(response => {
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
            <div className='monthlyReport'>
                <div className='monthlyReportTitle'>
                    <h1>Monthly Report</h1>
                </div>
                <div className='monthlyReportContent'>
                    <h3>Click to download Monthly Report</h3>  
                </div>
                <div className='downloadButton'>
                    <Button variant="contained" onClick={HandleDownload}>Download</Button>
                </div>
            </div>
        </div>
    );
}

export default MonthlyReport;
