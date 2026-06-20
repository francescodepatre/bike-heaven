/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React, { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import './style/navBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [token, setToken] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) return;

        try {
            const decoded = jwtDecode(storedToken);

            // jwtDecode legge il payload ma non verifica la scadenza:
            // un token scaduto va trattato come "non loggato".
            const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();
            if (isExpired) {
                localStorage.removeItem('token');
                return;
            }

            setToken(storedToken);
            setUser(decoded);
            setIsLoggedIn(true);
        } catch (err) {
            // Token malformato: lo rimuoviamo invece di lasciare l'app
            // in uno stato inconsistente.
            localStorage.removeItem('token');
        }
    }, []);

    // Sfondo navbar più solido dopo un piccolo scroll, per restare
    // leggibile anche sopra contenuti chiari.
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 16);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Chiude il menu mobile ad ogni cambio rotta.
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
        setToken('');
        navigate('/');
    }, [navigate]);

    const handleSearchSubmit = useCallback((event) => {
        event.preventDefault();
        const trimmed = searchText.trim();
        if (!trimmed) return;

        navigate(`/results/${encodeURIComponent(trimmed)}`);
        setSearchText('');
        setIsMobileMenuOpen(false);
        // Nota: rimosso window.location.reload(). Con un useEffect nella
        // pagina Results che reagisce al param :searchID la lista si
        // aggiorna senza ricaricare l'intera SPA.
    }, [navigate, searchText]);

    const cartUrl = isLoggedIn ? `/cart/${token}` : '/login';
    const isActive = (path) => location.pathname === path;

    return (
        <header className={`navBar ${isScrolled ? 'navBar_scrolled' : ''}`}>
            <div className="navBar_inner">

                <Link className="navbar_home_button" to="/bike-heaven" aria-label="Bike Heaven - Torna alla home">
                    <span className="brand_mark">BIKE</span>
                    <span className="brand_mark brand_mark_accent">HEAVEN</span>
                </Link>

                <button
                    type="button"
                    className="mobile_menu_toggle"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="primary-navigation"
                    aria-label={isMobileMenuOpen ? "Chiudi il menu" : "Apri il menu"}
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                >
                    <span className="hamburger_line" />
                    <span className="hamburger_line" />
                    <span className="hamburger_line" />
                </button>

                <nav
                    id="primary-navigation"
                    className={`items ${isMobileMenuOpen ? 'items_open' : ''}`}
                    aria-label="Navigazione principale"
                >
                    <div className="item">
                        <Link
                            to="/bike-heaven"
                            className={isActive('/bike-heaven') ? 'nav_link is_active' : 'nav_link'}
                            aria-current={isActive('/bike-heaven') ? 'page' : undefined}
                        >
                            Home
                        </Link>
                    </div>

                    <div className="item">
                        <Link
                            to="/shop"
                            className={isActive('/shop') ? 'nav_link is_active' : 'nav_link'}
                            aria-current={isActive('/shop') ? 'page' : undefined}
                        >
                            Shop
                        </Link>
                    </div>

                    <div className="textual_navbar">
                        <div className="item">
                            {isLoggedIn ? (
                                <button type="button" className="nav_link nav_link_button" onClick={handleLogout}>
                                    Log-out
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className={isActive('/login') ? 'nav_link is_active' : 'nav_link'}
                                    aria-current={isActive('/login') ? 'page' : undefined}
                                >
                                    Log-in
                                </Link>
                            )}
                        </div>

                        <div className="item">
                            <Link
                                to={isLoggedIn ? "/account" : "/login"}
                                className={isActive('/account') ? 'nav_link is_active' : 'nav_link'}
                                aria-current={isActive('/account') ? 'page' : undefined}
                            >
                                {isLoggedIn && user?.firstName ? user.firstName : "Account"}
                            </Link>
                        </div>

                        <div className="item">
                            <Link to={cartUrl} className="nav_link nav_link_cart" aria-label="Vai al carrello">
                                Cart
                                <span className="cart_icon" aria-hidden="true">🛒</span>
                            </Link>
                        </div>

                        <form className="item search_form" role="search" onSubmit={handleSearchSubmit}>
                            <label htmlFor="navbar-search" className="visually_hidden">
                                Cerca prodotti
                            </label>
                            <input
                                id="navbar-search"
                                type="search"
                                className="search_input"
                                placeholder="Cerca una bici, un componente..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="submit" className="search_submit" aria-label="Cerca">
                                <span aria-hidden="true">🔍</span>
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;

/*
    CHANGELOG — sintesi delle modifiche rispetto alla versione originale
    ----------------------------------------------------------------------
    1. BUG: <Link onClick={handleLogout}> senza prop `to` rimosso e
       sostituito con un vero <button> — Link richiede `to`, la versione
       originale poteva causare crash di render appena isLoggedIn=true.
       Probabile causa concreta dello "schermo bianco" segnalato.
    2. BUG: <a> annidato dentro <Link> sul Cart rimosso — produceva
       <a><a></a></a> nel DOM, HTML non valido e comportamento di click
       ambiguo per mouse/screen reader.
    3. BUG: window.location.reload() dopo la ricerca rimosso — forzava un
       hard reload della SPA (stato perso, flash bianco). La navigazione
       ora è gestita interamente da react-router.
    4. BUG: searchText ora passato con encodeURIComponent — query con
       spazi o caratteri speciali non rompono più l'URL/il routing.
    5. BUG: <a href="/" className="navbar_home_button"> sostituito con
       <Link to="/">, altrimenti forzava un reload completo della pagina
       invece di una navigazione client-side con HashRouter.
    6. Validazione scadenza JWT: jwtDecode decodifica anche un token
       scaduto senza errori; ora viene controllato `exp` e il token
       scaduto viene rimosso, evitando uno stato "loggato" fittizio.
    7. Token malformato gestito con try/catch invece di lasciare
       un'eccezione non gestita in useEffect.
    8. console.log con token in chiaro rimosso (anche per sicurezza: non
       si logga mai materiale sensibile in produzione).
    9. onKeyPress (deprecato) sostituito da una <form> con onSubmit:
       gestisce nativamente sia Enter che il click sul bottone di ricerca,
       più accessibile da tastiera.
    10. TextField di MUI sostituito con un <input> nativo + <label>
        associata correttamente: elimina una dipendenza pesante per un
        singolo campo e allinea lo stile al resto del design system CSS
        puro del progetto, come richiesto dai vincoli.
    11. Rimossi gli <h1> multipli sui singoli link di navigazione — grave
        errore SEO/semantico (una pagina deve avere un solo <h1>, che
        deve stare nel contenuto, non nella navbar).
    12. Aggiunto aria-current="page" sul link della rotta attiva e classe
        is_active per l'indicatore visivo.
    13. Aggiunto menu mobile con hamburger, stato isMobileMenuOpen,
        chiusura automatica ad ogni cambio rotta.
    14. Navbar che si "solidifica" leggermente allo scroll (isScrolled)
        per restare leggibile anche su pagine senza hero scuro sotto.
    15. Account ora mostra il nome utente se disponibile nel token
        decodificato, piccolo tocco di personalizzazione.
*/