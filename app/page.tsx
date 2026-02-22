import HeroSection from "@/components/home/HeroSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProducts />
        <DealOfTheDay />
        <WhyChooseUs />
        <Testimonials />
        <NewsletterSection />
      </main>
    </>
  );
}
