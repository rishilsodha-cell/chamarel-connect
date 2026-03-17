import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Award, Clock, TrendingUp, HeartHandshake, GraduationCap, ShieldCheck } from "lucide-react";

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

    {/* Values-led environment */}
    <section className="section-padding">
      <div className="container-narrow max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-6">A Values-Led, Trauma-Informed Workplace</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                At Chamarel Healthcare, we foster a working environment rooted in compassion, respect, and psychological safety. Our approach is fully trauma-informed — we understand that great care starts with a supported, empowered workforce.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Every member of our team receives ongoing training in <span className="font-medium text-primary">Positive Behaviour Support (PBS)</span>, equipping them with proactive, evidence-based strategies to deliver person-centred care that reduces distress and promotes wellbeing.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-secondary shrink-0">
                  <GraduationCap size={22} strokeWidth={1.5} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Professional Development</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Staff are supported through comprehensive induction programmes, regular supervision, and continuous professional development opportunities — ensuring confidence and competence at every level.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-secondary shrink-0">
                  <ShieldCheck size={22} strokeWidth={1.5} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Living Wage Employer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Chamarel Healthcare is a proud Living Wage accredited employer, demonstrating our commitment to fair pay and valuing the people who deliver our care.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary">
      <div className="container-narrow text-center">
        <FadeIn>
          <h2 className="text-3xl font-medium text-primary-foreground mb-4">Ready to Get Involved?</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Whether you're looking to join our team or refer an individual for support, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/careers"
              className="px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
            >
              View Careers
            </Link>
            <Link
              to="/referrals"
              className="px-8 py-4 bg-transparent text-primary-foreground rounded-full font-semibold ring-1 ring-primary-foreground/30 hover:ring-primary-foreground/60 hover:-translate-y-0.5 transition-all duration-250"
            >
              Make a Referral
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default WhyWorkWithUs;
