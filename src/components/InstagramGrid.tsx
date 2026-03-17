import { Instagram, Camera } from "lucide-react";
import FadeIn from "@/components/FadeIn";

/**
 * Instagram-style grid for the homepage.
 * TODO: Replace placeholder images with real photos.
 * This grid can be connected to the Instagram Basic Display API / oEmbed API
 * to pull live posts, or images can be manually updated here.
 */

const posts = [
  { caption: "Garden time 🌿", hue: "bg-primary/10" },
  { caption: "Art therapy session", hue: "bg-accent/10" },
  { caption: "Community outing", hue: "bg-secondary" },
  { caption: "Celebrating milestones 🎉", hue: "bg-primary/8" },
  { caption: "Cooking together", hue: "bg-accent/12" },
  { caption: "Day trip to the coast", hue: "bg-primary/12" },
];

const InstagramGrid = () => (
  <section className="section-padding bg-secondary">
    <div className="container-narrow">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-2">
          Follow Our Journey
        </h2>
        <p className="text-center text-accent font-medium text-sm mb-10">
          @chamarelhealthcare
        </p>
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {posts.map((post, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div className="group relative aspect-square rounded-2xl overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className={`${post.hue} w-full h-full flex items-center justify-center`}>
                <Camera className="w-10 h-10 text-muted-foreground/20" strokeWidth={1.5} />
              </div>
              {/* Instagram icon overlay */}
              <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full p-1.5">
                <Instagram size={14} strokeWidth={1.5} className="text-foreground/50" />
              </div>
              {/* Caption on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-medium text-primary-foreground">{post.caption}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div className="text-center mt-10">
          <a
            href="https://instagram.com/chamarelhealthcare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
          >
            <Instagram size={18} strokeWidth={1.5} />
            Follow us on Instagram
          </a>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default InstagramGrid;
