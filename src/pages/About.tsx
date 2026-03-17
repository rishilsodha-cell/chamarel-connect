import { Heart, Compass, Users, Camera, Quote, Facebook, ThumbsUp } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import AreasWeServe from "@/components/AreasWeServe";

const cards = [
  { icon: Heart, title: "Our Values", desc: "Compassion, dignity, and emotional intelligence at the heart of everything we do." },
  { icon: Compass, title: "Our Approach", desc: "Positive Behaviour Support and trauma-informed practice creating safe environments." },
  { icon: Users, title: "Our Teams", desc: "Dedicated professionals invested in ongoing training and professional development." },
];

const team = [
  { name: "Staff Member", role: "Registered Manager", bio: "Leading with compassion and over 10 years of specialist care experience.", quote: "Every person deserves to feel safe, valued, and heard." },
  { name: "Staff Member", role: "Team Leader", bio: "Passionate about empowering individuals through person-centred support.", quote: "I love seeing the people I support achieve something new every day." },
  { name: "Staff Member", role: "Care Support Worker", bio: "Dedicated to building trust and creating meaningful daily experiences.", quote: "The small moments of joy make this work so rewarding." },
  { name: "Staff Member", role: "PBS Practitioner", bio: "Experienced in Positive Behaviour Support and trauma-informed care.", quote: "Understanding someone's story changes everything about how you support them." },
  { name: "Staff Member", role: "Senior Support Worker", bio: "Committed to helping people build independence and confidence.", quote: "Seeing someone cook their first meal independently — that's why I do this." },
  { name: "Staff Member", role: "Activities Coordinator", bio: "Creating enriching experiences through art, outings, and community engagement.", quote: "Creativity opens doors that nothing else can." },
  { name: "Staff Member", role: "Care Support Worker", bio: "Focused on dignity, respect, and building genuine connections.", quote: "Every day is a chance to make someone's life a little brighter." },
  { name: "Staff Member", role: "Team Leader", bio: "Experienced in supporting adults with complex mental health needs.", quote: "Recovery isn't linear, but every step forward matters." },
];

const behindTheScenes = [
  { caption: "PBS Training Day", hue: "bg-primary/10" },
  { caption: "Team Meeting", hue: "bg-accent/10" },
  { caption: "Supervision Session", hue: "bg-secondary" },
  { caption: "Staff Awards", hue: "bg-primary/8" },
  { caption: "Team Celebration", hue: "bg-accent/12" },
];

const About = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">About Chamarel Healthcare</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
            <p>
              At Chamarel Healthcare, our purpose is simple: fulfilling lives for all. We provide values-led care and support for adults with learning disabilities, autism, and mental health needs across London and the wider community.
            </p>
            <p>
              At the heart of everything we do is <span className="font-medium text-primary">Positive Behaviour Support (PBS)</span> and <span className="font-medium text-primary">trauma-informed practice</span> — creating safe, emotionally intelligent environments where people feel understood, valued, and empowered to shape their own lives.
            </p>
            <p>
              We look beyond labels. We embrace each individual's unique strengths, goals, and aspirations — and we work tirelessly to ensure every person we support can live life as they choose, with dignity, connection, and joy.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-card rounded-2xl h-full text-center" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="p-4 rounded-2xl bg-secondary w-fit mx-auto mb-5">
                  <card.icon size={28} strokeWidth={1.5} className="text-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Meet Our Team */}
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our people are our greatest strength. Every team member is committed to delivering care with warmth, professionalism, and heart.
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="group relative text-center">
                {/* Photo placeholder */}
                <div className="w-28 h-28 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4 overflow-hidden">
                  <Camera className="w-8 h-8 text-muted-foreground/25" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium">{member.name}</h3>
                <p className="text-xs text-accent font-medium mt-0.5">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{member.bio}</p>
                {/* Hover quote */}
                <div className="absolute inset-0 bg-primary/95 rounded-2xl p-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Quote className="w-5 h-5 text-accent mb-2" strokeWidth={1.5} />
                  <p className="text-xs text-primary-foreground leading-relaxed italic text-center">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Facebook Widget + Behind the Scenes */}
    <section className="py-16 bg-secondary">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-medium mb-8">Behind the Scenes</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {behindTheScenes.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl">
                    <div className={`${img.hue} aspect-[16/10] flex items-center justify-center`}>
                      <Camera className="w-8 h-8 text-muted-foreground/25" strokeWidth={1.5} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-medium text-primary-foreground">{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          <div className="md:col-span-1">
            <FadeIn delay={0.2}>
              <div className="bg-card rounded-2xl p-6 sticky top-24" style={{ boxShadow: "var(--card-shadow)" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-muted-foreground">Connect with us on Facebook</h3>
                {/* Placeholder for Facebook Page Plugin embed — replace with iframe from developers.facebook.com/docs/plugins/page-plugin */}
                <div className="bg-secondary rounded-xl aspect-[3/4] flex flex-col items-center justify-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[hsl(221,44%,41%)] flex items-center justify-center">
                    <Facebook size={28} strokeWidth={1.5} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">Chamarel Healthcare</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp size={12} /> <span>1.2K followers</span>
                  </div>
                </div>
                <a
                  href="https://facebook.com/chamarelhealthcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[hsl(221,44%,41%)] hover:opacity-90 transition-opacity"
                >
                  Follow on Facebook
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <AreasWeServe />
  </Layout>
);

export default About;
