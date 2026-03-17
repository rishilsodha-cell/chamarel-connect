import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Briefcase, GraduationCap, Heart, Clock } from "lucide-react";

const perks = [
  { icon: Heart, title: "Values-Based Culture", desc: "Join a team that genuinely cares. We recruit for character and train for skill." },
  { icon: GraduationCap, title: "Training & Development", desc: "Comprehensive induction, ongoing CPD, and specialist training in PBS and trauma-informed care." },
  { icon: Briefcase, title: "Competitive Pay", desc: "Living Wage accredited employer with competitive rates and transparent pay structures." },
  { icon: Clock, title: "Flexible Working", desc: "We understand the importance of work-life balance and offer flexible shift patterns." },
];

const Careers = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Careers at Chamarel</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            We're always looking for compassionate, dedicated individuals to join our team. If you share our values and want to make a meaningful difference in people's lives, we'd love to hear from you.
          </p>
          <a
            href="mailto:enquiry@chamarelhealthcare.com?subject=Career%20Enquiry"
            className="inline-block mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
          >
            Get In Touch
          </a>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-3xl font-medium text-center mb-16">Why Join Us</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {perks.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-card rounded-2xl h-full" style={{ boxShadow: "var(--card-shadow)" }}>
                <p.icon size={28} strokeWidth={1.5} className="text-accent mb-4" />
                <h3 className="text-lg font-medium mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Careers;
