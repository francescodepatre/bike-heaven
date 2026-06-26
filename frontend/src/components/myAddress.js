/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import "./style/myProfile.css";

const MyAddress = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`https://bike-heaven.onrender.com/api/getAddress/${token}`);
                if (!response.ok) throw new Error("Fetching data failed");
                const data = await response.json();
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setAddress(data.address || '');
            } catch {
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
            const response = await fetch("https://bike-heaven.onrender.com/api/setAddress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    email, phone, address
                })
            });
            const data = await response.json();
            if (data.success) setSuccess("Contatti aggiornati con successo.");
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
            <h1 className="mp-title">Contatti e indirizzo</h1>

            <div className="mp-field">
                <label htmlFor="ma-email">Email</label>
                <input id="ma-email" type="email" value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mp-field">
                <label>Telefono</label>
                <div className="mp-phone-input">
                    <PhoneInput value={phone} onChange={setPhone}
                        placeholder="Inserisci numero" />
                </div>
            </div>

            <div className="mp-field">
                <label htmlFor="ma-address">Indirizzo</label>
                <input id="ma-address" type="text" value={address}
                    autoComplete="street-address"
                    onChange={(e) => setAddress(e.target.value)} />
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

export default MyAddress;