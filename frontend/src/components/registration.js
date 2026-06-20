/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it

    Refactor UX/UI/A11y/Performance — vedi changelog in fondo al file.
*/
import React, { useState } from 'react';
import "./style/registration.css";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigate, Link } from 'react-router-dom';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Registration() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const formattedBirthDate = birthDate ? birthDate.format("YYYY-MM-DD") : '';

    function validate() {
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "Il nome è obbligatorio.";
        if (!lastName.trim()) newErrors.lastName = "Il cognome è obbligatorio.";

        if (!birthDate) {
            newErrors.birthDate = "Inserisci la data di nascita.";
        } else if (birthDate.isAfter(new Date())) {
            newErrors.birthDate = "La data di nascita non può essere nel futuro.";
        }

        if (!email.trim()) {
            newErrors.email = "L'email è obbligatoria.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Inserisci un indirizzo email valido.";
        }

        if (!phone) newErrors.phone = "Inserisci un numero di telefono.";
        if (!address.trim()) newErrors.address = "L'indirizzo è obbligatorio.";
        if (!username.trim()) newErrors.username = "Lo username è obbligatorio.";

        if (!password) {
            newErrors.password = "La password è obbligatoria.";
        } else if (password.length < 8) {
            newErrors.password = "La password deve avere almeno 8 caratteri.";
        }

        return newErrors;
    }

    async function handleForm(event) {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setFormError("Controlla i campi evidenziati prima di continuare.");
            return;
        }

        setFormError('');
        setSubmitting(true);

        const userData = {
            firstName,
            lastName,
            birthDate: formattedBirthDate,
            email,
            phone,
            address,
            username,
            password
        };

        try {
            // NOTA: il path era relativo (/api/register) mentre login.js usa
            // l'URL assoluto del backend (bike-heaven.onrender.com). Se il
            // frontend non è servito dallo stesso dominio del backend, un
            // path relativo punta al dominio sbagliato e la richiesta
            // fallisce sempre. Allineato all'URL assoluto per coerenza —
            // verifica che corrisponda al tuo endpoint reale.
            const response = await fetch("https://bike-heaven.onrender.com/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                // Niente window.location.reload(): interrompeva
                // l'esecuzione prima che navigate('/') venisse mai
                // chiamato, lasciando l'utente bloccato su /register
                // anche dopo una registrazione riuscita.
                navigate('/');
            } else {
                setFormError(data.message || "Registrazione non riuscita. Controlla i dati inseriti.");
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
        <div className="registration_page">
            <div className="registration_container">
                <h1 className="registration_title">Registration</h1>

                <p className="login_string">
                    Already have an account?{' '}
                    <Link className="inline_link" to="/login">Click here to Sign-in</Link>
                </p>

                <form className="registration_form" onSubmit={handleForm} noValidate>

                    <p className="form_section_label">Dati personali</p>

                    <div className="form_row">
                        <div className="form_field">
                            <label htmlFor="regFirstName">Name</label>
                            <input
                                id="regFirstName"
                                type="text"
                                autoComplete="given-name"
                                value={firstName}
                                aria-invalid={!!errors.firstName}
                                aria-describedby={errors.firstName ? "regFirstName-error" : undefined}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && (
                                <span className="field_error" id="regFirstName-error">{errors.firstName}</span>
                            )}
                        </div>

                        <div className="form_field">
                            <label htmlFor="regLastName">Surname</label>
                            <input
                                id="regLastName"
                                type="text"
                                autoComplete="family-name"
                                value={lastName}
                                aria-invalid={!!errors.lastName}
                                aria-describedby={errors.lastName ? "regLastName-error" : undefined}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && (
                                <span className="field_error" id="regLastName-error">{errors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className="form_row">
                        <div className="form_field">
                            <label htmlFor="regBirthDate">Date of Birth</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                    id="regBirthDate"
                                    className="date_field"
                                    format="YYYY-MM-DD"
                                    onChange={(newValue) => setBirthDate(newValue)}
                                    slotProps={{
                                        textField: {
                                            'aria-invalid': !!errors.birthDate,
                                            'aria-describedby': errors.birthDate ? "regBirthDate-error" : undefined
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                            {errors.birthDate && (
                                <span className="field_error" id="regBirthDate-error">{errors.birthDate}</span>
                            )}
                        </div>

                        <div className="form_field">
                            <label htmlFor="regPhone">Phone Number</label>
                            <PhoneInput
                                id="regPhone"
                                placeholder="Enter phone number"
                                className="phone_field"
                                value={phone}
                                onChange={(newValue) => setPhone(newValue)}
                            />
                            {errors.phone && (
                                <span className="field_error" id="regPhone-error">{errors.phone}</span>
                            )}
                        </div>
                    </div>

                    <div className="form_field">
                        <label htmlFor="regEmail">E-mail</label>
                        <input
                            id="regEmail"
                            type="email"
                            autoComplete="email"
                            value={email}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "regEmail-error" : undefined}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <span className="field_error" id="regEmail-error">{errors.email}</span>
                        )}
                    </div>

                    <div className="form_field">
                        <label htmlFor="regAddress">Address</label>
                        <input
                            id="regAddress"
                            type="text"
                            autoComplete="street-address"
                            value={address}
                            aria-invalid={!!errors.address}
                            aria-describedby={errors.address ? "regAddress-error" : undefined}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && (
                            <span className="field_error" id="regAddress-error">{errors.address}</span>
                        )}
                    </div>

                    <p className="form_section_label">Account</p>

                    <div className="form_row">
                        <div className="form_field">
                            <label htmlFor="regUsername">Username</label>
                            <input
                                id="regUsername"
                                type="text"
                                autoComplete="username"
                                value={username}
                                aria-invalid={!!errors.username}
                                aria-describedby={errors.username ? "regUsername-error" : undefined}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && (
                                <span className="field_error" id="regUsername-error">{errors.username}</span>
                            )}
                        </div>

                        <div className="form_field">
                            <label htmlFor="regPassword">Password</label>
                            <input
                                id="regPassword"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "regPassword-error" : undefined}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <span className="field_error" id="regPassword-error">{errors.password}</span>
                            )}
                        </div>
                    </div>

                    {formError && (
                        <p className="form_error_global" role="alert">{formError}</p>
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
                            id="registration"
                            disabled={submitting}
                            aria-busy={submitting}
                        >
                            {submitting ? "Registrazione in corso..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;

/*
    CHANGELOG — sintesi delle modifiche rispetto alla versione originale
    ----------------------------------------------------------------------
    1. BUG PRINCIPALE: handleSuccessfulRegistration chiamava
       window.location.reload() PRIMA di alert() e navigate('/') —
       identico al bug già corretto in Login.js. Un reload interrompe
       l'esecuzione JS, quindi dopo una registrazione riuscita l'utente
       restava bloccato su /register invece di essere reindirizzato.
       Rimosso il reload, mantenuto solo navigate('/').
    2. BUG: il blocco .catch(error => {}) era vuoto — un errore di rete
       non dava alcun feedback. Ora un errore di fetch imposta un
       messaggio leggibile in pagina.
    3. BUG: tutti gli 8 <TextField> di MUI condividevano lo stesso
       id="outlined-basic" — ID duplicati nel DOM su scala ancora
       maggiore rispetto a Login.js, HTML non valido, associazione
       label/input rotta per l'intero form. Sostituiti con <input>
       nativi con id univoci e <label htmlFor> corrette per i campi di
       testo semplice (nome, cognome, email, indirizzo, username,
       password). Mantenuti DateField (date di nascita) e PhoneInput
       (telefono) come componenti dedicati, dove una libreria
       specializzata offre validazione/formattazione che l'HTML nativo
       non replica altrettanto bene.
    4. BUG: il link "Click here to Sign-in" era un <a href="/login">
       nativo — con HashRouter forzava un reload completo della pagina.
       Sostituito con <Link> di react-router (stesso fix già applicato
       a NavBar e Login).
    5. BUG: il fetch usava un path relativo (/api/register), mentre
       login.js usa l'URL assoluto del backend
       (bike-heaven.onrender.com). Path relativi puntano al dominio del
       frontend, non del backend, se i due non coincidono: la
       registrazione avrebbe potuto fallire sempre silenziosamente.
       Allineato all'URL assoluto per coerenza (verifica che corrisponda
       al tuo endpoint reale).
    6. Aggiunta validazione client-side completa: campi obbligatori,
       formato email, data di nascita non nel futuro, password minimo
       8 caratteri — assente nell'originale, la richiesta partiva anche
       con form completamente vuoto.
    7. Aggiunto stato "submitting" con bottone disabilitato durante
       l'invio, prevenendo doppi submit — assente nell'originale.
    8. alert("Attention: registration failed") sostituito con messaggio
       in pagina (role="alert"), non blocca il thread ed è coerente col
       resto del sito.
    9. console.log di debug rimosso.
    10. handleForm rinominata da HandleForm (PascalCase, incoerente)
        per coerenza con la convenzione camelCase del progetto.
    11. Form riorganizzato in righe a due colonne (Nome/Cognome,
        Data di nascita/Telefono, Username/Password) con due
        sottosezioni "Dati personali"/"Account": riduce drasticamente
        la percezione di lunghezza del form, che nell'originale era una
        singola colonna di 8 campi con margini molto ampi tra loro.
*/