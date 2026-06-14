// src/app/profile/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
    User as UserIcon,
    CreditCard,
    CheckCircle,
    XCircle,
    Camera,
    Mail,
    MapPin,
    Phone,
    Calendar,
    Crown,
    ExternalLink,
    LogOut,
    HelpCircle,
    ChevronRight,
    ChevronDown,
    Shield,
    QrCode,
    Sparkles,
    Umbrella,
    Smartphone,
    FileText,
    Check,
    Store,
    X,
    ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as profileService from '@/services/profile.service';
import * as subscriptionService from '@/services/subscription.service';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';

export default function ProfilePage() {
    const { user, isAuthenticated, loading: authLoading, logout, updateUser } = useAuth();
    const router = useRouter();

    // Tab state
    const [activeTab, setActiveTab] = useState<'profile' | 'renu' | 'help'>('profile');

    // Subscription & page state
    const [subscription, setSubscription] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Edit profile state
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: ''
    });
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
    const [profilePictureSaving, setProfilePictureSaving] = useState(false);
    // Accordion states
    const [paymentMethodExpanded, setPaymentMethodExpanded] = useState(false);
    const [paymentHistoryExpanded, setPaymentHistoryExpanded] = useState(false);
    const [faqsExpanded, setFaqsExpanded] = useState(false);
    const [knowYourPerksModal, setKnowYourPerksModal] = useState(false);

    // Help tab form state
    const [feedbackSubject, setFeedbackSubject] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, authLoading, router]);

    // Fetch subscription data
    useEffect(() => {
        const fetchSubscriptionData = async () => {
            if (isAuthenticated) {
                try {
                    setLoading(true);
                    const subData = await subscriptionService.getCurrentSubscription();
                    setSubscription(subData);
                } catch (error) {
                    console.error('Failed to fetch subscription status', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchSubscriptionData();
    }, [isAuthenticated]);

    // Set form initial state on user load
    useEffect(() => {
        if (user) {
            setEditForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || ''
            });
        }
    }, [user]);

    // Handle avatar image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await profileService.fileToBase64(file);
            if (isEditing) {
                // If in edit mode, set local state only (like mobile)
                setSelectedImageBase64(base64);
                toast.success('Profile picture preview updated. Save changes to upload.');
            } else {
                // If not in edit mode, upload immediately
                const updated = await profileService.updateProfile({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    profilePicture: base64
                });
                updateUser(updated);
                toast.success('Profile picture updated successfully!');
            }
        } catch (error) {
            toast.error('Failed to process profile picture.');
        }
    };

    // Handle profile form save
    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editForm.firstName || !editForm.lastName) {
            return toast.error('First and Last names are required.');
        }

        try {
            setIsSavingProfile(true);
            const updated = await profileService.updateProfile({
                firstName: editForm.firstName,
                lastName: editForm.lastName,
                phoneNumber: editForm.phoneNumber,
                address: editForm.address,
                profilePicture: selectedImageBase64 || undefined
            });
            updateUser(updated);
            setIsEditing(false);
            setSelectedImageBase64(null);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile details.');
        } finally {
            setIsSavingProfile(false);
        }
    };

    // Handle feedback submit
    const handleSubmitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackSubject || !feedbackMessage) {
            return toast.error('Please fill in all fields.');
        }

        try {
            setIsSubmittingFeedback(true);
            // Simulate API request
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success('Thank you! Your feedback has been sent.');
            setFeedbackSubject('');
            setFeedbackMessage('');
        } catch (error) {
            toast.error('Failed to submit feedback.');
        } finally {
            setIsSubmittingFeedback(false);
        }
    };

    // Handle sign out
    const handleSignOut = () => {
        logout();
        toast.success('Signed out successfully.');
        router.push('/');
    };

    // Default perks fallback if API doesn't return any
    const defaultPerks = [
        {
            title: "Digital discount ID card",
            iconName: "card-outline",
            description: "Use your unique QR code to verify eligibility"
        },
        {
            title: "No manual verification",
            iconName: "call-outline",
            description: "No calls or approvals required"
        },
        {
            title: "Access to partner stores",
            iconName: "umbrella-outline",
            description: "Redeem discounts at participating retailers"
        },
        {
            title: "No more calls to your builder",
            iconName: "call-outline",
            description: "No more waiting. Just show your ID and save"
        }
    ];

    const getPerkIcon = (iconName: string) => {
        switch (iconName) {
            case 'card-outline':
                return <CreditCard size={18} />;
            case 'umbrella-outline':
                return <Umbrella size={18} />;
            case 'call-outline':
                return <Phone size={18} />;
            default:
                return <Sparkles size={18} />;
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '—';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    const isCloseToExpiration = () => {
        if (!subscription?.endDate) return false;
        const end = new Date(subscription.endDate);
        const now = new Date();
        const diffTime = Math.abs(end.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && end > now;
    };

    if (authLoading || (loading && !subscription)) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <p className="text-gray-500 font-medium text-sm">Loading your profile...</p>
                </div>
            </div>
        );
    }

    const hasActiveSubscription = subscription && subscription.status === 'ACTIVE';
    return (
        <div className="min-h-screen bg-white pt-32 pb-16 font-ppmori">
            {/* Top Golden-Brown Banner */}
            <div className="relative w-full border-b border-black/10 py-10 md:py-14 px-4 sm:px-6 lg:px-8">
                <Image src="/profile/img-1.webp" alt="Profile Banner" fill className="absolute top-0 left-0 w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#A87B49]/95 to-[#A87B49]/95"></div>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {/* Profile Picture Upload with Initial Fallback */}
                        <div className="relative w-24 h-24 rounded-full border-2 border-white/50 bg-[#F7F1ED] overflow-hidden shadow-lg shrink-0 flex items-center justify-center">
                            {selectedImageBase64 || user?.profilePicture ? (
                                <img src={selectedImageBase64 || user?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-head text-4xl font-bold uppercase select-none">
                                    {user?.firstName ? user.firstName[0] : 'U'}
                                </span>
                            )}
                            <label className="absolute bottom-0 left-1/2 translate-x-[-50%] w-full h-7 hover:h-full text-head flex items-center justify-center cursor-pointer hover:scale-105 
                            transition-all duration-300 shadow-md border bg-[#D8CFC9] hover:bg-white border-white">
                                <Camera size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>

                        {/* Name and Email */}
                        <div className="space-y-1 z-10">
                            <h1 className="text-2xl md:text-[28px] font-ppmori-semibold text-white tracking-tight leading-none">
                                Hi {user?.firstName || 'User'}
                            </h1>
                            <p className="text-white text-sm font-ppmori">{user?.email}</p>
                        </div>
                    </div>

                    {/* RP Member Status Badge */}
                    <div className="shrink-0">
                        <div className="bg-white px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 border border-gray-100 max-w-fit select-none">
                            <span className="font-bold tracking-widest text-[#030712] text-xs">RP</span>
                            <span className="font-bold tracking-widest text-primary text-xs uppercase">
                                {hasActiveSubscription ? 'RENU PLUS MEMBER' : 'MEMBER'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Body Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Sidebar Tab Navigation */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-between h-full min-h-[350px]">
                        <div className="space-y-2">
                            {/* Profile Tab Link */}
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-ppmori-semibold transition-all cursor-pointer border ${activeTab === 'profile'
                                    ? 'bg-[#F7F4EB] text-head border-[#DACCBA]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 border-white'
                                    }`}
                            >
                                <UserIcon size={18} className={activeTab === 'profile' ? 'text-[#7C5D48]' : 'text-gray-400'} />
                                <span>Profile</span>
                            </button>

                            {/* Renu+ Tab Link */}
                            <button
                                onClick={() => setActiveTab('renu')}
                                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-ppmori-semibold transition-all cursor-pointer border ${activeTab === 'renu'
                                    ? 'bg-[#F7F4EB] text-head border-[#DACCBA]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 border-white'
                                    }`}
                            >
                                <CreditCard size={18} className={activeTab === 'renu' ? 'text-[#7C5D48]' : 'text-gray-400'} />
                                <span>Renu+</span>
                            </button>

                            {/* Help & Feedback Tab Link */}
                            <button
                                onClick={() => setActiveTab('help')}
                                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-ppmori-semibold transition-all cursor-pointer border ${activeTab === 'help'
                                    ? 'bg-[#F7F4EB] text-head border-[#DACCBA]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 border-white'
                                    }`}
                            >
                                <HelpCircle size={18} className={activeTab === 'help' ? 'text-[#7C5D48]' : 'text-gray-400'} />
                                <span>Help and Feedback</span>
                            </button>
                        </div>

                        {/* Sign Out Button at the bottom */}
                        <div className="mt-12 md:mt-24">
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-ppmori-semibold text-gray-500 hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer border border-transparent hover:border-red-100"
                            >
                                <LogOut size={18} className="text-gray-400 group-hover:text-red-600" />
                                <span>Sign out</span>
                            </button>
                        </div>
                    </div>

                    {/* Right View content panel (Separated by vertical border) */}
                    <div className="md:col-span-8 lg:col-span-9 md:border-l md:border-gray-200 md:pl-8 lg:pl-12 min-h-[450px]">
                        <AnimatePresence mode="wait">
                            {/* Profile View */}
                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-3xl font-ppmori-semibold text-gray-900">Profile</h2>
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="text-[#7C5D48] hover:text-[#5d4434] text-sm font-ppmori-semibold underline cursor-pointer"
                                            >
                                                Edit Info
                                            </button>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <form onSubmit={handleSaveProfile} className="space-y-5 max-w-xl">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">First name</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.firstName}
                                                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Last name</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.lastName}
                                                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-3 pt-3">
                                                <button
                                                    type="submit"
                                                    disabled={isSavingProfile}
                                                    className="bg-[#7C5D48] hover:bg-[#5d4434] text-white px-5 py-2.5 rounded-xl text-sm font-ppmori-semibold transition-colors disabled:opacity-75 flex items-center gap-2 cursor-pointer"
                                                >
                                                    {isSavingProfile ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setSelectedImageBase64(null);
                                                        setEditForm({
                                                            firstName: user?.firstName || '',
                                                            lastName: user?.lastName || '',
                                                            phoneNumber: user?.phoneNumber || '',
                                                            address: user?.address || ''
                                                        });
                                                    }}
                                                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-ppmori-semibold transition-colors cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* First Name Field */}
                                            <div className="border-b border-gray-200/60 pb-4">
                                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">First name</p>
                                                <p className="text-sm font-medium text-gray-500 mt-1.5">{user?.firstName || '—'}</p>
                                            </div>

                                            {/* Last Name Field */}
                                            <div className="border-b border-gray-200/60 pb-4">
                                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Last name</p>
                                                <p className="text-sm font-medium text-gray-500 mt-1.5">{user?.lastName || '—'}</p>
                                            </div>

                                            {/* Email Field */}
                                            <div className="border-b border-gray-200/60 pb-4">
                                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Email</p>
                                                <p className="text-sm font-medium text-gray-500 mt-1.5">{user?.email || '—'}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Renu+ Subscription View */}
                            {activeTab === 'renu' && (
                                <motion.div
                                    key="renu-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6 max-w-xl"
                                >
                                    <h2 className="text-3xl font-ppmori-semibold text-gray-900">Your Renu+ Subscription</h2>

                                    {hasActiveSubscription ? (
                                        <div className="space-y-6 w-[735px]">
                                            {/* Main Card */}
                                            <div className="rounded-2xl overflow-hidden border border-[#DACCBA] shadow-sm relative ">
                                                {/* Card Header (Logo + Badge) */}
                                                <div className="flex justify-between h-[188px] p-6 border-b border-gray-100">
                                                    <div className="h-full flex items-center">
                                                        <div className="relative w-31 h-31 rounded-full border-2 border-white/50 bg-[#F7F1ED] overflow-hidden shadow-lg shrink-0 flex items-center justify-center">
                                                            {selectedImageBase64 || user?.profilePicture ? (
                                                                <img src={selectedImageBase64 || user?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-head text-5xl font-bold uppercase select-none">
                                                                    {user?.firstName ? user.firstName[0] : ''}
                                                                </span>
                                                            )}
                                                            <label className="absolute bottom-0 left-1/2 translate-x-[-50%] w-full h-7 hover:h-full text-head flex items-center justify-center cursor-pointer hover:scale-105 
                                                                 transition-all duration-300 shadow-md border bg-[#D8CFC9] hover:bg-white border-white">
                                                                <Camera size={20} />
                                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className={`px-3 py-1.5 h-fit leading-none rounded-full text-[16px] font-ppmori-semibold text-white ${isCloseToExpiration() ? 'bg-[#FF6B35]' : 'bg-[#10B981]'
                                                        }`}>
                                                        {isCloseToExpiration() ? 'Expiring soon' : 'Active'}
                                                    </div>
                                                </div>

                                                {/* Card Details (Beige to white gradient background) */}
                                                <div className="px-8 bg-linear-to-t from-[#FCF7F2] to-white via-white text-[16px] flex flex-col">
                                                    <div className="flex justify-between border-b border-[#E5E7EB] py-5">
                                                        <span className="font-ppmori text-sub-foreground">Name:</span>
                                                        <span className="font-ppmori-semibold text-foreground">
                                                            {user?.firstName + ' ' + user?.lastName || ''}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between  border-b border-[#E5E7EB] py-5">
                                                        <span className="font-ppmori text-sub-foreground">Membership ID:</span>
                                                        <span className="font-ppmori-semibold text-foreground">
                                                            {subscription.uniqueIdNumber || ''}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between  border-b border-[#E5E7EB] py-5">
                                                        <span className="font-ppmori text-sub-foreground">Purchased on:</span>
                                                        <span className="font-ppmori-semibold text-foreground">
                                                            {subscription.startDate ? formatDate(subscription.startDate) : '—'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between  border-b border-[#E5E7EB] py-5">
                                                        <span className="font-ppmori text-sub-foreground">Price:</span>
                                                        <span className="font-ppmori-semibold text-foreground">
                                                            ${subscription.amount ? parseFloat(subscription.amount).toFixed(2) : '129.00'} / year
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between py-5">
                                                        <span className="font-ppmori text-sub-foreground">Expires on:</span>
                                                        <span className="font-ppmori-semibold text-foreground">
                                                            {subscription.endDate ? formatDate(subscription.endDate) : '—'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Know your Perks */}

                                            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in slide-in-from-top-1 duration-200">
                                                <div className="space-y-1">
                                                    <h3 className="text-2xl font-ppmori-semibold text-foreground border-b border-[#E7DBCB] pb-6">Membership perks</h3>
                                                    <p className="text-[16px] text-sub-foreground mt-6">
                                                        No more calls to your builder. No more waiting, just show your ID and save.
                                                    </p>
                                                </div>

                                                <div className="space-y-10 mt-9.5">
                                                    {(subscription.perks && subscription.perks.length > 0 ? subscription.perks : defaultPerks).map((perk: any, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-start gap-4"
                                                        >
                                                            <div className="w-8 h-8 bg-[#F3E8D0] text-head font-bold rounded-full flex items-center justify-center flex-shrink-0">
                                                                {getPerkIcon(perk.iconName)}
                                                            </div>
                                                            <div className="space-y-3 flex-1">
                                                                <h4 className="font-ppmori-semibold text-[16px] text-foreground leading-none">{perk.title}</h4>
                                                                <p className="text-sm font-ppmori text-sub-foreground leading-none">{perk.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* View Payment History Button Card */}
                                            <div>
                                                <button
                                                    onClick={() => setPaymentHistoryExpanded(!paymentHistoryExpanded)}
                                                    className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50/50 transition-all cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 rounded-full bg-[#F3E8D0] text-head flex items-center justify-center shrink-0">
                                                            <FileText size={18} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[16px] font-ppmori-semibold text-foreground">View payment history</span>
                                                            <span className="text-[12px] text-sub-foreground mt-0.5">Check billing transactions and receipts</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight
                                                        size={20}
                                                        className={`text-gray-500 transition-transform ${paymentHistoryExpanded ? 'rotate-90' : ''}`}
                                                    />
                                                </button>

                                                {/* Expandable Payment History Details */}
                                                {paymentHistoryExpanded && (
                                                    <div className="mt-2 p-4 bg-gray-50/55 rounded-2xl border border-gray-100/60 text-xs text-gray-600 space-y-3 animate-in slide-in-from-top-1 duration-200">
                                                        {subscription.payments && subscription.payments.length > 0 ? (
                                                            subscription.payments.map((pm: any, pIdx: number) => (
                                                                <div
                                                                    key={pIdx}
                                                                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 gap-2"
                                                                >
                                                                    <div className='space-y-1'>
                                                                        <p className="font-ppmori-semibold text-[16px] text-foreground">
                                                                            Annual Subscription Payment
                                                                        </p>
                                                                        <p className="text-[12px] text-sub-foreground">
                                                                            ID: {pm.id || 'N/A'}
                                                                        </p>
                                                                        <p className="text-[12px] text-sub-foreground">
                                                                            {pm.createdat ? formatDate(pm.createdat) : '—'}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                                                                        <div className="text-right space-y-1">
                                                                            <span className="bg-green-50 text-green-700 px-3 pt-1 leading-none w-fit h-fit rounded-full text-[10px] font-ppmori uppercase border border-green-100">
                                                                                {pm.status || 'COMPLETED'}
                                                                            </span>
                                                                            <p className="font-ppmori-semibold text-foreground mt-1">
                                                                                ${pm.amount} {pm.currency || 'CAD'}
                                                                            </p>
                                                                            <p className="text-[12px] text-sub-foreground">
                                                                                Includes ${pm.taxAmount || '0.00'} tax ({pm.province || 'ON'})
                                                                            </p>
                                                                            {pm.receiptUrl && (
                                                                                <a
                                                                                    href={pm.receiptUrl}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="text-[#7C5D48] hover:text-[#5d4434] p-1 rounded hover:bg-gray-100 transition-colors"
                                                                                    title="View Receipt PDF"
                                                                                >
                                                                                    <ExternalLink size={12} />
                                                                                </a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-center py-2 text-gray-400 italic">
                                                                No payment records found.
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>


                                            {/* Get the Renu+ App Button Card */}
                                            <div className="mt-2 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-1 duration-200">
                                                <div className="flex-1 text-left">
                                                    <h4 className="font-ppmori-semibold text-2xl text-foreground">Get More From Your Membership</h4>
                                                    <p className="text-[16px] text-sub-foreground max-w-[480px] mt-5">
                                                        The Renu+ app puts your membership card, partner offers, exclusive benefits, and account information right in your pocket.
                                                    </p>
                                                    <Link
                                                        href="/#app-promotion"
                                                        className="inline-block mt-8 bg-primary hover:bg-[#9c7b00] text-white font-bold py-3 px-6 leading-none rounded-full text-[18px] font-ppmori-semibold transition-colors cursor-pointer"
                                                    >
                                                        Get the Renu+ app
                                                    </Link>
                                                </div>
                                                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center bg-yellow-50 rounded-2xl p-1">
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Inactive Subscription State / Upgrade Call to Action */
                                        <div className="space-y-6">
                                            {/* Inactive Membership Card Preview */}
                                            <div className="relative overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl p-8 shadow-sm border border-gray-300/40 flex flex-col justify-between min-h-[200px] text-gray-600">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-full bg-gray-400/30 flex items-center justify-center flex-shrink-0">
                                                            <UserIcon size={28} className="text-gray-500" />
                                                        </div>
                                                        <div>
                                                            <span className="font-bold tracking-widest text-gray-500 text-xs">RP</span>
                                                            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
                                                                INACTIVE MEMBER CARD
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="bg-gray-400/40 text-gray-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                        Inactive
                                                    </span>
                                                </div>
                                                <div className="text-sm font-medium mt-6">
                                                    No active Renu+ subscription found for {user?.firstName} {user?.lastName}.
                                                </div>
                                            </div>

                                            {/* Beautiful CTA Promo Container */}
                                            <div className="bg-[#f6f0e5] rounded-4xl p-6 md:p-8 border border-[#7C5D48]/10 text-center space-y-4">
                                                <Crown size={36} className="text-primary mx-auto animate-bounce" />
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-ppmori-semibold text-gray-900">
                                                        Unlock Premium Renu+ Benefits
                                                    </h3>
                                                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                                                        Join Renu+ to instantly get access to your digital discount ID card, partner store offers, and exclusive builder savings.
                                                    </p>
                                                </div>
                                                <div className="pt-2">
                                                    <Link
                                                        href="/subscribe"
                                                        className="inline-block bg-[#B68F00] hover:bg-[#9c7b00] text-white font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-widest transition-colors shadow-md shadow-[#B68F00]/10 hover:scale-[1.01] transition-transform cursor-pointer"
                                                    >
                                                        Subscribe Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Help & Feedback View */}
                            {activeTab === 'help' && (
                                <motion.div
                                    key="help-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-3xl font-ppmori-semibold text-gray-900">Help and Feedback</h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            We're here to help! Send us your inquiries, bug reports, or feature requests.
                                        </p>
                                    </div>

                                    {/* Quick Contact Info cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Support</p>
                                            <p className="text-sm font-bold text-[#7C5D48]">support@renuplus.ca</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Average response time: &lt; 24 Hours</p>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Billing Help</p>
                                            <p className="text-sm font-bold text-[#7C5D48]">billing@renuplus.ca</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Direct support for receipt or card updates</p>
                                        </div>
                                    </div>

                                    {/* Submit Feedback form */}
                                    <form onSubmit={handleSubmitFeedback} className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm space-y-5 max-w-xl">
                                        <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">Send Support Request</h3>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Subject</label>
                                            <input
                                                type="text"
                                                value={feedbackSubject}
                                                onChange={(e) => setFeedbackSubject(e.target.value)}
                                                className="w-full px-4 py-3 bg-[#F9F6F4] border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                                placeholder="e.g. Question about my QR Code"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Message</label>
                                            <textarea
                                                rows={5}
                                                value={feedbackMessage}
                                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                                className="w-full px-4 py-3 bg-[#F9F6F4] border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                                                placeholder="Explain your request or issue in detail..."
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmittingFeedback}
                                            className="bg-[#7C5D48] hover:bg-[#5d4434] text-white px-6 py-3 rounded-xl text-sm font-ppmori-semibold transition-colors disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {isSubmittingFeedback ? 'Sending...' : 'Submit Support Request'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

        </div>
    );
}
