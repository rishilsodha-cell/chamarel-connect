import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Award, Clock, TrendingUp, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Award, title: "CQC Rated Good", desc: "Our services meet rigorous quality and safety standards set by the Care Quality Commission." },
  { icon: HeartHandshake, title: "Values-Driven Team", desc: "We recruit for values first. Every team member shares our commitment to compassion and dignity." },
  { icon: TrendingUp, title: "Evidence-Based Practice", desc: "Our approach is grounded in PBS, trauma-informed care, and the latest research in supported living." },
  { icon: Clock, title: "Flexible & Responsive", desc: "We adapt to the needs of individuals and commissioners, providing tailored packages with speed and care." },
];

const WhyWorkWithUs = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Why Work With Us</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            Chamarel Healthcare stands apart through our unwavering commitment to quality, our specialist expertise, and the genuine warmth of our team. Whether you're a commissioner, social worker, or family member, here's why you can trust us.
          </p>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-card rounded-2xl h-full" style={{ boxShadow: "var(--card-shadow)" }}>
                <r.icon size={28} strokeWidth={1.5} className="text-accent mb-4" />
                <h3 className="text-lg font-medium mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default WhyWorkWithUs;
