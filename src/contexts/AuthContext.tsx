// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '../types';
import * as authService from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, otp: string) => Promise<void>;
    socialLogin: (provider: 'google' | 'apple', token: string, fullName?: any) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize session
        const initAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                
                if (storedUser && token) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.error('Failed to restore auth session', e);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Listen for auth events
        const handleUnauthorized = () => {
            logout();
        };

        const handleLogout = () => {
            setUser(null);
        };

        window.addEventListener('AUTH_UNAUTHORIZED', handleUnauthorized);
        window.addEventListener('AUTH_LOGOUT', handleLogout);

        return () => {
            window.removeEventListener('AUTH_UNAUTHORIZED', handleUnauthorized);
            window.removeEventListener('AUTH_LOGOUT', handleLogout);
        };
    }, []);

    const login = async (email: string, otp: string) => {
        const response = await authService.verifyOtp(email, otp);
        if (response.success) {
            const { user, accessToken, refreshToken } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } else {
            throw new Error(response.message || 'Login failed');
        }
    };

    const socialLogin = async (provider: 'google' | 'apple', token: string, fullName?: any) => {
        let data;
        if (provider === 'google') {
            data = await authService.googleLogin(token);
        } else {
            data = await authService.appleLogin(token, fullName);
        }

        if (data) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = (updatedUser: User) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            isAuthenticated: !!user, 
            login, 
            socialLogin, 
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
