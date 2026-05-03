// src/services/subscription.service.ts
import api from '../lib/api';
import { 
    Subscription, 
    SubscriptionPlan, 
    ApiResponse, 
    StripePaymentSheetResponse, 
    StripeConfirmResponse,
    Payment
} from '../types';

export const getCurrentSubscription = async (): Promise<Subscription | null> => {
    try {
        const response = await api.get<{ success: boolean; data: Subscription }>('/subscriptions/current');
        return response.data.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    const response = await api.get<{ success: boolean; data: SubscriptionPlan[] }>('/subscription-plans');
    return response.data.data;
};

// Stripe Integration (Web)
export const createStripePaymentIntent = async (planId: string, province: string = 'ON'): Promise<StripePaymentSheetResponse> => {
    const response = await api.post<ApiResponse<StripePaymentSheetResponse>>('/payments/create-order', { 
        planId, 
        province, 
        provider: 'stripe' 
    });
    return response.data.data;
};

export const confirmStripePayment = async (paymentIntentId: string): Promise<StripeConfirmResponse> => {
    const response = await api.post<ApiResponse<StripeConfirmResponse>>('/payments/stripe/confirm', { 
        paymentIntentId 
    });
    return response.data.data;
};

export const getPaymentHistory = async (): Promise<Payment[]> => {
    const response = await api.get<{ success: boolean; data: Payment[] }>('/payments');
    return response.data.data;
};

export const getHomeSummary = async () => {
    const response = await api.get<{
        status: string;
        data: any;
    }>('/subscriptions/home-summary');
    return response.data.data;
};
