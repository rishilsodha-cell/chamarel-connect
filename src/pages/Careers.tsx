import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Briefcase, GraduationCap, Heart, Clock, Linkedin, Phone } from "lucide-react";
import { enquiryEmail, enquiryEmailHref, enquiryPhone, enquiryPhoneHref } from "@/data/contact";
import { careersForm } from "@/data/forms";

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
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#apply"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
            >
              Apply Now
            </a>
            <a
              href={enquiryPhoneHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: "#00706B", color: "#00706B" }}
            >
              <Phone size={18} strokeWidth={1.5} />
              Call {enquiryPhone}
            </a>
          </div>
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

    {/* Application form */}
    <section className="section-padding" id="apply">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h2 className="text-3xl font-medium text-center mb-3">Apply to Join Us</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Fill this in and a member of our team will come back to you. You do not need previous
            care experience — we recruit for character and train for skill.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
            <iframe
              src={careersForm.embedUrl}
              title="Chamarel Healthcare application form"
              loading="lazy"
              /* Measured against the live form: 3031px at 768w, 3324px at 390w.
                 Sized generously so the embed never gets its own scrollbar. */
              className="w-full border-0 h-[3500px] sm:h-[3200px]"
            >
              Loading…
            </iframe>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Form not loading?{" "}
            <a href={careersForm.openUrl} target="_blank" rel="noopener noreferrer" className="underline text-accent hover:text-primary">
              Open it in a new tab
            </a>
            , call{" "}
            <a href={enquiryPhoneHref} className="underline text-accent hover:text-primary">{enquiryPhone}</a>
            {" "}or email{" "}
            <a href={enquiryEmailHref} className="underline text-accent hover:text-primary">{enquiryEmail}</a>.
          </p>
        </FadeIn>
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
