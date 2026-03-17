import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import homeFrontImg from "@/assets/photos/home-front.png";
import drivewayDuskImg from "@/assets/photos/driveway-dusk.png";
import gardenSunsetImg from "@/assets/photos/garden-sunset.png";

const photos = [
  { src: homeFrontImg, alt: "Care home front exterior with warm light in doorway" },
  { src: drivewayDuskImg, alt: "Illuminated driveway at dusk lined with bollard lights" },
  { src: gardenSunsetImg, alt: "Rear garden at sunset with wide lawn and pink sky" },
];

const OurHome = () => (
  <section className="py-20" style={{ backgroundColor: "#F9F7F4" }}>
    <div className="container-narrow">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">Our Home</h2>
        <p className="text-center text-muted-foreground max-w-[600px] mx-auto mb-12">
          A safe, beautiful, and welcoming space — purpose-built for the people we support, with comfort, dignity, and independence at its heart.
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="rounded-xl overflow-hidden group cursor-pointer border-b-4 border-transparent hover:border-primary transition-all duration-300">
              <div className="h-[280px] overflow-hidden rounded-xl">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-primary transition-colors">
            <ArrowRight size={16} /> View full gallery
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default OurHome;
