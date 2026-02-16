import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { setSentryUser, clearSentryUser } from '../sentry';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const response = await api.get('/auth/me');
                const userData = response.data.data;
                setUser(userData);
                setSentryUser(userData); // Track user in Sentry
            } catch (error) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                clearSentryUser();
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data.data;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setSentryUser(user); // Track user in Sentry
        return response.data;
    };

    const register = async (userData) => {
        const response = await api.post('/auth/register', userData);
        const { token, user } = response.data.data;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setSentryUser(user); // Track user in Sentry
        return response.data;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        clearSentryUser(); // Clear user from Sentry
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
