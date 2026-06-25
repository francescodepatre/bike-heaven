/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/employeesMain.css";

const Refund = () => {
    const [refundId, setRefundId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess('');
        setError('');

        if (!refundId || Number(refundId) <= 0) {
            setError("Inserisci un ID vendita valido.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://bike-heaven.onrender.com/api/refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: refundId })
            });
            const data = await response.json();

            if (data.success) {
                setSuccess("Rimborso elaborato con successo.");
                setRefundId('');
            } else {
                setError("Rimborso non riuscito. Verifica l'ID e riprova.");
            }
        } catch {
            setError("Errore di connessione. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="ep-header">
                <p className="ep-eyebrow">Gestione ordini</p>
                <h1 className="ep-title">Rimborsa una vendita</h1>
            </div>
            <div className="ep-body">
                <div className="ep-form-panel" style={{ maxWidth: '400px' }}>
                    <div className="ep-form-grid single">
                        <div className="ep-field">
                            <label htmlFor="ref-id">ID vendita</label>
                            <input
                                id="ref-id"
                                type="number"
                                placeholder="es. 128"
                                value={refundId}
                                aria-invalid={!!error}
                                onChange={(e) => setRefundId(e.target.value)}
                            />
                        </div>
                    </div>

                    {success && <p className="ep-alert ep-alert--success">{success}</p>}
                    {error   && <p className="ep-alert ep-alert--error"   role="alert">{error}</p>}

                    <div className="ep-actions">
                        <button
                            className="ep-btn ep-btn--ghost"
                            type="button"
                            onClick={() => { setRefundId(''); setSuccess(''); setError(''); }}
                        >
                            Annulla
                        </button>
                        <button
                            className="ep-btn ep-btn--danger"
                            type="button"
                            onClick={HandleForm}
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? 'Elaborazione…' : 'Conferma rimborso'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refund;