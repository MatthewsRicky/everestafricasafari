import Hero from "@/components/home/Hero";
import SafariFinder from "@/components/home/SafariFinder";
import FeaturedSafaris from "@/components/home/FeaturedSafaris";
import PopularDestinations from "@/components/home/PopularDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import JourneyCards from "@/components/home/JourneyCards";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SafariFinder />
      <JourneyCards />
      <FeaturedSafaris />
      <PopularDestinations />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
