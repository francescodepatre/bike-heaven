/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import "./checkout.css";

const CARD_OPTIONS = {
    style: {
        base: {
            fontSize: '15px',
            fontFamily: "'Poppins', sans-serif",
            color: '#16181c',
            letterSpacing: '0.02em',
            '::placeholder': { color: '#adb3bb' },
        },
        invalid: {
            color: '#d8453b',
            iconColor: '#d8453b',
        },
    },
    hidePostalCode: true,
};

function Checkout() {
    const { type, id } = useParams();
    const navigate      = useNavigate();
    const stripe        = useStripe();
    const elements      = useElements();

    const [loading,    setLoading]    = useState(false);
    const [cardError,  setCardError]  = useState('');
    const [globalError, setGlobalError] = useState('');
    const [success,    setSuccess]    = useState(false);

    /* ── Gestione errori inline dalla card Stripe ── */
    function handleCardChange(e) {
        setCardError(e.error ? e.error.message : '');
    }

    /* ── Submit ── */
    async function handleSubmit(e) {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setGlobalError('');

        try {
            const cardEl = elements.getElement(CardElement);
            const { token, error } = await stripe.createToken(cardEl);

            if (error) {
                setCardError(error.message);
                setLoading(false);
                return;
            }

            const res = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token:        localStorage.getItem('token'),
                    type,
                    id,
                    paymentToken: token.id,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => navigate(-1), 2000);
            } else {
                setGlobalError("Pagamento non riuscito. Controlla i dati e riprova.");
            }
        } catch {
            setGlobalError("Errore di connessione. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    }

    /* ── Render ── */
    return (
        <div className="checkout_page">
            <div className="checkout_card">

                {/* ── Header ── */}
                <div className="checkout_header">
                    <p className="checkout_eyebrow">Pagamento sicuro</p>
                    <h1 className="checkout_title">Checkout</h1>
                </div>

                {/* ── Successo ── */}
                {success && (
                    <div className="checkout_success" role="status">
                        ✓ Pagamento effettuato con successo! Reindirizzamento…
                    </div>
                )}

                {/* ── Form ── */}
                {!success && (
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Badge Stripe */}
                        <div className="checkout_stripe_badge">
                            <span>🔒</span>
                            <span>Pagamento protetto da Stripe</span>
                        </div>

                        {/* Card element */}
                        <div className={`checkout_card_field ${cardError ? 'has_error' : ''}`}>
                            <label className="checkout_label">
                                Dati della carta
                            </label>
                            <div className="checkout_card_element">
                                <CardElement
                                    options={CARD_OPTIONS}
                                    onChange={handleCardChange}
                                />
                            </div>
                            {cardError && (
                                <p className="checkout_field_error" role="alert">
                                    {cardError}
                                </p>
                            )}
                        </div>

                        {/* Errore globale */}
                        {globalError && (
                            <p className="checkout_global_error" role="alert">
                                {globalError}
                            </p>
                        )}

                        {/* Azioni */}
                        <div className="checkout_actions">
                            <button
                                type="button"
                                className="checkout_btn checkout_btn_ghost"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                className="checkout_btn checkout_btn_primary"
                                disabled={loading || !stripe}
                                aria-busy={loading}
                            >
                                {loading ? 'Elaborazione…' : 'Conferma pagamento'}
                            </button>
                        </div>

                    </form>
                )}

            </div>
        </div>
    );
}

export default Checkout;