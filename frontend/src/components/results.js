/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style/results.css';
import CardNew from './card_new';

function Results() {

    const { searchID } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    const fetchResults = useCallback(async () => {
        setLoading(true);
        setFetchError(false);

        try {
            const response = await fetch(`/api/search/${encodeURIComponent(searchID)}`);

            if (!response.ok) {
                throw new Error("Fetching data failed");
            }

            const JSONData = await response.json();
            setData(JSONData.data.oggetti || []);
        } catch (err) {
            setFetchError(true);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [searchID]);

    useEffect(() => {
        fetchResults();
        // Dipendenza su searchID: cambiando ricerca (es. dalla navbar)
        // React Router riusa lo stesso componente Results, quindi senza
        // questa dipendenza il fetch non sarebbe mai ripartito e la
        // pagina avrebbe continuato a mostrare i risultati della
        // ricerca precedente.
    }, [fetchResults]);

    const displaySearchTerm = decodeURIComponent(searchID || '');
    const hasResults = Array.isArray(data) && data.length > 0;

    return (
        <div className="resultsContainer">
            <div className="resultPage">
                <div className="resultString">
                    <h1>
                        Results for <em>&quot;{displaySearchTerm}&quot;</em>
                    </h1>
                    {!loading && !fetchError && (
                        <p>Showing {data.length} result{data.length === 1 ? '' : 's'}.</p>
                    )}
                </div>

                <div className="card_container" aria-live="polite">
                    {loading && (
                        Array.from({ length: 6 }).map((_, idx) => (
                            <div className="skeleton_card" key={`skeleton-${idx}`} aria-hidden="true">
                                <div className="skeleton_image" />
                                <div className="skeleton_line skeleton_title" />
                                <div className="skeleton_line skeleton_price" />
                            </div>
                        ))
                    )}

                    {!loading && fetchError && (
                        <div className="state_message state_error" role="alert">
                            <p>Non siamo riusciti a recuperare i risultati per &quot;{displaySearchTerm}&quot;.</p>
                            <button type="button" className="retry_button" onClick={fetchResults}>
                                Riprova
                            </button>
                        </div>
                    )}

                    {!loading && !fetchError && !hasResults && (
                        <div className="noResults">
                            <p>No products found for &quot;{displaySearchTerm}&quot;</p>
                            <Link to="/shop" className="back_to_shop_link">
                                Torna allo Shop
                            </Link>
                        </div>
                    )}

                    {!loading && !fetchError && hasResults && (
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
        </div>
    );
}

export default Results;

/*
    CHANGELOG — sintesi delle modifiche rispetto alla versione originale
    ----------------------------------------------------------------------
    1. BUG PRINCIPALE: l'useEffect aveva dipendenze [] (fetch eseguito
       solo al mount). Cambiando ricerca da una pagina Results già
       montata (es. via navbar), React Router riusa lo stesso componente
       e l'effetto non veniva ripetuto: i risultati restavano quelli
       della ricerca precedente mentre il titolo mostrava il nuovo
       termine. Ora fetchResults è in dipendenza tramite useCallback
       legato a `searchID`, quindi ogni cambio di parametro rifà il fetch.
    2. Rimosso il giro JSON.stringify(params) → JSON.parse(dat) per
       estrarre searchID: era un'operazione superflua, il valore è già
       disponibile direttamente da useParams().
    3. Stato iniziale di `data` portato da stringa vuota '' ad array
       vuoto []: con '' il check `data ? (...) : (...)` valutava falsy
       e mostrava "No products found" per un istante anche quando i
       dati stavano per arrivare (flash visivo fuorviante).
    4. Aggiunto stato loading effettivamente usato in JSX (skeleton),
       prima impostato ma mai mostrato: l'utente non vedeva alcun
       feedback tra l'invio della ricerca e la comparsa dei risultati.
    5. Aggiunto uno stato di errore distinto dal "nessun risultato":
       prima `response.status === 500` era l'unico controllo, qualunque
       altro fallimento (404, 502, errore di rete) finiva silenziosamente
       nel catch con solo un console.log, indistinguibile per l'utente
       da "zero risultati per questa ricerca".
    6. Rimossi handleSubmit/searchText/handleChange: non erano collegati
       a nessun form o input nel JSX (codice morto), e handleSubmit
       leggeva e.target.value da un evento onSubmit dove e.target è il
       <form>, quindi anche se collegato non avrebbe mai funzionato
       correttamente. Se serve una search bar anche in questa pagina,
       va implementata da capo con una vera <form>/<input> collegati.
    7. encodeURIComponent sul termine di ricerca nella fetch (stesso
       fix già applicato in NavBar) e decodeURIComponent per mostrarlo
       pulito all'utente nel titolo (es. "Mountain Bikes" invece di
       "Mountain%20Bikes").
    8. console.log di debug rimosso.
    9. "Results for ..." ora è un vero <h1>, prima era testo libero in
       un <div> senza alcun heading semantico nella pagina.
    10. aria-live="polite" sulla zona risultati: chi usa screen reader
        viene avvisato quando il contenuto cambia dopo una ricerca.
    11. CTA "Torna allo Shop" aggiunta nello stato "nessun risultato",
        prima l'utente restava su un vicolo cieco senza azioni suggerite.
*/