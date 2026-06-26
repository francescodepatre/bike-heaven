/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/employeesMain.css";

const RemoveService = () => {
    const [serviceId, setServiceId] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');
        if (!serviceId || Number(serviceId) <= 0) { setError("Inserisci un ID servizio valido."); return; }
        setLoading(true);
        try {
            const res = await fetch("https://bike-heaven.onrender.com/api/removeService", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: serviceId })
            });
            const data = await res.json();
            if (data.success) { setSuccess("Servizio rimosso con successo."); setServiceId(''); }
            else setError("Rimozione non riuscita. Verifica l'ID.");
        } catch { setError("Errore di connessione. Riprova più tardi."); }
        finally { setLoading(false); }
    }

    return (
        <div>
            <div className="ep-header">
                <p className="ep-eyebrow">Catalogo</p>
                <h1 className="ep-title">Rimuovi un servizio</h1>
            </div>
            <div className="ep-body">
                <div className="ep-form-panel" style={{ maxWidth: '400px' }}>
                    <div className="ep-form-grid single">
                        <div className="ep-field">
                            <label htmlFor="rs-id">ID servizio</label>
                            <input id="rs-id" type="number" placeholder="es. 5"
                                value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
                        </div>
                    </div>
                    {success && <p className="ep-alert ep-alert--success">{success}</p>}
                    {error   && <p className="ep-alert ep-alert--error" role="alert">{error}</p>}
                    <div className="ep-actions">
                        <button className="ep-btn ep-btn--ghost" type="button"
                            onClick={() => { setServiceId(''); setSuccess(''); setError(''); }}>
                            Annulla
                        </button>
                        <button className="ep-btn ep-btn--danger" type="button"
                            onClick={HandleForm} disabled={loading} aria-busy={loading}>
                            {loading ? 'Rimozione…' : 'Rimuovi servizio'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveService;