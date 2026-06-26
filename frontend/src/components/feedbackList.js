/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./style/feedbackList.css";

function FeedbackList() {
    const { id: idproduct } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://bike-heaven.onrender.com/api/getReviews/${idproduct}`);
                if (!response.ok) throw new Error("Fetching data failed");
                const JSONData = await response.json();
                setData(JSONData.data);
            } catch (error) {
                setData([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [idproduct]);

    function StarRating({ value }) {
        return (
            <div className="fl-stars" aria-label={`Valutazione: ${value} su 5`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`fl-star ${value >= star ? 'fl-star--full' : value >= star - 0.5 ? 'fl-star--half' : 'fl-star--empty'}`}
                        aria-hidden="true"
                    >★</span>
                ))}
                <span className="fl-star-value">{Number(value).toFixed(1)}</span>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="fl-list">
                {[1, 2, 3].map(i => (
                    <div key={i} className="fl-skeleton">
                        <div className="fl-sk-line fl-sk-name" />
                        <div className="fl-sk-line fl-sk-stars" />
                        <div className="fl-sk-line fl-sk-text" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="fl-empty">
                <span className="fl-empty-icon">✦</span>
                <p>Nessuna recensione ancora. Sii il primo!</p>
            </div>
        );
    }

    return (
        <div className="fl-list">
            {data.map((item, index) => (
                <div key={index} className="fl-card">
                    <div className="fl-card-header">
                        <div className="fl-avatar">
                            {item.firstname?.[0]}{item.lastname?.[0]}
                        </div>
                        <div className="fl-card-meta">
                            <span className="fl-name">{item.firstname} {item.lastname}</span>
                            <StarRating value={item.value} />
                        </div>
                    </div>
                    <p className="fl-content">{item.content}</p>
                </div>
            ))}
        </div>
    );
}

export default FeedbackList;