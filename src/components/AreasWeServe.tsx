import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const locations = [
  "North London", "South London", "North West London", "Cambridgeshire",
  "Longstanton", "Surbiton", "Middlesex", "Barnet", "Wembley", "Edgware", "Ruislip",
];

interface Props {
  slim?: boolean;
}

const AreasWeServe = ({ slim = false }: Props) => (
  <section className={slim ? "py-12" : "py-16"} style={{ backgroundColor: "#F0FAF9" }}>
    <div className="container-narrow">
      <FadeIn>
        <h2 className="text-2xl md:text-[32px] font-bold text-center mb-3" style={{ color: "#00706B" }}>
          Areas We Serve
        </h2>
        {!slim && (
          <p className="text-center text-muted-foreground max-w-[600px] mx-auto mb-8">
            Chamarel Healthcare provides specialist care and community support across London and the surrounding areas. Contact us to discuss support in your specific location.
          </p>
        )}
        {slim && (
          <p className="text-center text-muted-foreground max-w-[600px] mx-auto mb-8 text-sm">
            Specialist care and community support across London and the surrounding areas.
          </p>
        )}
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {locations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium bg-white"
              style={{ border: "1.5px solid #00706B", color: "#00706B", padding: "8px 20px" }}
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
          <a href="/#get-in-touch" className="underline" style={{ color: "#00706B" }}>
            Contact us
          </a>
          {" "}— we may still be able to help.
        </p>
      </FadeIn>
    </div>
  </section>
);

export default AreasWeServe;
