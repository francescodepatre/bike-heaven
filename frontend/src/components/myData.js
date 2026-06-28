/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import "./style/myProfile.css";

const API_BASE = "https://bike-heaven.onrender.com/api";

const MyData = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd,  setShowPwd]  = useState(false);
    const [success,  setSuccess]  = useState('');
    const [error,    setError]    = useState('');
    const [loading,  setLoading]  = useState(false);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const res  = await fetch(`${API_BASE}/getData/${token}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setUsername(data.username || '');
                /* Non pre-popolare la password per sicurezza */
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
            const res  = await fetch(`${API_BASE}/setData`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: localStorage.getItem("token"), username, password }),
            });
            const data = await res.json();
            if (data.success) { setSuccess("Credenziali aggiornate con successo."); setPassword(''); }
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
            <h1 className="mp_title">Credenziali di accesso</h1>

            <div className="mp_field">
                <label htmlFor="myd-username">Username</label>
                <input id="myd-username" type="text" value={username}
                    autoComplete="username"
                    onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="mp_field">
                <label htmlFor="myd-password">Nuova password</label>
                <div className="mp_password_wrapper">
                    <input id="myd-password"
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        placeholder="Lascia vuoto per non cambiare"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)} />
                    <button type="button" className="mp_toggle_pwd"
                        onClick={() => setShowPwd(v => !v)}
                        aria-label={showPwd ? 'Nascondi password' : 'Mostra password'}>
                        {showPwd ? '🙈' : '👁'}
                    </button>
                </div>
            </div>

            {success && <p className="mp_alert mp_alert_success" role="status">{success}</p>}
            {error   && <p className="mp_alert mp_alert_error"   role="alert">{error}</p>}

            <div className="mp_actions">
                <button className="mp_btn mp_btn_ghost" type="reset"
                    onClick={() => { setPassword(''); setSuccess(''); setError(''); }}>
                    Annulla
                </button>
                <button className="mp_btn mp_btn_primary" type="submit" disabled={loading}>
                    {loading ? 'Salvataggio…' : 'Salva modifiche'}
                </button>
            </div>
        </form>
    );
};

export default MyData;