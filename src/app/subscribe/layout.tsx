import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Join Renu Plus and start saving on essential purchases with our premium membership.",
  alternates: {
    canonical: "/subscribe",
  },
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
