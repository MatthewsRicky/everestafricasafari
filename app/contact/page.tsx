import ContactDetails from "@/components/contact/ContactDetails";
import QuoteForm from "@/components/enquiry/QuoteForm";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import { Suspense } from "react";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Tell us where you want to go, and we’ll shape the rest."
        description="We’d love to hear about your dream safari, your preferred destinations and the kind of journey you want to have."
        image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section-padding bg-ivory">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Suspense>
            <ContactDetails />
            <QuoteForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
