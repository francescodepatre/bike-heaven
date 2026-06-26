/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/addAccessory.css";

const AddAccessory = () => {

    const [base64Image, setBase64Image] = useState(null);
    const [accessoryName, setAccessoryName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
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

        if (!accessoryName || !price || !brand || !quantity || !base64Image) {
            setError("Tutti i campi sono obbligatori, inclusa l'immagine.");
            return;
        }

        setLoading(true);
        const accessoryData = {
            name: accessoryName,
            price: parseFloat(price),
            description: description || 'none',
            feedback: 0,
            brand: brand,
            quantity: parseInt(quantity, 10),
            image: base64Image,
            category: 6
        };

        fetch('https://bike-heaven.onrender.com/api/setAccessory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(accessoryData)
        })
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
            if (data.success) setFeedbackMsg('Accessorio pubblicato con successo.');
            else setError('Pubblicazione non riuscita. Controlla i log del server.');
        })
        .catch(() => setError('Errore di connessione o del server.'))
        .finally(() => setLoading(false));
    };

    return (
        <div className="accessoryUpload">
            <div className="accessoryTitle">
                <h1>Aggiungi un Accessorio</h1>
            </div>

            <div className="accessoryContainer">
                <label className="fieldLabel" htmlFor="acc-name">Nome accessorio</label>
                <input id="acc-name" className="field" type="text"
                    placeholder="es. Casco Giro Syntax"
                    onChange={(e) => setAccessoryName(e.target.value)} />
            </div>

            <div className="accessoryContainer">
                <label className="fieldLabel" htmlFor="acc-price">Prezzo (€)</label>
                <input id="acc-price" className="field" type="number"
                    placeholder="0.00"
                    onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="accessoryContainer">
                <label className="fieldLabel" htmlFor="acc-brand">Brand</label>
                <input id="acc-brand" className="field" type="text"
                    placeholder="es. Shimano"
                    onChange={(e) => setBrand(e.target.value)} />
            </div>

            <div className="accessoryContainer">
                <label className="fieldLabel" htmlFor="acc-qty">Quantità</label>
                <input id="acc-qty" className="field" type="number"
                    placeholder="0"
                    onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div className="accessoryContainer accessoryContainer--textarea">
                <label className="fieldLabel" htmlFor="acc-desc">Descrizione</label>
                <textarea id="acc-desc" className="field fieldTextarea"
                    placeholder="Descrivi l'accessorio…"
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="accessoryContainer">
                <label className="fieldLabel" htmlFor="acc-img">Immagine</label>
                <input id="acc-img" type="file" accept="image/*"
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
                <button id="cancelAccessory" type="button"
                    onClick={() => { setError(''); setFeedbackMsg(''); }}>
                    Annulla
                </button>
                <button id="confirmAccessory" type="button"
                    onClick={handleForm} disabled={loading}>
                    {loading ? 'Pubblicazione…' : 'Pubblica accessorio'}
                </button>
            </div>
        </div>
    );
};

export default AddAccessory;