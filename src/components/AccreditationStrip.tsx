import FadeIn from "./FadeIn";
import cqcLogo from "@/assets/badges/cqc-good.webp";
import livingWageLogo from "@/assets/badges/living-wage.png";
import foodHygieneLogo from "@/assets/badges/food-hygiene.png";
import disabilityConfidentLogo from "@/assets/badges/disability-confident.jpg";

const badges = [
  { label: "CQC Inspected & Rated Good", href: "https://www.cqc.org.uk", image: cqcLogo },
  { label: "National Living Wage Employer", href: "https://www.livingwage.org.uk", image: livingWageLogo },
  { label: "Food Hygiene Rating: 5", href: "https://www.food.gov.uk", image: foodHygieneLogo },
  { label: "Disability Confident Employer", href: "https://www.gov.uk/disability-confident", image: disabilityConfidentLogo },
];

const AccreditationStrip = () => (
  <section className="py-10" style={{ backgroundColor: "#FFFFFF", paddingTop: 40, paddingBottom: 40 }}>
    <div className="container-narrow">
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-end justify-items-center">
          {badges.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="h-20 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
                />
              </div>
              <span style={{ color: "#666666", fontSize: 12 }} className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default AccreditationStrip;
