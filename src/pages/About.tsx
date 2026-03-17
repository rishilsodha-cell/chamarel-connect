import { Link } from "react-router-dom";
import { Heart, Compass, Users } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const cards = [
  { icon: Heart, title: "Our Values", desc: "Compassion, dignity, and emotional intelligence at the heart of everything we do." },
  { icon: Compass, title: "Our Approach", desc: "Positive Behaviour Support and trauma-informed practice creating safe environments." },
  { icon: Users, title: "Our Teams", desc: "Dedicated professionals invested in ongoing training and professional development." },
];

const About = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">About Chamarel Healthcare</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
            <p>
              At Chamarel Healthcare, our purpose is simple: fulfilling lives for all. We provide specialist, values-led care and support for adults with learning disabilities, autism, mental health needs, and complex conditions across London and the wider community.
            </p>
            <p>
              At the heart of everything we do is <span className="font-medium text-primary">Positive Behaviour Support (PBS)</span> and <span className="font-medium text-primary">trauma-informed practice</span> — creating safe, emotionally intelligent environments where people feel understood, valued, and empowered to shape their own lives.
            </p>
            <p>
              We look beyond labels. We embrace each individual's unique strengths, goals, and aspirations — and we work tirelessly to ensure every person we support can live life as they choose, with dignity, connection, and joy.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-card rounded-2xl h-full text-center" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="p-4 rounded-2xl bg-secondary w-fit mx-auto mb-5">
                  <card.icon size={28} strokeWidth={1.5} className="text-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
