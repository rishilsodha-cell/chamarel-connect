import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import InstagramGrid from "@/components/InstagramGrid";
import OurHome from "@/components/OurHome";
import YourNeedsSection from "@/components/YourNeedsSection";
import AreasWeServe from "@/components/AreasWeServe";
import heroImage from "@/assets/hero-care.jpg";
import gardenPartyImg from "@/assets/photos/garden-party.png";
import cafeOutingImg from "@/assets/photos/cafe-outing.png";
import craftSessionImg from "@/assets/photos/craft-session.png";
import gardeningPottingImg from "@/assets/photos/gardening-potting.png";
import zooVisitImg from "@/assets/photos/zoo-visit.png";
import gardeningPairImg from "@/assets/photos/gardening-pair.png";

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

const stories = [
  { title: "Empowering independence", excerpt: "How we helped James build confidence and develop daily living skills in his supported living setting.", image: gardeningPairImg },
  { title: "A journey to confidence", excerpt: "Sarah's story of recovery through trauma-informed mental health support and community engagement.", image: cafeOutingImg },
  { title: "Thriving in the community", excerpt: "Mark's progression from intensive support to independent living with our dedicated care team.", image: gardenPartyImg },
];

const Index = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    console.log(data);
    toast.success("Message sent! We'll be in touch soon.");
    reset();
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
              Care & Support for People with Learning Disabilities, Autism and Mental Health Needs
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
              At Chamarel Healthcare, we provide compassionate, person-centred care for adults with learning disabilities, autism, and mental health needs — delivered in London and the surrounding community.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/your-needs" className="px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
                Explore Our Services
              </Link>
              <Link to="/referrals" className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:bg-primary-foreground/10">
                Make a Referral
              </Link>
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

      {/* Our Home */}
      <OurHome />

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

      {/* Success Stories */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-12">Success Stories</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl h-full flex flex-col overflow-hidden border-t-4 border-primary" style={{ boxShadow: "var(--card-shadow)" }}>
                  <div className="h-[180px] overflow-hidden">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-lg font-medium mb-3">{story.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{story.excerpt}</p>
                    <Link to="/stories" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramGrid />

      {/* Contact */}
      <section className="section-padding bg-secondary" id="contact">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-12">Get In Touch</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <a href="mailto:enquiry@chamarelhealthcare.com" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                  <Mail size={18} strokeWidth={1.5} />
                  enquiry@chamarelhealthcare.com
                </a>

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
                  {[
                    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/chamarel-healthcare" },
                    { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/chamarelhealthcare" },
                    { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/chamarelhealthcare" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: "#00706B" }}>
                      <s.Icon size={22} strokeWidth={1.5} />
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
                <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
                  Send Message
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
