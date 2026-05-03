// src/services/profile.service.ts
import api from '../lib/api';

export interface ProfileUpdateData {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    profilePicture?: string;
}

export const updateProfile = async (profileData: ProfileUpdateData): Promise<any> => {
    try {
        const response = await api.put<{ success: boolean, data: any }>('/users/profile', profileData);

        if (!response.data.success) {
            throw new Error('Failed to update profile on the server');
        }
        return response.data.data;
    } catch (error) {
        console.error('Error updating profile on backend:', error);
        throw error;
    }
};

/**
 * Converts a File object to a base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
