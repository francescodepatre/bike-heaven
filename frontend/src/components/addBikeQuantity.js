/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/ep-shared.css";

const AddBikeQuantity = () => {
    const [bikeId, setBikeId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function HandleForm(event) {
        event.preventDefault();
        setSuccess(''); setError('');

        if (!bikeId || Number(bikeId) <= 0) {
            setError("Inserisci un ID bici valido.");
            return;
        }
        if (!quantity || Number(quantity) <= 0) {
            setError("Inserisci una quantità valida.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("https://bike-heaven.onrender.com/api/increaseBike", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: parseInt(bikeId, 10), quantity: parseInt(quantity, 10) })
            });
            const data = await res.json();
            if (data.success) { setSuccess("Quantità aggiornata con successo."); setBikeId(''); setQuantity(''); }
            else setError("Aggiornamento non riuscito. Verifica l'ID.");
        } catch { setError("Errore di connessione. Riprova più tardi."); }
        finally { setLoading(false); }
    }

    return (
        <div>
            <div className="ep-header">
                <p className="ep-eyebrow">Catalogo</p>
                <h1 className="ep-title">Aumenta quantità bici</h1>
            </div>
            <div className="ep-body">
                <div className="ep-form-panel" style={{ maxWidth: '400px' }}>
                    <div className="ep-form-grid single">
                        <div className="ep-field">
                            <label htmlFor="abq-id">ID bici</label>
                            <input id="abq-id" type="number" placeholder="es. 42"
                                value={bikeId} onChange={(e) => setBikeId(e.target.value)} />
                        </div>
                        <div className="ep-field">
                            <label htmlFor="abq-qty">Quantità da aggiungere</label>
                            <input id="abq-qty" type="number" placeholder="es. 10"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                    </div>

                    {success && <p className="ep-alert ep-alert--success">{success}</p>}
                    {error   && <p className="ep-alert ep-alert--error" role="alert">{error}</p>}

                    <div className="ep-actions">
                        <button className="ep-btn ep-btn--ghost" type="button"
                            onClick={() => { setBikeId(''); setQuantity(''); setSuccess(''); setError(''); }}>
                            Annulla
                        </button>
                        <button className="ep-btn ep-btn--primary" type="button"
                            onClick={HandleForm} disabled={loading} aria-busy={loading}>
                            {loading ? 'Aggiornamento…' : 'Conferma'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBikeQuantity;