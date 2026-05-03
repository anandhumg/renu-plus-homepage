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
    ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as profileService from '@/services/profile.service';
import * as subscriptionService from '@/services/subscription.service';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function ProfilePage() {
    const { user, isAuthenticated, loading: authLoading, updateUser } = useAuth();
    const router = useRouter();
    const [subSummary, setSubSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, authLoading, router]);

    useEffect(() => {
        const fetchSummary = async () => {
            if (isAuthenticated) {
                try {
                    const data = await subscriptionService.getHomeSummary();
                    setSubSummary(data);
                } catch (error) {
                    console.error('Failed to fetch subscription summary', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchSummary();
    }, [isAuthenticated]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await profileService.fileToBase64(file);
            const updated = await profileService.updateProfile({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                profilePicture: base64
            });
            updateUser(updated);
            toast.success('Profile picture updated');
        } catch (error) {
            toast.error('Failed to upload image');
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 text-center"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                                {user?.profilePicture ? (
                                    <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon size={64} className="text-primary/40" />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white">
                                <Camera size={18} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <h2 className="text-2xl font-ppmori font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                        <p className="text-gray-500 mb-6">{user?.email}</p>
                        
                        <div className="space-y-4 text-left border-t border-gray-50 pt-6">
                            <div className="flex items-center space-x-3 text-gray-600">
                                <Phone size={18} className="text-primary" />
                                <span className="text-sm font-medium">{user?.phoneNumber || 'No phone number'}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600">
                                <MapPin size={18} className="text-primary" />
                                <span className="text-sm font-medium">{user?.address || 'No address set'}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Subscription Status Widget */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <CreditCard size={20} className="text-primary" />
                            <span>Membership Status</span>
                        </h3>
                        
                        {subSummary?.hasSubscription ? (
                            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                                <div className="flex items-center space-x-2 text-green-700 mb-1">
                                    <CheckCircle size={18} />
                                    <span className="font-bold uppercase tracking-wider text-xs">Active Member</span>
                                </div>
                                <p className="text-sm text-green-600">Valid until {new Date(subSummary.validTill).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                                    <div className="flex items-center space-x-2 text-red-700 mb-1">
                                        <XCircle size={18} />
                                        <span className="font-bold uppercase tracking-wider text-xs">No Active Plan</span>
                                    </div>
                                    <p className="text-sm text-red-600">Upgrade to access discounts</p>
                                </div>
                                <Link 
                                    href="/subscribe"
                                    className="w-full block text-center bg-primary text-white py-3 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                                >
                                    View Plans
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Digital ID / Content Area */}
                <div className="lg:col-span-2">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Digital Membership Card (Visual) */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-yellow-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-8 text-white overflow-hidden shadow-2xl min-h-[350px] flex flex-col justify-between">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
                                
                                <div className="flex justify-between items-start z-10">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-white p-2 rounded-xl">
                                            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                                        </div>
                                        <span className="text-xl font-ppmori font-bold tracking-widest uppercase">Digital Member ID</span>
                                    </div>
                                    {subSummary?.hasSubscription && (
                                        <div className="flex items-center space-x-1 bg-primary/20 text-primary px-4 py-1.5 rounded-full border border-primary/30">
                                            <Crown size={14} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Premium</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end justify-between z-10">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Member Name</p>
                                            <h4 className="text-2xl font-ppmori font-medium">{user?.firstName} {user?.lastName}</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Member ID</p>
                                                <p className="text-lg font-mono font-bold tracking-widest">{subSummary?.digitalId || '•••• •••• ••••'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Valid Thru</p>
                                                <p className="text-lg font-medium tracking-wider">{subSummary?.validTill ? new Date(subSummary.validTill).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }) : '••/••'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-3xl shadow-xl">
                                        <QRCodeSVG 
                                            value={subSummary?.digitalId || 'PENDING'} 
                                            size={80}
                                            fgColor="#1a1a1a"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Perks / Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-50">
                                <h4 className="font-bold text-gray-900 mb-4">Membership Perks</h4>
                                <div className="space-y-3">
                                    {subSummary?.perks?.length > 0 ? (
                                        subSummary.perks.map((perk: any, index: number) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                    <CheckCircle size={16} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{perk.title}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">No active perks. Upgrade your plan to see more.</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-50">
                                <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    <Link href="/#offers" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors group">
                                        <span className="text-sm font-bold text-gray-700">Explore Discounts</span>
                                        <ExternalLink size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                                    </Link>
                                    <Link href="/#how-it-works" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors group">
                                        <span className="text-sm font-bold text-gray-700">How to use ID</span>
                                        <ExternalLink size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
