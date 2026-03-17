import { Link } from "react-router-dom";
import { Puzzle, Brain, HeartPulse, Activity, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const needs = [
  {
    icon: Puzzle,
    title: "Autism",
    desc: "Structured, sensory-aware support that helps autistic individuals build independence and thrive in their environment.",
  },
  {
    icon: Brain,
    title: "Learning Disabilities",
    desc: "Values-led, co-produced support empowering adults with learning disabilities to live with confidence and purpose.",
  },
  {
    icon: HeartPulse,
    title: "Mental Health",
    desc: "Compassionate, trauma-informed mental health support focused on recovery, resilience, and community belonging.",
  },
  {
    icon: Activity,
    title: "Enhanced Care",
    desc: "Tailored support for individuals with behavioural, physical, or medical needs.",
  },
  {
    icon: Sparkles,
    title: "Brain Injury Rehabilitation",
    desc: "Structured rehabilitation support helping individuals rebuild skills and regain independence after brain injury.",
  },
];

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

    <section className="section-padding bg-secondary pt-0">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {needs.map((need, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="p-8 bg-card rounded-2xl h-full flex flex-col transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="p-3 rounded-xl bg-secondary w-fit mb-5">
                  <need.icon size={24} strokeWidth={1.5} className="text-accent" />
                </div>
                <h2 className="text-xl font-medium mb-3">{need.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{need.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link
              to="/referrals"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
            >
              Make a Referral
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default YourNeeds;
