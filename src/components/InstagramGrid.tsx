import { Instagram, Heart, Eye } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import bbqCookingImg from "@/assets/photos/bbq-cooking.png";
import gardenPartyImg from "@/assets/photos/garden-party.png";
import gardeningGroupImg from "@/assets/photos/gardening-group.png";
import gardeningPairImg from "@/assets/photos/gardening-pair.png";
import wateringPlantsImg from "@/assets/photos/watering-plants.png";
import craftSessionImg from "@/assets/photos/craft-session.png";

const posts = [
  { caption: "Garden time 🌿", image: bbqCookingImg },
  { caption: "Summer Garden Party", image: gardenPartyImg },
  { caption: "Growing Together", image: gardeningGroupImg },
  { caption: "Potting & Planting", image: gardeningPairImg },
  { caption: "Watering the Garden", image: wateringPlantsImg },
  { caption: "Creative Afternoons", image: craftSessionImg },
];

const InstagramGrid = () => (
  <section className="section-padding" style={{ backgroundColor: "#FFFFFF" }}>
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
            <div className="group relative aspect-square rounded-lg overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
              <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
              {/* Instagram icon overlay */}
              <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full p-1.5">
                <Instagram size={14} strokeWidth={1.5} className="text-foreground/50" />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <Heart size={22} className="text-primary-foreground" fill="currentColor" />
                <Eye size={22} className="text-primary-foreground" />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/chamarelhealthcare"
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
