import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import InstagramGrid from "@/components/InstagramGrid";
import NewsletterSection from "@/components/NewsletterSection";
import YourNeedsSection from "@/components/YourNeedsSection";
import AreasWeServe from "@/components/AreasWeServe";
import heroImage from "@/assets/hero-care.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Caregiver supporting a person at home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container-narrow py-28 md:py-40 lg:py-48">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-3xl text-primary-foreground">
              A decade of person-centred care
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
              Supported living and domiciliary care for adults with learning disabilities, autism and mental health needs, across London and Cambridgeshire. Five homes, one team, and vacancies now — see inside before you decide.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/our-homes" className="px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
                Explore Our Services
              </Link>
              <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:bg-primary-foreground/10">
                Contact Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Your Needs */}
      <FadeIn>
        <div className="container-narrow pt-16 md:pt-20">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Your Needs</h2>
          <p className="text-center text-foreground/70 max-w-2xl mx-auto">
            We provide tailored care for people with learning disabilities, autism, and mental health needs.
          </p>
        </div>
      </FadeIn>
      <YourNeedsSection homepage />


      {/* Monthly Newsletter */}
      <NewsletterSection />

      {/* Instagram Feed */}
      <InstagramGrid />

      {/* Areas We Serve */}
      <AreasWeServe slim />
    </Layout>
  );
};

export default Index;
