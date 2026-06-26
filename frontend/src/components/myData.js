/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/myProfile.css";

const MyData = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`https://bike-heaven.onrender.com/api/getData/${token}`);
                if (!response.ok) throw new Error("Fetching data failed");
                const data = await response.json();
                setUsername(data.username || '');
                setPassword(data.password || '');
            } catch {
                setError("Impossibile caricare i dati. Riprova.");
            }
        }
        fetchData();
    }, []);

    async function handleDataForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');
        setLoading(true);
        try {
            const response = await fetch("https://bike-heaven.onrender.com/api/setData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    username, password
                })
            });
            const data = await response.json();
            if (data.success) setSuccess("Credenziali aggiornate con successo.");
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
            <h1 className="mp-title">Credenziali di accesso</h1>

            <div className="mp-field">
                <label htmlFor="myd-username">Username</label>
                <input id="myd-username" type="text" value={username}
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="mp-field">
                <label htmlFor="myd-password">Password</label>
                <input id="myd-password" type="password" value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            {success && <p className="mp-alert mp-alert--success">{success}</p>}
            {error   && <p className="mp-alert mp-alert--error" role="alert">{error}</p>}

            <div className="mp-actions">
                <button className="mp-btn mp-btn--ghost" type="button"
                    onClick={() => navigate('/')}>
                    Annulla
                </button>
                <button className="mp-btn mp-btn--primary" type="button"
                    onClick={handleDataForm} disabled={loading}>
                    {loading ? 'Salvataggio…' : 'Salva modifiche'}
                </button>
            </div>
        </div>
    );
};

export default MyData;