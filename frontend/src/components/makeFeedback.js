/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import "./style/makeFeedback.css";

const API_BASE = "https://bike-heaven.onrender.com/api";

const MakeFeedback = () => {
    const { id: idproduct } = useParams();

    const [rating,    setRating]    = useState(0);
    const [content,   setContent]   = useState('');
    const [loading,   setLoading]   = useState(false);
    const [success,   setSuccess]   = useState('');
    const [error,     setError]     = useState('');
    const [hovered,   setHovered]   = useState(0);

    function getValidToken() {
        const token = localStorage.getItem("token");
        if (!token) return { error: "Effettua il login per lasciare una recensione." };
        try {
            const decoded = jwt_decode(token);
            if (new Date(decoded.exp * 1000) <= new Date())
                return { error: "Sessione scaduta. Effettua di nuovo il login." };
            return { token };
        } catch {
            return { error: "Sessione non valida. Effettua di nuovo il login." };
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess(''); setError('');

        if (rating === 0) {
            setError("Seleziona una valutazione prima di pubblicare.");
            return;
        }
        if (!content.trim()) {
            setError("Scrivi un commento prima di pubblicare.");
            return;
        }

        const { token, error: tokenError } = getValidToken();
        if (tokenError) { setError(tokenError); return; }

        setLoading(true);
        try {
            const res  = await fetch(`${API_BASE}/setReview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, value: rating, content, codProduct: idproduct }),
            });
            const data = await res.json();

            if (data.success) {
                setSuccess("Grazie per la tua recensione!");
                setRating(0);
                setContent('');
                /* Ricarica la lista recensioni senza fare reload dell'intera pagina */
                window.dispatchEvent(new CustomEvent('review-submitted'));
            } else {
                setError("Pubblicazione non riuscita. Riprova.");
            }
        } catch {
            setError("Errore di connessione. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="mf_section" aria-labelledby="mf-heading">
            <h3 id="mf-heading" className="mf_title">Lascia una recensione</h3>

            <form onSubmit={handleSubmit} noValidate>

                {/* ── Star rating custom ── */}
                <div className="mf_field">
                    <label className="mf_label">Valutazione</label>
                    <div
                        className="mf_stars"
                        role="radiogroup"
                        aria-label="Seleziona una valutazione da 1 a 5 stelle"
                        onMouseLeave={() => setHovered(0)}
                    >
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                className={`mf_star_btn ${(hovered || rating) >= star ? 'is_active' : ''}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHovered(star)}
                                aria-label={`${star} stelle`}
                                aria-pressed={rating === star}
                            >
                                ★
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="mf_star_label">{rating}.0 / 5</span>
                        )}
                    </div>
                </div>

                {/* ── Testo recensione ── */}
                <div className="mf_field">
                    <label className="mf_label" htmlFor="mf-content">
                        Commento
                    </label>
                    <textarea
                        id="mf-content"
                        className="mf_textarea"
                        rows={5}
                        placeholder="Condividi la tua esperienza con questo prodotto…"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        maxLength={1000}
                    />
                    <span className="mf_char_count">{content.length} / 1000</span>
                </div>

                {/* ── Messaggi ── */}
                {success && (
                    <p className="mf_alert mf_alert_success" role="status">{success}</p>
                )}
                {error && (
                    <p className="mf_alert mf_alert_error" role="alert">{error}</p>
                )}

                {/* ── Submit ── */}
                <div className="mf_actions">
                    <button
                        type="submit"
                        className="mf_submit_btn"
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? 'Pubblicazione…' : 'Pubblica recensione'}
                    </button>
                </div>

            </form>
        </section>
    );
};

export default MakeFeedback;