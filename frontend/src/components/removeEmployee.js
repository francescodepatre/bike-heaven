/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/ep-shared.css";

const RemoveEmployee = () => {
    const [removeId, setRemoveId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');

        if (!removeId || Number(removeId) <= 0) {
            setError("Inserisci un ID dipendente valido.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("https://bike-heaven.onrender.com/api/deleteEmployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: parseInt(removeId, 10) })
            });
            const data = await res.json();
            if (data.success) { setSuccess("Dipendente eliminato con successo."); setRemoveId(''); }
            else setError("Eliminazione non riuscita. Verifica l'ID.");
        } catch { setError("Errore di connessione. Riprova più tardi."); }
        finally { setLoading(false); }
    }

    return (
        <div>
            <div className="ep-header">
                <p className="ep-eyebrow">Dipendenti</p>
                <h1 className="ep-title">Elimina dipendente</h1>
            </div>
            <div className="ep-body">
                <div className="ep-form-panel" style={{ maxWidth: '400px' }}>
                    <div className="ep-form-grid single">
                        <div className="ep-field">
                            <label htmlFor="re-id">ID dipendente</label>
                            <input id="re-id" type="number" placeholder="es. 5"
                                value={removeId} onChange={(e) => setRemoveId(e.target.value)} />
                        </div>
                    </div>

                    {success && <p className="ep-alert ep-alert--success">{success}</p>}
                    {error   && <p className="ep-alert ep-alert--error" role="alert">{error}</p>}

                    <div className="ep-actions">
                        <button className="ep-btn ep-btn--ghost" type="button"
                            onClick={() => { setRemoveId(''); setSuccess(''); setError(''); }}>
                            Annulla
                        </button>
                        <button className="ep-btn ep-btn--danger" type="button"
                            onClick={HandleForm} disabled={loading} aria-busy={loading}>
                            {loading ? 'Eliminazione…' : 'Elimina dipendente'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveEmployee;