// PasswordResetModal.js
import React, { useState } from 'react';
import { resetPassword } from '../../apiService';


const PasswordResetModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            // Logique pour fermer le modal et/ou afficher un message de succès
            onClose();
        } catch (error) {
            console.log(error);
            setError("Email non trouvé ou erreur de serveur.");
        }
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* ... */}
                <form onSubmit={handlePasswordReset}>
                    {/* Email input */}
                    <div className="input-group">
                        <label>Adresse e-mail</label>
                        <input type="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    {/* Submit button */}
                    <div className="actions">
                        <button type="submit" className="btn-login">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default PasswordResetModal;
