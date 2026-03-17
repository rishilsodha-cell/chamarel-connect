import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { X } from "lucide-react";

import craftSessionImg from "@/assets/photos/craft-session.png";
import bbqCookingImg from "@/assets/photos/bbq-cooking.png";
import gardeningPairImg from "@/assets/photos/gardening-pair.png";
import gardeningGroupImg from "@/assets/photos/gardening-group.png";
import zooVisitImg from "@/assets/photos/zoo-visit.png";
import cafeOutingImg from "@/assets/photos/cafe-outing.png";
import gardenPartyImg from "@/assets/photos/garden-party.png";
import gardeningPottingImg from "@/assets/photos/gardening-potting.png";
import wateringPlantsImg from "@/assets/photos/watering-plants.png";

const tabs = ["In the Home", "Out & About", "Our Property"] as const;
type Tab = (typeof tabs)[number];

interface GalleryImage {
  src: string;
  caption: string;
}

const homeImages: GalleryImage[] = [
  { src: craftSessionImg, caption: "Creative Afternoons — Craft Session" },
  { src: bbqCookingImg, caption: "BBQ Cooking with Rainbow Bunting" },
  { src: gardeningPairImg, caption: "Potting & Planting Together" },
  { src: gardeningGroupImg, caption: "Gardening as a Team" },
];

const outImages: GalleryImage[] = [
  { src: zooVisitImg, caption: "Zoo Visit — Meeting the Zebras" },
  { src: cafeOutingImg, caption: "Café Day Out — Cake & Thumbs Up!" },
  { src: gardenPartyImg, caption: "Summer Garden Party with Live Guitar" },
];

const propertyImages: GalleryImage[] = [
  { src: wateringPlantsImg, caption: "Our Gardens — Watering the Plants" },
  { src: gardeningPottingImg, caption: "Rear Garden — Potting Area" },
  { src: gardenPartyImg, caption: "Garden & Outdoor Space" },
];

const imagesForTab: Record<Tab, GalleryImage[]> = {
  "In the Home": homeImages,
  "Out & About": outImages,
  "Our Property": propertyImages,
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<Tab>("In the Home");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <Layout>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.caption}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
            {lightbox.caption}
          </p>
        </div>
      )}

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

          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagesForTab[activeTab].map((img, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightbox(img)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm font-medium text-primary-foreground">{img.caption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
