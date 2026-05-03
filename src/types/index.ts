// src/types/index.ts

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    profilePicture?: string;
    hasActiveSubscription?: boolean;
}

export interface RegisterData {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    profilePicture?: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

export interface Subscription {
    id: string;
    userId: string;
    startDate: string;
    endDate: string;
    status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'PENDING';
    amount: number;
    currency: string;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    perks: MembershipPerk[];
    amount: number;
    currency: string;
    duration: string;
    isActive: boolean;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
}

export interface PayPalOrderResponse {
    orderId: string;
    approvalUrl: string;
    links: any[];
    total: number;
    currency: string;
}

export interface PayPalCaptureResponse {
    orderId: string;
    captureId: string;
    subscriptionId: string;
    status: string;
    paymentId: string;
}

export interface PaymentStatusResponse {
    status: 'CREATED' | 'CAPTURE_REQUESTED' | 'COMPLETED' | 'FAILED';
}

export interface DigitalId {
    id: string;
    uniqueIdNumber: string;
    status: 'active' | 'inactive';
    subscription: Subscription;
}

export interface Payment {
    id: string;
    date: string;
    amount: number;
    status: 'completed' | 'failed' | 'refunded';
    txId: string;
    receiptUrl: string;
}

export interface MembershipPerk {
    title: string;
    description: string;
    iconName: string;
}

export interface StripePaymentSheetResponse {
    clientSecret: string;
    paymentIntentId: string;
    customer?: string;
    ephemeralKey?: string;
    publishableKey?: string;
}

export interface StripeConfirmResponse {
    subscription: Subscription;
    digitalId: DigitalId;
}
