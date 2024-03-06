import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userCredentials) => {
        // Ici, connectez l'utilisateur et définissez les informations de l'utilisateur
        setUser(userCredentials);
    };

    const logout = () => {
        // Ici, déconnectez l'utilisateur et effacez les informations
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
