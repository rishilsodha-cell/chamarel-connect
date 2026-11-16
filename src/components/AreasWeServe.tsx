import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const locations = ["North West London", "Cambridgeshire"];

interface Props {
  slim?: boolean;
}

const AreasWeServe = ({ slim = false }: Props) => (
  <section className={`${slim ? "py-12" : "py-16"} bg-secondary`}>
    <div className="container-narrow">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-4">
          Areas We Serve
        </h2>
        {!slim && (
          <p className="text-center text-muted-foreground max-w-[600px] mx-auto mb-8">
            Chamarel Healthcare provides specialist care and community support across North West London and Cambridgeshire. Contact us to discuss support in your specific location.
          </p>
        )}
        {slim && (
          <p className="text-center text-muted-foreground max-w-[600px] mx-auto mb-8 text-sm">
            Specialist care and community support across North West London and Cambridgeshire.
          </p>
        )}
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {locations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium bg-card text-primary border-[1.5px] border-primary"
              style={{ padding: "8px 20px" }}
            >
              <MapPin size={14} strokeWidth={2} />
              {loc}
            </span>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-center text-muted-foreground italic text-sm mt-8">
          Don't see your area?{" "}
          <a href="#contact" className="underline text-primary">
            Contact us
          </a>
          {" "}— we may still be able to help.
        </p>
      </FadeIn>
    </div>
  </section>
);

export default AreasWeServe;
