/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import "./style/feedbackList.css";

function StarRating({ value }) {
    return (
        <div className="fl_stars" aria-label={`Valutazione: ${value} su 5`}>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    className={`fl_star ${
                        value >= star         ? 'fl_star_full'  :
                        value >= star - 0.5   ? 'fl_star_half'  :
                                                'fl_star_empty'
                    }`}
                    aria-hidden="true"
                >★</span>
            ))}
            <span className="fl_star_value">{Number(value).toFixed(1)}</span>
        </div>
    );
}

function FeedbackList() {
    const { id: idproduct } = useParams();
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(false);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const res  = await fetch(
                `https://bike-heaven.onrender.com/api/getReviews/${idproduct}`
            );
            if (!res.ok) throw new Error();
            const json = await res.json();
            setData(json.data || []);
        } catch {
            setError(true);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [idproduct]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    /* Ascolta l'evento custom emesso da MakeFeedback dopo una nuova recensione */
    useEffect(() => {
        window.addEventListener('review-submitted', fetchReviews);
        return () => window.removeEventListener('review-submitted', fetchReviews);
    }, [fetchReviews]);

    if (loading) return (
        <div className="fl_list">
            {[1, 2, 3].map(i => (
                <div key={i} className="fl_skeleton">
                    <div className="fl_sk_line fl_sk_name"  />
                    <div className="fl_sk_line fl_sk_stars" />
                    <div className="fl_sk_line fl_sk_text"  />
                </div>
            ))}
        </div>
    );

    if (error) return (
        <div className="fl_empty">
            <span className="fl_empty_icon">⚠</span>
            <p>Impossibile caricare le recensioni.</p>
            <button className="fl_retry" onClick={fetchReviews}>Riprova</button>
        </div>
    );

    if (!data || data.length === 0) return (
        <div className="fl_empty">
            <span className="fl_empty_icon">✦</span>
            <p>Nessuna recensione ancora. Sii il primo!</p>
        </div>
    );

    return (
        <div className="fl_list">
            {data.map((item, index) => (
                <article key={item.id ?? index} className="fl_card">
                    <div className="fl_card_header">
                        <div className="fl_avatar" aria-hidden="true">
                            {item.firstname?.[0]}{item.lastname?.[0]}
                        </div>
                        <div className="fl_card_meta">
                            <span className="fl_name">
                                {item.firstname} {item.lastname}
                            </span>
                            <StarRating value={item.value} />
                        </div>
                    </div>
                    <p className="fl_content">{item.content}</p>
                </article>
            ))}
        </div>
    );
}

export default FeedbackList;