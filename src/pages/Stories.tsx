import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const categories = ["All Stories", "Mental Health", "Learning Disabilities", "Autism", "Complex Care", "Community"] as const;

const stories = [
  {
    headline: "Finding confidence — James's journey to independence",
    excerpt: "After years of intensive support, James is now living semi-independently, cooking his own meals, and volunteering at a local charity shop.",
    category: "Learning Disabilities",
    hue: "bg-primary/10",
  },
  {
    headline: "From isolation to community: Sarah's remarkable progress",
    excerpt: "Sarah went from spending most days at home to attending art classes, visiting friends, and exploring her neighbourhood with supported outreach.",
    category: "Mental Health",
    hue: "bg-accent/10",
  },
  {
    headline: "A first holiday — how we made it happen",
    excerpt: "With careful planning and a dedicated support team, three individuals experienced their very first seaside holiday — smiles all round.",
    category: "Community",
    hue: "bg-secondary",
  },
  {
    headline: "Learning to cook: Small steps, big wins",
    excerpt: "Our independence training programme helped David learn to prepare simple meals, boosting his confidence and sense of achievement.",
    category: "Learning Disabilities",
    hue: "bg-primary/8",
  },
  {
    headline: "Back in the community after years of crisis accommodation",
    excerpt: "Through trauma-informed care and gradual community integration, we supported Michael's transition from crisis placement to a stable, fulfilling life.",
    category: "Complex Care",
    hue: "bg-accent/12",
  },
  {
    headline: "How art therapy changed everything for Michael",
    excerpt: "Weekly art sessions gave Michael a new way to express himself, leading to improved communication and a calmer, more confident outlook.",
    category: "Autism",
    hue: "bg-primary/12",
  },
];

const Stories = () => {
  const [filter, setFilter] = useState("All Stories");

  const filtered = filter === "All Stories" ? stories : stories.filter((s) => s.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow max-w-3xl text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Stories of Brilliance</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Brilliant things happen every day at Chamarel Healthcare. Here we celebrate the people we support and the teams who make it possible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story, i) => (
              <FadeIn key={story.headline} delay={i * 0.06}>
                <div className="group bg-card rounded-2xl overflow-hidden h-full flex flex-col" style={{ boxShadow: "var(--card-shadow)" }}>
                  <div className={`${story.hue} aspect-[16/10] flex items-center justify-center relative`}>
                    <Camera className="w-10 h-10 text-muted-foreground/25" strokeWidth={1.5} />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary/90 text-primary-foreground">
                      {story.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-medium mb-3 leading-snug">{story.headline}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{story.excerpt}</p>
                    <Link
                      to="#"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Stories;
