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

const needs = [
  { title: "Autism", path: "/your-needs/autism", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", bg: "bg-accent/20" },
  { title: "Learning Disabilities", path: "/your-needs/learning-disabilities", image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400", bg: "bg-amber-100" },
  { title: "Mental Health", path: "/your-needs/mental-health", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400", bg: "bg-purple-100" },
];

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
  { title: "Empowering independence", excerpt: "How we helped James build confidence and develop daily living skills in his supported living setting." },
  { title: "A journey to confidence", excerpt: "Sarah's story of recovery through trauma-informed mental health support and community engagement." },
  { title: "Thriving in the community", excerpt: "Mark's progression from intensive support to independent living with our dedicated care team." },
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
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Your Needs</h2>
            <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
              We provide tailored care for people with learning disabilities, autism, and mental health needs.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {needs.map((need, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <Link to={need.path} className="flex flex-col items-center text-center gap-5 group">
                  <div className={`${need.bg} w-40 h-40 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
                    <img src={need.image} alt={need.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">{need.title}</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
