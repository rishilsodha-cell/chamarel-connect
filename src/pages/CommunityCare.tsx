import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Heart, UtensilsCrossed, Palette, HeartPulse, Brain, Users, ArrowRight, Camera } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const services = [
  { icon: Palette, title: "Activities & Wellbeing", description: "Supported holidays, art therapy, hydrotherapy, college access, supported employment, and independence training — designed to enrich lives and build confidence." },
  { icon: HeartPulse, title: "Mental Health Support", description: "Trauma-informed, PBS-led support promoting recovery, resilience, and community integration for adults with mental health needs." },
  { icon: Brain, title: "Learning Disabilities Support", description: "Co-produced, person-centred plans that promote inclusion, independence, and personal growth for adults with learning disabilities." },
  { icon: Users, title: "Community Outreach", description: "Flexible, responsive support delivered in the community — in individuals' homes, community settings, and shared spaces." },
];

const badges = [
  { icon: ShieldCheck, label: "CQC Inspected & Rated Good" },
  { icon: BadgeCheck, label: "Staff Verified" },
  { icon: Heart, label: "National Living Wage" },
  { icon: UtensilsCrossed, label: "Food Hygiene Rating" },
];

const communityPhotos = [
  { caption: "Walking Group", hue: "bg-[hsl(var(--community-accent)/0.1)]" },
  { caption: "Art Session", hue: "bg-[hsl(var(--community-accent)/0.15)]" },
  { caption: "Supported Shopping", hue: "bg-secondary" },
  { caption: "Park Visit", hue: "bg-[hsl(var(--community-accent)/0.08)]" },
  { caption: "Café Outing", hue: "bg-[hsl(var(--community-accent)/0.12)]" },
  { caption: "Community Garden", hue: "bg-secondary" },
];

const CommunityCare = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding bg-[hsl(var(--community-accent)/0.08)]">
      <div className="container-narrow max-w-4xl text-center">
        <FadeIn>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[hsl(var(--community-accent)/0.15)] text-[hsl(var(--community-accent))] mb-6">
            Community Care
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
            Chamarel Community Care Services
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-medium">
            Person-Centred Community Care, Delivered Where It Matters Most
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80 max-w-3xl mx-auto">
            Chamarel Community Care Services provides compassionate, person-centred support to adults
            with mental health needs, learning disabilities, and autism — enabling
            individuals to live safely, confidently, and independently within their own communities.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Split-screen photo banner */}
    <section className="overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="bg-[hsl(var(--community-accent)/0.1)] aspect-[4/3] md:aspect-auto flex items-center justify-center">
          <Camera className="w-16 h-16 text-muted-foreground/20" strokeWidth={1.5} />
        </div>
        <div className="flex items-center p-10 md:p-16">
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Care That Goes Where You Go
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-8">
                Whether it's a walk in the park, a trip to the shops, or support at home — our community care teams are there, providing flexible, responsive, and compassionate support wherever it's needed most.
              </p>
              <Link
                to="/referrals"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(var(--community-accent))] text-white rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
              >
                Make a Referral <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-center mb-4">Our Community Services</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Tailored community support built around each individual's goals, strengths, and aspirations.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-[hsl(var(--community-accent)/0.3)] transition-all duration-300 hover:shadow-lg h-full">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--community-accent)/0.12)] flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-[hsl(var(--community-accent))]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Community in Action */}
    <section className="py-16">
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">Community in Action</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {communityPhotos.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl">
                <div className={`${img.hue} aspect-[4/3] flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                  <Camera className="w-8 h-8 text-muted-foreground/25" strokeWidth={1.5} />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-medium text-primary-foreground">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Trust Badges */}
    <section className="py-16 bg-secondary">
      <div className="container-narrow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b, i) => (
            <FadeIn key={b.label} delay={i * 0.06}>
              <div className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--community-accent)/0.12)] flex items-center justify-center">
                  <b.icon className="w-7 h-7 text-[hsl(var(--community-accent))]" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{b.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Referral CTA */}
    <section className="section-padding">
      <div className="container-narrow max-w-2xl text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Ready to refer or find out more?</h2>
          <p className="text-muted-foreground mb-8">Our team is ready to discuss how Chamarel Community Care Services can support you or someone you care for.</p>
          <Link to="/referrals" className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(var(--community-accent))] text-white rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
            Make a Referral <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default CommunityCare;
