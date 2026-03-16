import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Barış Çilak — available for backend development, AI integrations, and automation projects.",
};

export default function ContactPage() {
    return <ContactClient />;
}
