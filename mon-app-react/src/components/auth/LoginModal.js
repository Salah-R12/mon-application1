import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assurez-vous que le chemin d'importation est correct
import PasswordResetModal from './PasswordResetModal';
import { verifyUser } from '../../apiService';

const LoginModal = ({ toggleModal }) => {
    const { login } = useContext(AuthContext); // Utiliser le contexte d'authentification
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser les messages d'erreur précédents
        try {
            const user = await verifyUser(email, password);
            if (user) {
                login(user); // Utiliser la fonction de connexion fournie par AuthContext
                toggleModal();
            } else {
                setError('Utilisateur non trouvé ou mot de passe incorrect.');
            }
        } catch (error) {
            setError(error.message || 'Une erreur est survenue lors de la connexion.');
        }
    };

    const handlePasswordResetClick = () => {
        setShowPasswordReset(true);
    };

    return (
        <div className="modal-background" onClick={() => toggleModal()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Se connecter</h2>
                    <button onClick={() => toggleModal()}>Fermer</button>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <div className="actions">
                        <button type="submit" className="btn-login">Se connecter</button>
                        <button type="button" className="btn-link" onClick={handlePasswordResetClick}>
                            Mot de passe oublié ?
                        </button>
                    </div>
                </form>
            </div>
            {showPasswordReset && (
                <PasswordResetModal onClose={() => setShowPasswordReset(false)} />
            )}
        </div>
    );
};

export default LoginModal;
