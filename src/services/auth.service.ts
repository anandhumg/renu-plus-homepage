// src/services/auth.service.ts
import api from '../lib/api';
import { RegisterData, AuthResponse } from '../types';

export const login = async (email: string, password: string): Promise<AuthResponse['data']> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse['data']> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data.data;
};

export const googleLogin = async (idToken: string): Promise<AuthResponse['data']> => {
    const response = await api.post<AuthResponse>('/auth/google-login', { idToken });
    return response.data.data;
};

export const appleLogin = async (identityToken: string, fullName?: { givenName: string, familyName: string }): Promise<AuthResponse['data']> => {
    const response = await api.post<AuthResponse>('/auth/apple-login', { identityToken, fullName });
    return response.data.data;
};

export const requestOtp = async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post<{ success: boolean; message: string }>('/auth/request-otp', { email });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', { email, otp });
    return response.data;
};

export const refreshTokens = async (refreshToken: string): Promise<AuthResponse['data']> => {
    const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response.data.data;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new CustomEvent('AUTH_LOGOUT'));
    }
};
