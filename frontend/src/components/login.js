/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React, { useState } from 'react';
import "./style/login.css";
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    function validate() {
        if (!username.trim()) return "Inserisci username o email.";
        if (!password) return "Inserisci la password.";
        return '';
    }

    async function handleForm(event) {
        event.preventDefault();

        const validationError = validate();
        if (validationError) {
            setFormError(validationError);
            return;
        }

        setFormError('');
        setSubmitting(true);

        const userData = { username, password };

        try {
            const response = await fetch("https://bike-heaven.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                // Niente window.location.reload(): un reload qui
                // interrompeva l'esecuzione prima che navigate('/')
                // venisse mai chiamato, lasciando l'utente bloccato
                // sulla pagina di login anche dopo un accesso riuscito.
                navigate('/');
            } else {
                setFormError("Username/email o password non corretti.");
            }
        } catch (error) {
            // Il catch originale era vuoto: un errore di rete non dava
            // alcun feedback, il bottone sembrava semplicemente non
            // fare nulla.
            setFormError("Impossibile contattare il server. Riprova tra qualche istante.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="login_page">
            <div className="login_container">
                <h1 className="login_title">Log-in</h1>

                <p className="registration_string">
                    Don&apos;t you have an account?{' '}
                    <Link className="inline_link" to="/register">Click here to Sign Up</Link>
                </p>

                <form className="login_form" onSubmit={handleForm} noValidate>
                    <div className="form_field">
                        <label htmlFor="loginUsername">Username or E-mail</label>
                        <input
                            id="loginUsername"
                            type="text"
                            autoComplete="username"
                            value={username}
                            aria-invalid={!!formError}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form_field">
                        <label htmlFor="loginPassword">Password</label>
                        <div className="password_input_wrapper">
                            <input
                                id="loginPassword"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                aria-invalid={!!formError}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle_password_visibility"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-pressed={showPassword}
                                aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                            >
                                {showPassword ? "Nascondi" : "Mostra"}
                            </button>
                        </div>
                    </div>

                    {formError && (
                        <p className="form_error" role="alert">{formError}</p>
                    )}

                    <div className="cont3">
                        <button
                            type="button"
                            id="cancel"
                            onClick={() => navigate("/bike-heaven")}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id="login"
                            disabled={submitting}
                            aria-busy={submitting}
                        >
                            {submitting ? "Accesso in corso..." : "Log-in"}
                        </button>
                    </div>
                </form>

                <p className="registration_string">
                    Are you an employee?{' '}
                    <Link className="inline_link" to="/employeesLogin">Click here to Log-in</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

/*
    CHANGELOG — sintesi delle modifiche rispetto alla versione originale
    ----------------------------------------------------------------------
    1. BUG PRINCIPALE: handleSuccessfulLogin chiamava
       window.location.reload() PRIMA di alert() e navigate('/'). Un
       reload interrompe l'esecuzione JS immediatamente, quindi le due
       righe successive molto probabilmente non venivano mai eseguite:
       l'utente, dopo un login riuscito, si ritrovava ricaricato sulla
       stessa pagina /login invece di essere reindirizzato alla home.
       Rimosso il reload, mantenuto solo navigate('/').
    2. BUG: il blocco .catch(error => {}) era vuoto — un errore di rete
       non produceva alcun feedback visibile, il login sembrava non
       fare nulla. Ora un errore di fetch imposta un messaggio leggibile
       in pagina.
    3. alert("Attention: login failed") e alert("Welcome back!")
       sostituiti con messaggi in pagina (role="alert" per l'errore):
       non bloccano il thread, restano leggibili, coerenti col tono del
       resto del sito già rifatto.
    4. BUG: i due <TextField> di MUI condividevano lo stesso
       id="outlined-basic" — ID duplicati nel DOM, HTML non valido,
       associazione label/input rotta per gli screen reader. Sostituiti
       con <input> nativi con id univoci (loginUsername, loginPassword)
       e <label htmlFor> corrette.
    5. Form ora è una vera <form onSubmit={handleForm}>: supporta
       nativamente l'invio premendo Invio da tastiera, prima il login
       partiva solo via onClick sul bottone.
    6. Aggiunta validazione client-side minima (campi vuoti) con
       messaggio inline, prima la richiesta partiva comunque verso il
       server anche con campi vuoti.
    7. Aggiunto stato "submitting" con bottone disabilitato e testo
       "Accesso in corso...": previene doppi submit su rete lenta,
       assente nella versione originale.
    8. Link "Click here to Sign Up" / "Click here to Log-in" (employee)
       erano <a href="..."> nativi: con HashRouter forzavano un reload
       completo della pagina. Sostituiti con <Link> di react-router per
       una navigazione client-side fluida (stesso fix già applicato a
       NavBar).
    9. Aggiunto toggle "Mostra/Nascondi password" — funzionalità comune
       attesa su un form di login moderno, accessibile via
       aria-pressed/aria-label.
    10. console.log di debug rimosso.
    11. handleForm rinominata da HandleForm (PascalCase, incoerente)
        per allinearsi alla convenzione camelCase usata nel resto del
        progetto (handleLogout, handleSearchSubmit in NavBar).
    12. Rimossa la dipendenza da @mui/material/TextField per coerenza
        con la scelta già fatta in NavBar (input nativo + CSS puro del
        progetto, come richiesto dai vincoli).
*/