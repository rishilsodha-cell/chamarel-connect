import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { socialLinks } from "@/data/social";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import InstagramGrid from "@/components/InstagramGrid";
import NewsletterSection from "@/components/NewsletterSection";
import { enquiryEmail, enquiryEmailHref, enquiryPhone, enquiryPhoneHref } from "@/data/contact";
import { contactForm } from "@/data/forms";
import { submitToGoogleForm } from "@/lib/submitToGoogleForm";

import YourNeedsSection from "@/components/YourNeedsSection";
import AreasWeServe from "@/components/AreasWeServe";
import heroImage from "@/assets/hero-care.jpg";
import gardenPartyImg from "@/assets/photos/garden-party.png";
import cafeOutingImg from "@/assets/photos/cafe-outing.png";
import craftSessionImg from "@/assets/photos/craft-session.png";
import gardeningPottingImg from "@/assets/photos/gardening-potting.png";
import zooVisitImg from "@/assets/photos/zoo-visit.png";

const contactSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Required"),
});

type ContactForm = z.infer<typeof contactSchema>;


const moments = [
  { caption: "Summer Garden Party", image: gardenPartyImg },
  { caption: "Café Day Out", image: cafeOutingImg },
  { caption: "Creative Afternoons", image: craftSessionImg },
  { caption: "Growing Together", image: gardeningPottingImg },
  { caption: "Days to Remember", image: zooVisitImg },
];

const stats = [
  { label: "CQC Inspected & Rated Good", value: "CQC" },
  { label: "Positive Behaviour Support (PBS)", value: "PBS" },
  { label: "National Living Wage Employer", value: "NLW" },
];


const Index = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const [sending, setSending] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setSending(true);
    try {
      await submitToGoogleForm(contactForm.action, {
        [contactForm.fields.firstName]: data.firstName,
        [contactForm.fields.lastName]: data.lastName,
        [contactForm.fields.email]: data.email,
        [contactForm.fields.message]: data.message,
      });
      toast.success("Message sent! We'll be in touch within 24 hours.");
      reset();
    } catch {
      // Never claim an enquiry was sent when it was not.
      toast.error(`We couldn't send that. Please call ${enquiryPhone} or email ${enquiryEmail}.`, {
        duration: 10000,
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full bg-card border-0 ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Caregiver supporting a person at home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container-narrow py-28 md:py-40 lg:py-48">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-3xl text-primary-foreground">
              A decade of person-centred care
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
              Supported living and domiciliary care for adults with learning disabilities, autism and mental health needs, across London and Cambridgeshire. Five homes, one team, and vacancies now — see inside before you decide.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/our-homes" className="px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
                Explore Our Services
              </Link>
              <a href="/#get-in-touch" className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:bg-primary-foreground/10">
                Contact Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Your Needs */}
      <FadeIn>
        <div className="container-narrow pt-16 md:pt-20">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Your Needs</h2>
          <p className="text-center text-foreground/70 max-w-2xl mx-auto">
            We provide tailored care for people with learning disabilities, autism, and mental health needs.
          </p>
        </div>
      </FadeIn>
      <YourNeedsSection homepage />


      {/* Moments That Matter — Photo Strip */}
      <section className="py-16">
        <div className="container-narrow mb-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-2">Moments That Matter</h2>
            <p className="text-center text-muted-foreground text-sm">
              Every day, our teams create moments of joy, independence, and connection.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <div className="overflow-x-auto pb-4 px-5">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {moments.map((m, i) => (
                <div key={i} className="w-64 flex-shrink-0 group">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-2">
                    <img src={m.image} alt={m.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                      <span className="text-sm font-medium text-primary-foreground">{m.caption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Quality Stats */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div className="text-3xl font-semibold mb-2 text-accent">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Newsletter */}
      <NewsletterSection />

      {/* Instagram Feed */}
      <InstagramGrid />

      {/* Contact */}
      <section className="section-padding bg-secondary" id="get-in-touch">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-12">Get In Touch</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <a href={enquiryEmailHref} className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                  <Mail size={18} strokeWidth={1.5} />
                  {enquiryEmail}
                </a>
                <a href={enquiryPhoneHref} className="flex items-center gap-2 mt-3 text-foreground/80 hover:text-primary transition-colors">
                  <Phone size={18} strokeWidth={1.5} />
                  {enquiryPhone}
                </a>

                <div className="flex flex-wrap gap-3 mt-5">
                  <a
                    href={enquiryEmailHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
                  >
                    <Mail size={16} strokeWidth={1.5} />
                    Email Us
                  </a>
                  <a
                    href={enquiryPhoneHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ borderColor: "#00706B", color: "#00706B" }}
                  >
                    <Phone size={16} strokeWidth={1.5} />
                    Call {enquiryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2 mt-3" style={{ color: "#444444", fontSize: 14 }}>
                  <span>🕐</span> Monday – Friday, 9:00am – 5:00pm
                </div>
                <p className="italic text-muted-foreground mt-2" style={{ fontSize: 13 }}>
                  We aim to respond to all enquiries within 24 hours
                </p>

                <div className="my-5" style={{ width: 60, height: 1, backgroundColor: "#00706B" }} />

                <p className="font-bold text-sm mb-3" style={{ color: "#00706B", fontSize: 14 }}>What happens next?</p>
                <ol className="space-y-2 text-muted-foreground" style={{ fontSize: 13 }}>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">1.</span> We receive your message and review it within 24 hours</li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">2.</span> A senior team member will contact you directly</li>
                  <li className="flex gap-2"><span className="font-semibold text-foreground">3.</span> We'll arrange a call or visit at a time that suits you</li>
                </ol>

                <div className="my-5" style={{ width: 60, height: 1, backgroundColor: "#00706B" }} />

                <div className="flex flex-col sm:flex-row gap-4">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: "#00706B" }}>
                      <s.icon size={22} strokeWidth={1.5} />
                      <span className="text-muted-foreground" style={{ fontSize: 13 }}>{s.label}</span>
                      <span style={{ fontSize: 13 }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input {...register("firstName")} placeholder="First Name" className={inputClass} />
                    {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <input {...register("lastName")} placeholder="Last Name" className={inputClass} />
                    {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <input {...register("email")} placeholder="Email" className={inputClass} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <textarea {...register("message")} placeholder="Message" rows={4} className={inputClass + " resize-none"} />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={sending} className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0">
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <AreasWeServe slim />
    </Layout>
  );
};

export default Index;
