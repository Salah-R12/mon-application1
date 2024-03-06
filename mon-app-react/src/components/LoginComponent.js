import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';
import userIcon from '../assets/login.svg';

const LoginComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleLoginModal = () => {
        setShowModal(!showModal);
        if (showPasswordReset) {
            setShowPasswordReset(false);
        }
    };

    const togglePasswordResetModal = () => {
        setShowModal(false);
        setShowPasswordReset(false);
    };
    // Pour fermer le menu déroulant si l'utilisateur clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        logout();
    };

    return (
        <div ref={dropdownRef}>
            {isAuthenticated && user ? (
                <div className="login-component" onClick={() => setShowDropdown(!showDropdown)}>
                    <img src={userIcon} alt="User" className="user-icon" />
                    <div className="login-texts">
                        <span className="login-upper-text">Hello, {user.email}</span>
                        <span className="login-lower-text">Commandes et Compte</span>
                    </div>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Se déconnecter</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="login-component" onClick={toggleLoginModal}>
                    <img src={userIcon} alt="User" className="user-icon" />
                    <div className="login-texts">
                        <span className="login-upper-text">conexion/inscription</span>
                        <span className="login-lower-text">Commandes et Compte</span>
                    </div>
                </div>
            )}
            {showModal && (
                <LoginModal
                    toggleModal={toggleLoginModal}// Suppose setUserEmail est la fonction pour mettre à jour l'email de l'utilisateur
                />
            )}
            {showPasswordReset && (
                <PasswordResetModal onClose={togglePasswordResetModal} />
            )}
        </div>
    );
};

export default LoginComponent;
