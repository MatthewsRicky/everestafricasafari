import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function WhatsAppButton() {
  if (!WHATSAPP_NUMBER) return null;

  const message = encodeURIComponent(
    "Hello, I would like to enquire about planning an African safari.",
  );

  const href = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-forest text-white shadow-xl transition hover:scale-105 hover:bg-forest-deep focus-visible:outline-offset-4"
    >
      <MessageCircle size={25} />
    </a>
  );
}
