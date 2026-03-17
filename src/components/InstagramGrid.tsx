import { Instagram } from "lucide-react";
import FadeIn from "@/components/FadeIn";

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
      <div className="w-full max-w-[1200px] mx-auto">
        {/* @ts-ignore */}
        <behold-widget feed-id="1pnKiplpQrZiCgmIsOfJ"></behold-widget>
      </div>
      <FadeIn delay={0.3}>
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/chamarelhealthcare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{ border: "2px solid #00706B", color: "#00706B", padding: "12px 32px", backgroundColor: "#FFFFFF" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00706B"; e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; e.currentTarget.style.color = "#00706B"; }}
          >
            <Instagram size={16} strokeWidth={1.5} />
            Follow us on Instagram
          </a>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default InstagramGrid;
