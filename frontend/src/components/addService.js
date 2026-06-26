/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/addService.css";

const AddService = () => {

    const [base64Image, setBase64Image] = useState(null);
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setBase64Image(reader.result);
        reader.readAsDataURL(file);
    };

    const handleForm = (event) => {
        event.preventDefault();
        setError(''); setFeedbackMsg('');

        if (!serviceName || !price || !brand || !base64Image) {
            setError("Tutti i campi sono obbligatori, inclusa l'immagine.");
            return;
        }

        setLoading(true);
        const serviceData = {
            name: serviceName,
            price: parseFloat(price),
            description: description || 'none',
            feedback: 0,
            brand: brand,
            image: base64Image,
            category: 7
        };

        fetch('https://bike-heaven.onrender.com/api/postService', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        })
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            if (data.success) setFeedbackMsg('Servizio pubblicato con successo.');
            else setError('Pubblicazione non riuscita. Controlla i log del server.');
        })
        .catch(() => setError('Errore di connessione o del server.'))
        .finally(() => setLoading(false));
    };

    return (
        <div className="serviceUpload">
            <div className="serviceTitle">
                <h1>Aggiungi un Servizio</h1>
            </div>

            <div className="serviceContainer">
                <label className="fieldLabel" htmlFor="srv-name">Nome servizio</label>
                <input id="srv-name" className="field" type="text"
                    placeholder="es. Cambio gomme"
                    onChange={(e) => setServiceName(e.target.value)} />
            </div>

            <div className="serviceContainer">
                <label className="fieldLabel" htmlFor="srv-price">Prezzo (€)</label>
                <input id="srv-price" className="field" type="number"
                    placeholder="0.00"
                    onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="serviceContainer">
                <label className="fieldLabel" htmlFor="srv-brand">Brand</label>
                <input id="srv-brand" className="field" type="text"
                    placeholder="es. BikeHeaven"
                    onChange={(e) => setBrand(e.target.value)} />
            </div>

            <div className="serviceContainer serviceContainer--textarea">
                <label className="fieldLabel" htmlFor="srv-desc">Descrizione</label>
                <textarea id="srv-desc" className="field fieldTextarea"
                    placeholder="Descrivi il servizio…"
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="serviceContainer">
                <label className="fieldLabel" htmlFor="srv-img">Immagine</label>
                <input id="srv-img" type="file" accept="image/*"
                    onChange={handleImageChange} />
            </div>

            <div className="feedbackRow">
                <span className="feedbackLabel">Feedback clienti</span>
                <span className="stars">★★★★★</span>
                <span className="feedbackNote">impostato dai clienti</span>
            </div>

            {feedbackMsg && <p className="formAlert formAlert--success">{feedbackMsg}</p>}
            {error && <p className="formAlert formAlert--error" role="alert">{error}</p>}

            <div className="formActions">
                <button id="cancelService" type="button"
                    onClick={() => { setError(''); setFeedbackMsg(''); }}>
                    Annulla
                </button>
                <button id="confirmService" type="button"
                    onClick={handleForm} disabled={loading}>
                    {loading ? 'Pubblicazione…' : 'Pubblica servizio'}
                </button>
            </div>
        </div>
    );
};

export default AddService;