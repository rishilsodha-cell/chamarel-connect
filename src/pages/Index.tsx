import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Heart, UtensilsCrossed, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
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

const trustBadges = [
  { icon: ShieldCheck, label: "CQC Inspected & Rated Good" },
  { icon: BadgeCheck, label: "Staff Verified" },
  { icon: Heart, label: "Living Wage Foundation" },
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

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Caregiver supporting a person at home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container-narrow section-padding py-28 md:py-40">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-3xl text-primary-foreground">
              Professional Care & Support Delivered At Home & In The Community
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
              Specialized domiciliary care for mental health and learning disabilities.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              to="/services"
              className="inline-block mt-8 px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
            >
              Learn More
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow max-w-[65ch] mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
              Exceptional Care, Tailored to You
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/90">
              At Chamarel Healthcare, our mission is to deliver exceptional domiciliary and community-based care that empowers adults with mental health needs, learning disabilities, and complex support requirements to live confidently, safely, and independently in their own homes and communities. We are rooted in values-based practice, where{" "}
              <span className="font-medium text-primary">compassion, dignity, and emotional intelligence</span>{" "}
              guide every interaction. Our support is trauma-informed, recognising the impact of past experiences and creating safe, nurturing environments that promote healing and trust. Through{" "}
              <span className="font-medium text-primary">Positive Behaviour Support (PBS)</span>, we focus on proactive, person-centred strategies that reduce distress and enhance quality of life — enabling individuals to thrive, not just survive.
            </p>
          </FadeIn>
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
                    <input
                      {...register("firstName")}
                      placeholder="First Name"
                      className="w-full bg-card border-0 ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none"
                    />
                    {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("lastName")}
                      placeholder="Last Name"
                      className="w-full bg-card border-0 ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none"
                    />
                    {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <input
                    {...register("email")}
                    placeholder="Email"
                    className="w-full bg-card border-0 ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Message"
                    rows={4}
                    className="w-full bg-card border-0 ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none resize-none"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
                >
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
