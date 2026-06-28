/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import "./style/myProfile.css";

const API_BASE = "https://bike-heaven.onrender.com/api";

const MyDetails = () => {
    const [name,    setName]    = useState('');
    const [surname, setSurname] = useState('');
    const [birth,   setBirth]   = useState('');
    const [success, setSuccess] = useState('');
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const res  = await fetch(`${API_BASE}/getDetails/${token}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setName(data.firstName || '');
                setSurname(data.lastName || '');
                setBirth(data.birthDate ? dayjs(data.birthDate).format('YYYY-MM-DD') : '');
            } catch {
                setError("Impossibile caricare i dati. Riprova.");
            }
        }
        fetchData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess(''); setError('');
        setLoading(true);
        try {
            const res  = await fetch(`${API_BASE}/setDetails`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: localStorage.getItem("token"), name, surname, birth }),
            });
            const data = await res.json();
            if (data.success) setSuccess("Dati aggiornati con successo.");
            else setError("Aggiornamento non riuscito. Riprova.");
        } catch {
            setError("Errore di connessione. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="mp_page" onSubmit={handleSubmit} noValidate>
            <p className="mp_eyebrow">Profilo</p>
            <h1 className="mp_title">Dati personali</h1>

            <div className="mp_field">
                <label htmlFor="md-name">Nome</label>
                <input id="md-name" type="text" value={name}
                    autoComplete="given-name"
                    onChange={e => setName(e.target.value)} />
            </div>

            <div className="mp_field">
                <label htmlFor="md-surname">Cognome</label>
                <input id="md-surname" type="text" value={surname}
                    autoComplete="family-name"
                    onChange={e => setSurname(e.target.value)} />
            </div>

            <div className="mp_field">
                <label htmlFor="md-birth">Data di nascita</label>
                <input id="md-birth" type="date" value={birth}
                    onChange={e => setBirth(e.target.value)} />
            </div>

            {success && <p className="mp_alert mp_alert_success" role="status">{success}</p>}
            {error   && <p className="mp_alert mp_alert_error"   role="alert">{error}</p>}

            <div className="mp_actions">
                <button className="mp_btn mp_btn_ghost" type="reset"
                    onClick={() => { setSuccess(''); setError(''); }}>
                    Annulla
                </button>
                <button className="mp_btn mp_btn_primary" type="submit" disabled={loading}>
                    {loading ? 'Salvataggio…' : 'Salva modifiche'}
                </button>
            </div>
        </form>
    );
};

export default MyDetails;