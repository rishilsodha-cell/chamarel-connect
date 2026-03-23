import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import QualityLifeSections from "@/components/QualityLifeSections";

import drivewayDuskImg from "@/assets/photos/driveway-dusk.png";
import wateringPlantsImg from "@/assets/photos/watering-plants.png";
import gardeningGroupImg from "@/assets/photos/gardening-group.png";
import cafeOutingImg from "@/assets/photos/cafe-outing.png";
import craftSessionImg from "@/assets/photos/craft-session.png";

const bullets = [
  "One-to-one outreach support tailored to individual goals and daily routines",
  "Support with personal care, medication management, and daily living tasks",
  "Community access support — shopping, appointments, social activities, and travel training",
  "Wellbeing activities including gardening, cooking, arts and crafts, and supported outings",
  "Supported holidays and day visits that bring new experiences and joyful memories",
  "Flexible support packages reviewed regularly to match changing needs",
];

const activities = [
  { src: gardeningGroupImg, caption: "Gardening & Horticulture" },
  { src: cafeOutingImg, caption: "Community Outings" },
  { src: craftSessionImg, caption: "Arts & Crafts" },
];

const CommunityCarePage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={drivewayDuskImg} alt="Chamarel driveway at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      <div className="relative container-narrow py-28 md:py-40 text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-primary-foreground max-w-4xl mx-auto">
            Chamarel Community Care Services
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Flexible, compassionate support — delivered in your home and community across London.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/referrals" className="px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
              Make a Referral
            </Link>
            <a href="/#get-in-touch" className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:bg-primary-foreground/10">
              Contact Us
            </a>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Split content */}
    <section className="overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
          <img src={wateringPlantsImg} alt="Resident watering plants" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center p-10 md:p-16">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Person-Centred Community Support
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Chamarel Community Care Services is our dedicated community and outreach division, providing flexible, person-centred support to adults across London and the surrounding areas.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-6">
                We support adults with learning disabilities, autism, and mental health needs to live safely, confidently, and independently — in their own homes and within their local communities.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-2 font-medium">Our community care services include:</p>
              <ul className="space-y-2 mb-6">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-1 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground/80 leading-relaxed italic">
                Whether someone needs a few hours of support each week or intensive daily care, our community teams are there — consistent, compassionate, and committed.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Second split — gardening group */}
    <section className="overflow-hidden" style={{ backgroundColor: "#F9F7F4" }}>
      <div className="grid md:grid-cols-2">
        <div className="flex items-center p-10 md:p-16 md:order-1">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Building Skills & Confidence
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Our support goes beyond daily living. We help people develop new skills, pursue interests, and build the confidence to participate fully in their communities.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                From gardening and cooking to supported outings and creative activities, every day brings opportunities for growth, connection, and joy.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden md:order-2">
          <img src={gardeningGroupImg} alt="Group gardening activity" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* Our Activities */}
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Our Activities</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Meaningful activities that enrich lives, build skills, and create lasting memories.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((a, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group rounded-xl overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="h-[220px] overflow-hidden">
                  <img src={a.src} alt={a.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4 bg-card">
                  <span className="text-sm font-medium text-foreground">{a.caption}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <QualityLifeSections />

    {/* Referral CTA */}
    <section className="py-20 bg-primary">
      <div className="container-narrow max-w-2xl text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-primary-foreground mb-4">
            Ready to make a referral or find out more?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Our team typically responds within 24 hours.
          </p>
          <Link
            to="/referrals"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
          >
            Make a Referral <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default CommunityCarePage;
