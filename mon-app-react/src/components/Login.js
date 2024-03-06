import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Adresse e-mail invalide.');
            return;
        }

        if (password.length < 10 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            setError('Le mot de passe doit contenir au moins 10 caractères, une majuscule et un chiffre.');
            return;
        }

        setError('');
    };

    const handleForgotPassword = () => {
        // Rediriger vers la page de réinitialisation du mot de passe
        navigate('/forgot-password');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                {error && <div className="login-error">{error}</div>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Identifiant ou e-mail"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                />
                <button type="submit" className="login-button">SE CONNECTER</button>
                <a onClick={handleForgotPassword} className="forgot-password-link">
                    Mot de passe oublié ?
                </a>
            </form>
        </div>
    );
}

export default Login;
