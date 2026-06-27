/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
    https://www.youtube.com/watch?v=DfqZhItEK-U

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import bikeTrailer from './bike_heaven.mp4';
//import aboutVideo from './abus.mp4';
import './style/main.css';
import CardNew from './card_new';
import Twitter from './images/twitter_icon.png';
import Instagram from './images/instagram_icon.png';
import YouTube from './images/youtube_icon.png';

const API_BASE = "https://bike-heaven.onrender.com/api";

/* -------------------------------------------------------------------------- */
/*  Skeleton card — mostrata durante il loading al posto delle CardNew reali  */
/* -------------------------------------------------------------------------- */
function SkeletonCard() {
    return (
        <div className="skeleton_card" aria-hidden="true">
            <div className="skeleton_image" />
            <div className="skeleton_line skeleton_title" />
            <div className="skeleton_line skeleton_price" />
        </div>
    );
}
function Disclaimer() {
    const [visible, setVisible] = useState(
        () => sessionStorage.getItem('disclaimer_closed') !== 'true'
    );

    const close = useCallback(() => {
        sessionStorage.setItem('disclaimer_closed', 'true');
        setVisible(false);
    }, []);

    if (!visible) return null;

    return (
        <div className="disclaimer_banner" role="region" aria-label="Avviso progetto accademico">
            <div className="disclaimer_content">
                <span className="disclaimer_icon" aria-hidden="true">🎓</span>
                <p className="disclaimer_text">
                    <strong>Progetto accademico</strong> — Questo sito è stato realizzato
                    esclusivamente a scopo didattico nell'ambito del corso di{' '}
                    <em>Tecnologie Internet</em>, Università di Parma.
                    Non costituisce un'attività commerciale reale: nessun prodotto è in
                    vendita, nessun dato personale viene conservato e i contenuti non hanno
                    valore legale, contrattuale o pubblicitario.
                </p>
                <button
                    className="disclaimer_close"
                    onClick={close}
                    aria-label="Chiudi avviso"
                    type="button"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Hook minimale per il fade-in on scroll, rispetta prefers-reduced-motion   */
/* -------------------------------------------------------------------------- */
function useRevealOnScroll() {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            node.classList.add('is_visible');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add('is_visible');
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return ref;
}

function Main_page() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const navigate = useNavigate();

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Refs per il reveal-on-scroll delle sezioni
    const aboutRef = useRevealOnScroll();
    const contactRef = useRevealOnScroll();

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setFetchError(false);
        try {
            const response = await fetch(`${API_BASE}/home`);

            if (!response.ok) {
                throw new Error("Fetching data failed");
            }

            const JSONData = await response.json();
            setData(JSONData.data.oggetti || []);
        } catch (err) {
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    /* ---------------------------- Validazione form --------------------------- */
    const validate = () => {
        const errors = {};
        if (!firstName.trim()) errors.firstName = "Il nome è obbligatorio.";
        if (!lastName.trim()) errors.lastName = "Il cognome è obbligatorio.";
        if (!email.trim()) {
            errors.email = "L'email è obbligatoria.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Inserisci un indirizzo email valido.";
        }
        if (!message.trim()) errors.message = "Scrivi un messaggio prima di inviare.";
        return errors;
    };

    function handleForm(event) {
        event.preventDefault();

        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const mailData = { firstName, lastName, email, message };
        setSubmitting(true);
        setSubmitSuccess(false);

        fetch(`${API_BASE}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mailData)
        })
            .then(response => response.json())
            .then(() => {
                setSubmitSuccess(true);
                setFirstName('');
                setLastName('');
                setEmail('');
                setMessage('');
                setFormErrors({});
            })
            .catch(() => {
                setFormErrors({ global: "Invio non riuscito. Riprova tra qualche istante." });
            })
            .finally(() => setSubmitting(false));
    }

    const hasProducts = useMemo(() => Array.isArray(data) && data.length > 0, [data]);

    return (
        <div className="main_containers">
            <Disclaimer />

            {/* ---------------------------- HERO ---------------------------- */}
            <div className="first_container">
                <div className="hero_overlay" aria-hidden="true" />
                <div className="title_container">
                    <p className="eyebrow">Cycling Science meets Adventure</p>
                    <h1 id="title">Welcome to Bike Heaven</h1>
                    <h2 id="subtitle">
                        Biciclette, componenti e accessori per chi non si accontenta.
                    </h2>
                    <div id="visit_shop">
                        <Link id="shop_button" to="/shop">
                            Scopri lo Shop
                            <span className="shop_button_arrow" aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                <iframe
                    id="hero_video"
                    className="background_video"
                    src="https://www.youtube.com/embed/IPyYIysw4Zw?autoplay=1&mute=1&loop=1&playlist=IPyYIysw4Zw&controls=0&modestbranding=1&rel=0"
                    title="Video promozionale Bike Heaven"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    aria-hidden="true"
                    tabIndex="-1"
                />
            </div>

            {/* ------------------------- PRODOTTI ------------------------- */}
            <div className="second_container">
                <h2 id="second_title">Ultimi Modelli</h2>

                <div className="Cards_container" aria-live="polite">
                    {loading && (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <SkeletonCard key={`skeleton-${idx}`} />
                        ))
                    )}

                    {!loading && fetchError && (
                        <div className="state_message state_error" role="alert">
                            <p>Non siamo riusciti a caricare i prodotti in questo momento.</p>
                            <button
                                type="button"
                                className="retry_button"
                                onClick={loadProducts}
                            >
                                Riprova
                            </button>
                        </div>
                    )}

                    {!loading && !fetchError && !hasProducts && (
                        <div className="state_message">
                            <p>Nessun prodotto disponibile al momento. Torna a trovarci presto!</p>
                        </div>
                    )}

                    {!loading && !fetchError && hasProducts && (
                        data.map(item => (
                            <CardNew
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                price={item.price}
                                description={item.desc}
                                immagine={`data:image/jpeg;base64,${item.picture}`}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* --------------------------- ABOUT --------------------------- */}
            <div className="third_container" id="about_container">
                <div className="about_overlay" aria-hidden="true" />
                <div className="about reveal_on_scroll" ref={aboutRef}>
                    <h2 id="about_title">About Us</h2>
                    <p id="about_subtitle">
                        Benvenuti in Bike Heaven, la destinazione definitiva per gli appassionati di
                        ciclismo. Siamo una piattaforma e-commerce nata per offrire ai ciclisti di
                        ogni livello tutto ciò che serve per vivere al meglio la propria
                        esperienza in sella.
                        <br /><br />
                        Dagli accessori di alta qualità ai brand più rinomati, selezioniamo una
                        gamma di prodotti pensata per ogni esigenza: dal city rider alla ricerca
                        di stile e funzionalità, fino al ciclista avventuroso pronto ad affrontare
                        i sentieri più impegnativi.
                        <br /><br />
                        La nostra missione è rendere l'acquisto di prodotti per il ciclismo
                        un'esperienza semplice, sicura e coinvolgente, con informazioni dettagliate
                        e recensioni reali per aiutarti a scegliere con consapevolezza.
                    </p>
                </div>
                <iframe
                    id="about_video"
                    className="background_video"
                    src="https://www.youtube.com/embed/DfqZhItEK-U?autoplay=1&mute=1&loop=1&playlist=DfqZhItEK-U&controls=0&modestbranding=1&rel=0&showinfo=0"
                    title="Bike Heaven - Chi siamo"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    aria-hidden="true"
                    tabIndex="-1"
                />
            </div>

            {/* ------------------------- CONTATTI ------------------------- */}
            <div className="fourth_container reveal_on_scroll" id="contact_container" ref={contactRef}>
                <div className="left_container">
                    <h2 className="left_title">Follow Us</h2>
                    <div className="social_buttons">
                        <div className="buttons_container">
                            <a
                                id="twitter_button"
                                className="social_link"
                                href="https://twitter.com/bikeheaven_?s=21&t=gWAZRenKIUUZES44W8rUUg"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Seguici su Twitter"
                            >
                                <img src={Twitter} alt="" />
                            </a>
                            <a
                                id="instagram_button"
                                className="social_link"
                                href="https://www.instagram.com/bikeheaven.business/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Seguici su Instagram"
                            >
                                <img src={Instagram} alt="" />
                            </a>
                            <a
                                id="youtube_button"
                                className="social_link"
                                href="https://www.youtube.com/channel/UC4WQZ6RHLaklIzQh2Wlu2ig"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Iscriviti al canale YouTube"
                            >
                                <img src={YouTube} alt="" />
                            </a>
                        </div>
                    </div>
                    <address id="bottom_info">
                        Via Borgo Rodolfo Tanzi 30/1, 43125, Parma (PR)
                    </address>
                    <p id="authorInfo">Made by: Francesco De Patre</p>
                </div>

                <div className="right_container">
                    <h2 className="right_title">Contact Us</h2>
                    <form className="contact_us_container" onSubmit={handleForm} noValidate>

                        <div className="form_row">
                            <div className="form_field">
                                <label className="for_id1"  htmlFor="nameField">Nome</label>
                                <input
                                    id="nameField"
                                    type="text"
                                    autoComplete="given-name"
                                    value={firstName}
                                    aria-invalid={!!formErrors.firstName}
                                    aria-describedby={formErrors.firstName ? "nameField-error" : undefined}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {formErrors.firstName && (
                                    <span className="field_error" id="nameField-error">{formErrors.firstName}</span>
                                )}
                            </div>

                            <div className="form_field">
                                <label className="for_id2" htmlFor="surnameField">Cognome</label>
                                <input
                                    id="surnameField"
                                    type="text"
                                    autoComplete="family-name"
                                    value={lastName}
                                    aria-invalid={!!formErrors.lastName}
                                    aria-describedby={formErrors.lastName ? "surnameField-error" : undefined}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {formErrors.lastName && (
                                    <span className="field_error" id="surnameField-error">{formErrors.lastName}</span>
                                )}
                            </div>
                        </div>

                        <div className="form_field">
                            <label className="for_id3" htmlFor="emailField">Email</label>
                            <input
                                id="emailField"
                                type="email"
                                autoComplete="email"
                                value={email}
                                aria-invalid={!!formErrors.email}
                                aria-describedby={formErrors.email ? "emailField-error" : undefined}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {formErrors.email && (
                                <span className="field_error" id="emailField-error">{formErrors.email}</span>
                            )}
                        </div>

                        <div className="form_field">
                            <label className="for_id4" htmlFor="messageField">Messaggio</label>
                            <textarea
                                id="messageField"
                                value={message}
                                aria-invalid={!!formErrors.message}
                                aria-describedby={formErrors.message ? "messageField-error" : undefined}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            {formErrors.message && (
                                <span className="field_error" id="messageField-error">{formErrors.message}</span>
                            )}
                        </div>

                        {formErrors.global && (
                            <p className="field_error form_global_error" role="alert">{formErrors.global}</p>
                        )}

                        {submitSuccess && (
                            <p className="form_success" role="status">
                                Grazie per averci contattato! Ti risponderemo al più presto.
                            </p>
                        )}

                        <button
                            id="sendButton"
                            type="submit"
                            disabled={submitting}
                            aria-busy={submitting}
                        >
                            {submitting ? "Invio..." : "Send"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Main_page;
