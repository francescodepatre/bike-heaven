/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import "./style/myProfile.css";

const MyDetails = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birth, setBirth] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`https://bike-heaven.onrender.com/api/getDetails/${token}`);
                if (!response.ok) throw new Error("Fetching data failed");
                const data = await response.json();
                setName(data.firstName || '');
                setSurname(data.lastName || '');
                setBirth(dayjs(data.birthDate).format('YYYY-MM-DD'));
            } catch (err) {
                setError("Impossibile caricare i dati. Riprova.");
            }
        }
        fetchData();
    }, []);

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');
        setLoading(true);
        try {
            const response = await fetch("https://bike-heaven.onrender.com/api/setDetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    name, surname, birth
                })
            });
            const data = await response.json();
            if (data.success) setSuccess("Dati aggiornati con successo.");
            else setError("Aggiornamento non riuscito. Riprova.");
        } catch {
            setError("Errore di connessione. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mp-page">
            <p className="mp-eyebrow">Profilo</p>
            <h1 className="mp-title">Dati personali</h1>

            <div className="mp-field">
                <label htmlFor="md-name">Nome</label>
                <input id="md-name" type="text" value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mp-field">
                <label htmlFor="md-surname">Cognome</label>
                <input id="md-surname" type="text" value={surname}
                    onChange={(e) => setSurname(e.target.value)} />
            </div>

            <div className="mp-field">
                <label htmlFor="md-birth">Data di nascita</label>
                <input id="md-birth" type="date" value={birth}
                    onChange={(e) => setBirth(e.target.value)} />
            </div>

            {success && <p className="mp-alert mp-alert--success">{success}</p>}
            {error   && <p className="mp-alert mp-alert--error" role="alert">{error}</p>}

            <div className="mp-actions">
                <button className="mp-btn mp-btn--ghost" type="button"
                    onClick={() => navigate('/')}>
                    Annulla
                </button>
                <button className="mp-btn mp-btn--primary" type="button"
                    onClick={HandleForm} disabled={loading}>
                    {loading ? 'Salvataggio…' : 'Salva modifiche'}
                </button>
            </div>
        </div>
    );
};

export default MyDetails;