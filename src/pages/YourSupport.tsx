import { Link } from "react-router-dom";
import { Home, Users, Clock, Palette, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const supports = [
  {
    icon: Home,
    title: "Care Homes",
    desc: "Safe, homely environments with 24/7 specialist support.",
  },
  {
    icon: Users,
    title: "Supported Living",
    desc: "Independence with the right level of support, in your own home or shared setting.",
  },
  {
    icon: Clock,
    title: "Respite Care",
    desc: "Short-term, planned breaks for individuals and their families.",
  },
  {
    icon: Palette,
    title: "Day Opportunities",
    desc: "Structured, meaningful activities that promote skills and social connection.",
  },
  {
    icon: Heart,
    title: "Support at Home",
    desc: "Flexible, person-centred support delivered in the individual's own home.",
  },
];

const YourSupport = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Your Support</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            Finding the right support is a big decision. At Chamarel Healthcare, we offer flexible care options across a range of settings — so you or your loved one can find the right fit.
          </p>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary pt-0">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supports.map((support, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="p-8 bg-card rounded-2xl h-full flex flex-col transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="p-3 rounded-xl bg-secondary w-fit mb-5">
                  <support.icon size={24} strokeWidth={1.5} className="text-accent" />
                </div>
                <h2 className="text-xl font-medium mb-3">{support.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{support.desc}</p>
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
              Get in Touch
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default YourSupport;
