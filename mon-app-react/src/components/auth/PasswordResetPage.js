import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../apiService'; // Assurez-vous que cette fonction est correctement implémentée dans apiService

const PasswordResetPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams(); // Récupère le token depuis l'URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            await resetPassword(token, password);
            navigate('/');
        } catch (error) {
            setError("Erreur lors de la réinitialisation du mot de passe.");
        }
    };

    return (
        <div className="password-reset-page">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Nouveau mot de passe</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Confirmer le nouveau mot de passe</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Réinitialiser le mot de passe</button>
            </form>
        </div>
    );
};

export default PasswordResetPage;
