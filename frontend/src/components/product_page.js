/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React, { useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import "./style/product_page.css";
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FeedbackList from "./feedbackList";
import MakeFeedback from "./makeFeedback";

// Categorie di prodotto che mostrano la tabella specifiche tecniche
// complete (telaio, cambio, freni, ecc.) invece del solo brand.
// Confronto case-insensitive per evitare il disallineamento tra le
// stringhe usate in punti diversi del progetto (es. "E-Bikes" in
// shopmenu.js contro "E-bikes" qui): senza normalizzare, un prodotto
// e-bike rischiava di non mostrare mai la tabella completa.
const BIKE_CATEGORIES = [
    "road bicycles",
    "mountain bikes",
    "city bikes",
    "e-bikes",
    "bikes for kids"
];

function ProductPage() {

    const { id: param_id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    const [actionMessage, setActionMessage] = useState(null); // { type: 'success'|'error', text }
    const [addingToCart, setAddingToCart] = useState(false);
    const [buyingNow, setBuyingNow] = useState(false);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        setFetchError(false);

        try {
            const response = await fetch(`https://bike-heaven.onrender.com/api/productSearch/${param_id}`);

            if (!response.ok) {
                throw new Error("Fetching data failed");
            }

            const JSONData = await response.json();
            const details = JSONData.productDetails;

            setProduct({
                titleProduct: details.name,
                price: details.price,
                brand: details.brand,
                telaio: details.frame,
                dimensions: details.dimensions,
                gear: details.gear,
                brakes: details.brakes,
                sosp: details.suspensions,
                weight: details.weight,
                feedback: details.feedback,
                quantity: details.quantity,
                picture: details.picture,
                description: details.description,
                category: JSONData.category
            });
        } catch (err) {
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    }, [param_id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    // Centralizza la verifica del token, prima duplicata identicamente
    // in addProductHandler e buyProductHandler. Ritorna il token se
    // valido, altrimenti mostra il messaggio appropriato e ritorna null.
    function getValidToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            setActionMessage({ type: 'error', text: "Effettua il login per continuare." });
            return null;
        }

        try {
            const decodedToken = jwtDecode(token);
            const expirationDate = new Date(decodedToken.exp * 1000);
            if (expirationDate <= new Date()) {
                setActionMessage({ type: 'error', text: "La sessione è scaduta. Effettua di nuovo il login." });
                return null;
            }
            return token;
        } catch (error) {
            setActionMessage({ type: 'error', text: "Sessione non valida. Effettua di nuovo il login." });
            return null;
        }
    }

    async function addProductHandler(event) {
        event.preventDefault();
        if (!product) return;

        const isAvailable = product.quantity > 0 || product.category === "Services";
        if (!isAvailable) {
            setActionMessage({ type: 'error', text: "Siamo spiacenti, questo prodotto non è disponibile." });
            return;
        }

        const token = getValidToken();
        if (!token) return;

        setAddingToCart(true);
        setActionMessage(null);

        try {
            const requestData = { userToken: token, productID: param_id };
            const response = await fetch("https://bike-heaven.onrender.com/api/addProduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();

            setActionMessage(
                data.success
                    ? { type: 'success', text: "Prodotto aggiunto al carrello." }
                    : { type: 'error', text: "Non è stato possibile aggiungere il prodotto al carrello." }
            );
        } catch (error) {
            setActionMessage({ type: 'error', text: "Errore di rete. Riprova tra qualche istante." });
        } finally {
            setAddingToCart(false);
        }
    }

    function buyProductHandler(event) {
        event.preventDefault();
        if (!product) return;

        if (!(product.quantity > 0)) {
            setActionMessage({ type: 'error', text: "Siamo spiacenti, questo prodotto non è disponibile." });
            return;
        }

        const token = getValidToken();
        if (!token) return;

        setBuyingNow(true);
        navigate(`/checkout/${param_id}/single`);
    }

    if (loading) {
        return (
            <div className="productContainer">
                <div className="productPage">
                    <div className="productImage">
                        <div className="skeleton_image" />
                    </div>
                    <div className="productContent">
                        <div className="skeleton_line skeleton_title" />
                        <div className="skeleton_line skeleton_subtitle" />
                        <div className="skeleton_line skeleton_price" />
                        <div className="skeleton_line skeleton_text" />
                        <div className="skeleton_line skeleton_text" />
                    </div>
                </div>
            </div>
        );
    }

    if (fetchError || !product) {
        return (
            <div className="productContainer">
                <div className="state_message state_error" role="alert">
                    <p>Non siamo riusciti a caricare questo prodotto.</p>
                    <button type="button" className="retry_button" onClick={fetchProduct}>
                        Riprova
                    </button>
                </div>
            </div>
        );
    }

    const {
        titleProduct, price, brand, telaio, dimensions, gear,
        brakes, sosp, weight, feedback, quantity, picture,
        description, category
    } = product;

    const isBikeCategory = BIKE_CATEGORIES.includes((category || "").toLowerCase());

    let availability;
    if (quantity > 10 || category === "Services") {
        availability = { className: "av", label: "Disponibile" };
    } else if (quantity > 0 && quantity <= 10) {
        availability = { className: "few", label: "Pochi pezzi rimasti" };
    } else {
        availability = { className: "sold", label: "Esaurito" };
    }

    return (
        <div className="productContainer">
            <div className="productPage">
                <div className="productImage">
                    <img src={`data:image/jpeg;base64,${picture}`} alt={titleProduct ? `${titleProduct} — ${brand}` : "Prodotto Bike Heaven"} />
                </div>
                <div className="productContent">
                    <div className="productTitle">
                        <h1 className="Title">{titleProduct}</h1>
                        <p className="SellerInfo">{brand}</p>
                    </div>
                    <div className="productPrice">
                        <h2 className="Price">€ {price}</h2>
                    </div>

                    <div className="productAvailability">
                        <span className={`availability_badge ${availability.className}`}>
                            <span className="availability_dot" aria-hidden="true" />
                            {availability.label}
                        </span>
                    </div>

                    <div className="productDescription">
                        <p className="Description">{description}</p>
                    </div>

                    <div className="productRatings">
                        <Typography component="legend">Product Feedback</Typography>
                        <Rating name="read-only" value={feedback} readOnly precision={0.5} />
                    </div>

                    <div className="productSpecs">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="TableData" scope="row">Brand</th>
                                    <td className="BikeData">{brand}</td>
                                </tr>
                                {isBikeCategory && (
                                    <>
                                        <tr>
                                            <th className="TableData" scope="row">Frame</th>
                                            <td className="BikeData">{telaio}</td>
                                        </tr>
                                        <tr>
                                            <th className="TableData" scope="row">Dimensions</th>
                                            <td className="BikeData">{dimensions} cm</td>
                                        </tr>
                                        <tr>
                                            <th className="TableData" scope="row">Gear</th>
                                            <td className="BikeData">{gear}</td>
                                        </tr>
                                        <tr>
                                            <th className="TableData" scope="row">Brakes</th>
                                            <td className="BikeData">{brakes}</td>
                                        </tr>
                                        <tr>
                                            <th className="TableData" scope="row">Suspensions</th>
                                            <td className="BikeData">{sosp}</td>
                                        </tr>
                                        <tr>
                                            <th className="TableData" scope="row">Weight</th>
                                            <td className="BikeData">{weight} Kg</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {actionMessage && (
                        <p
                            className={`action_message ${actionMessage.type === 'success' ? 'action_success' : 'action_error'}`}
                            role={actionMessage.type === 'success' ? 'status' : 'alert'}
                        >
                            {actionMessage.text}
                        </p>
                    )}
                </div>
            </div>

            <div className="actionMenu">
                <div className="addCart">
                    <button
                        className="addBtn"
                        onClick={addProductHandler}
                        disabled={addingToCart}
                        aria-busy={addingToCart}
                    >
                        {addingToCart ? "Aggiunta in corso..." : "Add To Cart"}
                    </button>
                </div>
                <div className="Buy">
                    <button
                        className="buyBtn"
                        onClick={buyProductHandler}
                        disabled={buyingNow}
                        aria-busy={buyingNow}
                    >
                        {buyingNow ? "Un attimo..." : "Buy Now"}
                    </button>
                </div>
            </div>

            <div className="feedbacks">
                <div className="feedbackListTitle">
                    <h2>Product Reviews</h2>
                </div>
                <FeedbackList />
                <MakeFeedback />
            </div>
        </div>
    );
}

export default ProductPage;

/*
    CHANGELOG — sintesi delle modifiche rispetto alla versione originale
    ----------------------------------------------------------------------
    1. BUG: durante il fetch iniziale tutti i campi partivano come
       stringa vuota '', e availabilityString confrontava quantity=''
       con dei numeri: in JS '' > 0 è false e '' < 10 è true (coercion
       a 0), quindi la pagina mostrava "Few left" su un prodotto non
       ancora caricato — messaggio fuorviante mostrato come prima cosa
       all'utente. Ora un vero stato `loading` mostra uno skeleton
       finché i dati non sono arrivati, e availability si calcola solo
       a dati caricati.
    2. BUG: se il fetch falliva, l'errore finiva solo in console.log,
       la pagina restava bloccata sullo stato vuoto iniziale senza
       alcun feedback. Aggiunto uno stato di errore visibile con CTA
       "Riprova".
    3. BUG: il confronto category === "E-bikes" non corrispondeva alla
       stringa "E-Bikes" usata in shopmenu.js (maiuscola/minuscola
       diversa): se il backend restituisce la stessa capitalizzazione
       di shopmenu.js, i prodotti e-bike non mostravano mai la tabella
       specifiche completa. Risolto normalizzando il confronto con
       .toLowerCase() su un array di categorie (BIKE_CATEGORIES),
       indipendente da maiuscole/minuscole.
    4. Estratta la verifica token (decode + controllo scadenza), prima
       duplicata identicamente in addProductHandler e
       buyProductHandler, in una funzione condivisa getValidToken():
       singola fonte di verità, una sola modifica futura necessaria se
       la logica di autenticazione cambia.
    5. Tutti gli alert() nativi (6 in totale: successo aggiunta,
       errore aggiunta, token scaduto in due punti, "please log in" in
       due punti, prodotto non disponibile) sostituiti con un messaggio
       inline non bloccante (actionMessage), con role="status" per i
       successi e role="alert" per gli errori — non interrompono più il
       flusso d'acquisto.
    6. Aggiunto stato di loading sui bottoni Add To Cart/Buy Now
       (addingToCart/buyingNow) con disabled durante la richiesta,
       prevenendo click multipli e richieste duplicate — assente
       nell'originale.
    7. console.log di debug rimossi (incluso il log dello status della
       response e del param passato).
    8. Tabella specifiche: le etichette ("Brand", "Frame", ecc.) erano
       <td>, non semanticamente corrette per intestazioni di riga.
       Sostituite con <th scope="row">, navigabili correttamente da
       screen reader.
    9. Disponibilità prodotto: prima comunicata solo tramite colore
       (verde/coral/rosso), violando il principio WCAG di non affidarsi
       al solo colore. Aggiunto un pallino (availability_dot, decorativo
       via aria-hidden) + testo descrittivo sempre presente
       ("Disponibile"/"Pochi pezzi rimasti"/"Esaurito").
    10. alt dell'immagine prodotto, prima generico ("By BikeHeaven®"),
        ora include nome prodotto e brand quando disponibili — uno
        screen reader può identificare il prodotto dalla sola immagine.
    11. "Product Reviews" portato da <h1> a <h2>: un <h1> era già
        presente per il titolo prodotto, una pagina dovrebbe avere un
        solo <h1>.
    12. Prezzo portato da <h1> a <h2> per lo stesso motivo del punto 11.
*/