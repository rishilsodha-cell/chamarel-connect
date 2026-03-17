import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import YourNeedsSection from "@/components/YourNeedsSection";

const YourNeeds = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Your Needs</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            At Chamarel Healthcare, we offer care and support to people with a range of needs. Whether you have a learning disability, autism, or mental health challenges, our expert teams tailor their support to meet your individual goals, preferences and values.
          </p>
        </FadeIn>
      </div>
    </section>

    <YourNeedsSection />

    <section className="section-padding bg-secondary">
      <div className="container-narrow text-center">
        <FadeIn>
          <Link
            to="/referrals"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
          >
            Make a Referral
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default YourNeeds;
