import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Palette, Brain, BookOpen, Home } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Activities",
    desc: "Engaging, meaningful activities that promote wellbeing and personal growth.",
    items: ["Supported holidays & day trips", "Hydrotherapy & swimming", "Art therapy & creative workshops", "College & educational access", "Supported employment programmes", "Independence & life skills training"],
  },
  {
    icon: Brain,
    title: "Mental Health",
    desc: "Specialist support for individuals with complex mental health needs.",
    items: ["Trauma-informed care approaches", "Positive Behaviour Support (PBS)", "Therapeutic & meaningful activities", "Community integration support", "CQC-regulated services", "Technology-enabled monitoring & support"],
  },
  {
    icon: BookOpen,
    title: "Learning Disabilities",
    desc: "Empowering individuals with learning disabilities to live their best lives.",
    items: ["Positive Behaviour Support (PBS)", "Co-produced, person-centred care plans", "Independence & daily living training", "Hydrotherapy & sensory integration", "Supported employment opportunities", "Community participation & social inclusion"],
  },
  {
    icon: Home,
    title: "Domiciliary Outreach Services",
    desc: "Professional community-based support delivered in the comfort of home.",
    items: ["Personalised home-based care packages", "Medication management & health monitoring", "Daily living & household support", "Social & community engagement", "Family liaison & support coordination", "Flexible scheduling to suit individual routines"],
  },
];

const Services = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight max-w-2xl">Our Services</h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl">
            Comprehensive, person-centred care designed around each individual's unique needs and aspirations.
          </p>
        </FadeIn>
      </div>
    </section>

    <div className="container-narrow pb-24 space-y-12">
      {services.map((service, i) => (
        <FadeIn key={i} delay={0.05}>
          <div className="p-8 md:p-10 bg-card rounded-2xl" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-secondary shrink-0">
                <service.icon size={24} strokeWidth={1.5} className="text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-medium">{service.title}</h2>
                <p className="mt-1 text-foreground/70">{service.desc}</p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-inside list-disc marker:text-accent text-sm text-foreground/80">
              {service.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
      ))}
    </div>
  </Layout>
);

export default Services;
