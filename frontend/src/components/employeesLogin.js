/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email: francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style/employeesLogin.css";

const EmployeesLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleForm(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch("https://bike-heaven.onrender.com/api/employeesLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate('/employees');
            } else {
                setError("Credenziali non valide. Riprova.");
            }
        } catch {
            setError("Errore di connessione. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="el_page">
            <div className="el_card">
                {/* Badge ruolo */}
                <span className="el_eyebrow">Portale dipendenti</span>

                <h1 className="el_title">Accesso riservato</h1>
                <p className="el_subtitle">Inserisci le credenziali aziendali per continuare.</p>

                <form className="el_form" onSubmit={handleForm} noValidate>
                    <div className="el_field">
                        <label htmlFor="el_username">Username o E-mail</label>
                        <input
                            id="el_username"
                            type="text"
                            autoComplete="username"
                            placeholder="es. mario.rossi"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="el_field">
                        <label htmlFor="el_password">Password</label>
                        <input
                            id="el_password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="el_error" role="alert">{error}</p>
                    )}

                    <div className="el_actions">
                        <button
                            type="button"
                            className="el_btn el_btn--ghost"
                            onClick={() => navigate("/")}
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="el_btn el_btn--primary"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? "Accesso…" : "Accedi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeesLogin;