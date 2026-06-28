/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import "./style/myProfile.css";

const API_BASE = "https://bike-heaven.onrender.com/api";

const MyAddress = () => {
    const [email,   setEmail]   = useState('');
    const [phone,   setPhone]   = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState('');
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const res  = await fetch(`${API_BASE}/getAddress/${token}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setAddress(data.address || '');
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
            const res  = await fetch(`${API_BASE}/setAddress`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: localStorage.getItem("token"), email, phone, address }),
            });
            const data = await res.json();
            if (data.success) setSuccess("Contatti aggiornati con successo.");
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
            <h1 className="mp_title">Contatti e indirizzo</h1>

            <div className="mp_field">
                <label htmlFor="ma-email">Email</label>
                <input id="ma-email" type="email" value={email}
                    autoComplete="email"
                    onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="mp_field">
                <label>Telefono</label>
                <div className="mp_phone_input">
                    <PhoneInput value={phone} onChange={setPhone}
                        placeholder="Inserisci numero" />
                </div>
            </div>

            <div className="mp_field">
                <label htmlFor="ma-address">Indirizzo</label>
                <input id="ma-address" type="text" value={address}
                    autoComplete="street-address"
                    onChange={e => setAddress(e.target.value)} />
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

export default MyAddress;