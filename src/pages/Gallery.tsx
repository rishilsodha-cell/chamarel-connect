import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Camera } from "lucide-react";

const tabs = ["In the Home", "Out in the Community", "Events & Celebrations"] as const;

type Tab = (typeof tabs)[number];

interface PlaceholderImage {
  caption: string;
  aspect: string; // tailwind aspect class
  hue: string; // bg color class
}

const homeImages: PlaceholderImage[] = [
  { caption: "Cosy Living Room", aspect: "aspect-[3/4]", hue: "bg-primary/10" },
  { caption: "Mealtime Together", aspect: "aspect-square", hue: "bg-accent/10" },
  { caption: "Garden Views", aspect: "aspect-[4/5]", hue: "bg-secondary" },
  { caption: "Staff & Residents", aspect: "aspect-[3/4]", hue: "bg-primary/8" },
  { caption: "Communal Kitchen", aspect: "aspect-square", hue: "bg-accent/8" },
  { caption: "Sunny Lounge", aspect: "aspect-[4/5]", hue: "bg-primary/12" },
  { caption: "Bedside Reading", aspect: "aspect-[3/4]", hue: "bg-secondary" },
  { caption: "Game Night", aspect: "aspect-square", hue: "bg-accent/10" },
  { caption: "Morning Coffee", aspect: "aspect-[4/5]", hue: "bg-primary/10" },
  { caption: "Art Corner", aspect: "aspect-[3/4]", hue: "bg-accent/12" },
  { caption: "Garden Path", aspect: "aspect-square", hue: "bg-secondary" },
  { caption: "Evening Together", aspect: "aspect-[4/5]", hue: "bg-primary/8" },
];

const communityImages: PlaceholderImage[] = [
  { caption: "Park Walk", aspect: "aspect-video", hue: "bg-accent/10" },
  { caption: "Shopping Trip", aspect: "aspect-video", hue: "bg-primary/10" },
  { caption: "Art Class", aspect: "aspect-video", hue: "bg-secondary" },
  { caption: "Community Event", aspect: "aspect-video", hue: "bg-accent/8" },
  { caption: "Supported Holiday", aspect: "aspect-video", hue: "bg-primary/12" },
  { caption: "Hydrotherapy Session", aspect: "aspect-video", hue: "bg-accent/10" },
  { caption: "Café Visit", aspect: "aspect-square", hue: "bg-primary/10" },
  { caption: "Library Trip", aspect: "aspect-square", hue: "bg-secondary" },
  { caption: "Bowling Day Out", aspect: "aspect-square", hue: "bg-accent/12" },
  { caption: "Nature Walk", aspect: "aspect-square", hue: "bg-primary/8" },
];

const eventsImages: PlaceholderImage[] = [
  { caption: "Christmas Celebration, 2024", aspect: "aspect-video", hue: "bg-primary/10" },
  { caption: "Birthday Party", aspect: "aspect-square", hue: "bg-accent/10" },
  { caption: "Summer BBQ", aspect: "aspect-video", hue: "bg-secondary" },
  { caption: "Community Outing, Spring 2024", aspect: "aspect-square", hue: "bg-primary/8" },
  { caption: "Staff Awards Ceremony", aspect: "aspect-video", hue: "bg-accent/12" },
  { caption: "Easter Egg Hunt", aspect: "aspect-square", hue: "bg-primary/12" },
  { caption: "Halloween Fun", aspect: "aspect-video", hue: "bg-secondary" },
  { caption: "New Year's Celebration", aspect: "aspect-square", hue: "bg-accent/10" },
];

const ImagePlaceholder = ({ image }: { image: PlaceholderImage }) => (
  <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
    <div className={`${image.aspect} ${image.hue} flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
      <Camera className="w-8 h-8 text-muted-foreground/30" strokeWidth={1.5} />
    </div>
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <span className="text-xs font-medium text-primary-foreground">{image.caption}</span>
    </div>
  </div>
);

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<Tab>("In the Home");

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-center">
              Life at Chamarel
            </h1>
            <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              A glimpse into the warmth, connection, and joy that fills every day across our homes and communities.
            </p>
          </FadeIn>

          {/* Tabs */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mt-12 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* In the Home — Masonry grid */}
          {activeTab === "In the Home" && (
            <FadeIn>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {homeImages.map((img, i) => (
                  <ImagePlaceholder key={i} image={img} />
                ))}
              </div>
            </FadeIn>
          )}

          {/* Out in the Community — Scroll strip + grid */}
          {activeTab === "Out in the Community" && (
            <FadeIn>
              <div className="overflow-x-auto pb-4 -mx-5 px-5 mb-8">
                <div className="flex gap-4" style={{ width: "max-content" }}>
                  {communityImages.slice(0, 6).map((img, i) => (
                    <div key={i} className="w-72 flex-shrink-0">
                      <ImagePlaceholder image={{ ...img, aspect: "aspect-video" }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {communityImages.slice(6).map((img, i) => (
                  <ImagePlaceholder key={i} image={img} />
                ))}
              </div>
            </FadeIn>
          )}

          {/* Events — Timeline-style */}
          {activeTab === "Events & Celebrations" && (
            <FadeIn>
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-8">
                  {eventsImages.map((img, i) => (
                    <div
                      key={i}
                      className={`flex flex-col md:flex-row items-center gap-6 ${
                        i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="w-full md:w-5/12">
                        <ImagePlaceholder image={img} />
                      </div>
                      <div className="hidden md:flex w-2/12 justify-center">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                      </div>
                      <div className="w-full md:w-5/12 text-center md:text-left">
                        <p className="text-sm font-medium text-foreground/80">{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Admin note */}
          <FadeIn delay={0.15}>
            <div className="mt-16 p-6 rounded-2xl bg-secondary text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">📷 Upload Photos:</span> To add your real photos, click any image placeholder and upload directly.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
