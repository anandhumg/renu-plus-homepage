"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DynamicCTAButtonProps {
    defaultText: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function DynamicCTAButton({ defaultText, className, onClick }: DynamicCTAButtonProps) {
    const { isAuthenticated, user, loading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    console.log(user, "user")
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            onClick();
        }
    };

    // Before hydration, render the default text to match SSR
    if (!mounted || loading) {
        return (
            <Link href="/subscribe" className={className} onClick={handleClick}>
                {defaultText}
            </Link>
        );
    }

    if (isAuthenticated) {
        if (user?.subscriptions && user.subscriptions.length > 0 && user.subscriptions[0].status === "ACTIVE") {
            return (
                <Link href="/profile?tab=renu" className={className} onClick={handleClick}>
                    View Renu+
                </Link>
            );
        } else {
            return (
                <Link href="/subscribe" className={className} onClick={handleClick}>
                    {defaultText}
                </Link>
            );
        }
    }

    // Not authenticated
    return (
        <Link href="/subscribe" className={className} onClick={handleClick}>
            {defaultText}
        </Link>
    );
}
