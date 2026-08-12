import ContactForm from "@/components/contact-us/ContactForm";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with the Renu Plus support team. We are here to answer your questions about savings, memberships, and partner retailers.",
    alternates: {
        canonical: "/contact-us",
    },
};

export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-white">
            <ContactForm />
        </main>
    );
}
