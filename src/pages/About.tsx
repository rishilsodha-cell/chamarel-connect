import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Heart, Users, Shield, Lightbulb } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", desc: "Every interaction is guided by empathy and genuine care for the individuals we support." },
  { icon: Users, title: "Person-Centred", desc: "We tailor our approach to each individual, respecting their unique needs, preferences, and goals." },
  { icon: Shield, title: "Dignity & Respect", desc: "We uphold the dignity of every person, ensuring they feel valued and heard." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace evidence-based practices and technology to deliver the highest quality of care." },
];

const About = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">About Chamarel Healthcare</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            Chamarel Healthcare is a London-based provider of specialist domiciliary and community care services. We support adults with mental health needs, learning disabilities, and complex requirements to live safely and independently in their own homes and communities.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/80">
            Our team of dedicated professionals delivers trauma-informed, values-based care rooted in Positive Behaviour Support (PBS). We believe everyone deserves to thrive — not just survive — and we work tirelessly to make that a reality.
          </p>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-3xl font-medium text-center mb-16">Our Values</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-card rounded-2xl transition-all duration-200 hover:bg-secondary/50" style={{ boxShadow: "var(--card-shadow)" }}>
                <v.icon size={28} strokeWidth={1.5} className="text-accent mb-4" />
                <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
