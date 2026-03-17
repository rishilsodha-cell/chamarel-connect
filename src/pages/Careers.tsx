import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Briefcase, GraduationCap, Heart, Clock, Linkedin } from "lucide-react";

const perks = [
  { icon: Heart, title: "Values-Based Culture", desc: "Join a team that genuinely cares. We recruit for character and train for skill." },
  { icon: GraduationCap, title: "Training & Development", desc: "Comprehensive induction, ongoing CPD, and specialist training in PBS and trauma-informed care." },
  { icon: Briefcase, title: "Competitive Pay", desc: "National Living Wage accredited employer with competitive rates and transparent pay structures." },
  { icon: Clock, title: "Flexible Working", desc: "We understand the importance of work-life balance and offer flexible shift patterns." },
];

const Careers = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Join the Chamarel Healthcare Team</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            We're looking for compassionate, dedicated people to join our growing team. At Chamarel Healthcare, we invest in our staff through ongoing training in Positive Behaviour Support (PBS), trauma-informed care, and professional development. We are proud to be a National Living Wage employer.
          </p>
          <a
            href="mailto:enquiry@chamarelhealthcare.com?subject=Career%20Enquiry"
            className="inline-block mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
          >
            View Current Vacancies
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

    {/* LinkedIn Section */}
    <section className="section-padding">
      <div className="container-narrow max-w-2xl">
        <FadeIn>
          <div className="bg-card rounded-2xl p-8 md:p-10 text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="w-14 h-14 rounded-2xl bg-[hsl(201,100%,35%)] flex items-center justify-center mx-auto mb-5">
              <Linkedin size={28} strokeWidth={1.5} className="text-white" />
            </div>
            <h2 className="text-2xl font-medium mb-3">Follow Us on LinkedIn</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We share team updates, job opportunities, and care sector insights on LinkedIn.
            </p>
            <div className="flex items-center justify-center gap-4 my-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Chamarel Healthcare</span>
              <span>·</span>
              <span>2.4K followers</span>
            </div>
            <a
              href="https://linkedin.com/company/chamarelhealthcare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold bg-[hsl(201,100%,35%)] hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              Follow on LinkedIn
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default Careers;
