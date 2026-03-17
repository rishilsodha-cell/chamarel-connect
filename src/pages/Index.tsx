import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Heart, UtensilsCrossed, Linkedin, Facebook, Instagram, Mail, Brain, Puzzle, HeartPulse, Activity, Sparkles, ArrowRight, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import heroImage from "@/assets/hero-care.jpg";

const contactSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Required"),
});

type ContactForm = z.infer<typeof contactSchema>;

const needs = [
  { icon: Puzzle, title: "Autism", path: "/your-needs" },
  { icon: Brain, title: "Learning Disabilities", path: "/your-needs" },
  { icon: HeartPulse, title: "Mental Health", path: "/your-needs" },
  { icon: Activity, title: "Complex & Enhanced Care", path: "/your-needs" },
  { icon: Sparkles, title: "Brain Injury Rehabilitation", path: "/your-needs" },
];

const moments = [
  { caption: "Garden walk with support worker", hue: "bg-primary/10" },
  { caption: "Art therapy afternoon", hue: "bg-accent/10" },
  { caption: "Cooking together", hue: "bg-secondary" },
  { caption: "Community day trip", hue: "bg-primary/8" },
  { caption: "Celebrating milestones", hue: "bg-accent/12" },
  { caption: "Enjoying the sunshine", hue: "bg-primary/12" },
  { caption: "Music session", hue: "bg-secondary" },
  { caption: "Seaside holiday", hue: "bg-accent/10" },
];

const stats = [
  { label: "CQC Inspected & Rated Good", value: "CQC" },
  { label: "Trauma-Informed Practice", value: "TIP" },
  { label: "Person-Centred at Every Step", value: "PCS" },
];

const stories = [
  { title: "Empowering independence", excerpt: "How we helped James build confidence and develop daily living skills in his supported living setting." },
  { title: "A journey to confidence", excerpt: "Sarah's story of recovery through trauma-informed mental health support and community engagement." },
  { title: "Thriving in the community", excerpt: "Mark's progression from intensive support to independent living with our specialist care team." },
];

const trustBadges = [
  { icon: ShieldCheck, label: "CQC Rated Good" },
  { icon: BadgeCheck, label: "Staff Verified" },
  { icon: Heart, label: "National Living Wage" },
  { icon: UtensilsCrossed, label: "Food Hygiene Rating" },
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
              Specialist Care & Support for People with Complex Needs
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
              At Chamarel Healthcare, we provide compassionate, person-centred care for adults with learning disabilities, autism, mental health needs, and complex conditions — delivered in London and the surrounding community.
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
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Your Needs</h2>
            <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
              We provide specialist care tailored to a range of complex needs.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {needs.map((need, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link to={need.path} className="flex flex-col items-center text-center gap-4 p-6 md:p-8 bg-card rounded-2xl transition-all duration-200 hover:-translate-y-1 group" style={{ boxShadow: "var(--card-shadow)" }}>
                  <div className="p-4 rounded-2xl bg-secondary transition-colors group-hover:bg-accent/10">
                    <need.icon size={28} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{need.title}</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
                <div key={i} className="w-56 flex-shrink-0">
                  <div className={`${m.hue} aspect-[4/5] rounded-2xl flex items-center justify-center mb-2`}>
                    <Camera className="w-8 h-8 text-muted-foreground/25" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">{m.caption}</p>
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
                <div className="p-8 bg-card rounded-2xl h-full flex flex-col" style={{ boxShadow: "var(--card-shadow)" }}>
                  <h3 className="text-lg font-medium mb-3">{story.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{story.excerpt}</p>
                  <Link to="/stories" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3 group">
                  <div className="p-4 rounded-2xl bg-secondary transition-colors duration-200 group-hover:bg-secondary/70">
                    <badge.icon size={32} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{badge.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

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
                <div className="flex gap-4 mt-8">
                  <a href="#" aria-label="LinkedIn" className="text-foreground/50 hover:text-primary transition-colors"><Linkedin size={22} strokeWidth={1.5} /></a>
                  <a href="#" aria-label="Facebook" className="text-foreground/50 hover:text-primary transition-colors"><Facebook size={22} strokeWidth={1.5} /></a>
                  <a href="#" aria-label="Instagram" className="text-foreground/50 hover:text-primary transition-colors"><Instagram size={22} strokeWidth={1.5} /></a>
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
    </Layout>
  );
};

export default Index;
