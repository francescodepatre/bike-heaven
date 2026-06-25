/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/employeesMain.css";

const RemoveAccessories = () => {
    const [accessoryId, setAccessoryId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');
        if (!accessoryId || Number(accessoryId) <= 0) { setError("Inserisci un ID accessorio valido."); return; }
        setLoading(true);
        try {
            const res = await fetch("/api/removeAccessory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: accessoryId })
            });
            const data = await res.json();
            if (data.success) { setSuccess("Accessorio rimosso con successo."); setAccessoryId(''); }
            else setError("Rimozione non riuscita. Verifica l'ID.");
        } catch { setError("Errore di connessione. Riprova più tardi."); }
        finally { setLoading(false); }
    }

    return (
        <div>
            <div className="ep-header">
                <p className="ep-eyebrow">Catalogo</p>
                <h1 className="ep-title">Rimuovi un accessorio</h1>
            </div>
            <div className="ep-body">
                <div className="ep-form-panel" style={{ maxWidth: '400px' }}>
                    <div className="ep-form-grid single">
                        <div className="ep-field">
                            <label htmlFor="ra-id">ID accessorio</label>
                            <input id="ra-id" type="number" placeholder="es. 17"
                                value={accessoryId} onChange={(e) => setAccessoryId(e.target.value)} />
                        </div>
                    </div>
                    {success && <p className="ep-alert ep-alert--success">{success}</p>}
                    {error   && <p className="ep-alert ep-alert--error" role="alert">{error}</p>}
                    <div className="ep-actions">
                        <button className="ep-btn ep-btn--ghost" type="button"
                            onClick={() => { setAccessoryId(''); setSuccess(''); setError(''); }}>
                            Annulla
                        </button>
                        <button className="ep-btn ep-btn--danger" type="button"
                            onClick={HandleForm} disabled={loading} aria-busy={loading}>
                            {loading ? 'Rimozione…' : 'Rimuovi accessorio'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveAccessories;