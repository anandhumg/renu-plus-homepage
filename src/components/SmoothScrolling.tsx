"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (pathname?.startsWith("/subscribe")) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      // We keep touch events native and smooth by using natural multipliers
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, [pathname]);

  // Reset scroll and recalculate document height on every route change
  useEffect(() => {
    if (lenisRef.current) {
      // Force scroll reset instantly so Lenis target matches Next.js restoration
      lenisRef.current.scrollTo(0, { immediate: true });
      
      // Let hydration and animations settle, then recalculate page heights
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}

