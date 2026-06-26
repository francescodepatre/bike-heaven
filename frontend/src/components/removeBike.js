/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/employeesMain.css";

const RemoveBike = () => {
    const [bikeId, setBikeId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');
        if (!bikeId || Number(bikeId) <= 0) { setError("Inserisci un ID bici valido."); return; }
        setLoading(true);
        try {
            const res = await fetch("https://bike-heaven.onrender.com/api/removeBike", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: bikeId })
            });
            const data = await res.json();
            if (data.success) { setSuccess("Bici rimossa con successo."); setBikeId(''); }
            else setError("Rimozione non riuscita. Verifica l'ID.");
        } catch { setError("Errore di connessione. Riprova più tardi."); }
        finally { setLoading(false); }
    }

    return (
        <div>
            <div className="ep-header">
                <p className="ep-eyebrow">Catalogo</p>
                <h1 className="ep-title">Rimuovi una bici</h1>
            </div>
            <div className="ep-body">
                <div className="ep-form-panel" style={{ maxWidth: '400px' }}>
                    <div className="ep-form-grid single">
                        <div className="ep-field">
                            <label htmlFor="rb-id">ID bici</label>
                            <input id="rb-id" type="number" placeholder="es. 42"
                                value={bikeId} onChange={(e) => setBikeId(e.target.value)} />
                        </div>
                    </div>
                    {success && <p className="ep-alert ep-alert--success">{success}</p>}
                    {error   && <p className="ep-alert ep-alert--error" role="alert">{error}</p>}
                    <div className="ep-actions">
                        <button className="ep-btn ep-btn--ghost" type="button"
                            onClick={() => { setBikeId(''); setSuccess(''); setError(''); }}>
                            Annulla
                        </button>
                        <button className="ep-btn ep-btn--danger" type="button"
                            onClick={HandleForm} disabled={loading} aria-busy={loading}>
                            {loading ? 'Rimozione…' : 'Rimuovi bici'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveBike;