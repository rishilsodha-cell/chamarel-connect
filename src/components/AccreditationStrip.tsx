import { BadgeCheck } from "lucide-react";
import FadeIn from "./FadeIn";

const accreditations = [
  {
    label: "CQC Inspected & Rated Good",
    image: "https://www.cqc.org.uk/sites/default/files/2023-10/cqc_rated_good_colour.png",
    href: "https://www.cqc.org.uk",
  },
  {
    label: "National Living Wage Employer",
    image: "https://www.livingwage.org.uk/sites/default/files/LW_2023_logo_Employer_cmyk%20%281%29.png",
    href: "https://www.livingwage.org.uk",
  },
  {
    label: "Food Hygiene Rating: 5",
    image: "https://www.food.gov.uk/sites/default/files/media/document/fhrs-5-en-gb.png",
    href: "https://www.food.gov.uk",
  },
];

const AccreditationStrip = () => (
  <section className="py-12 bg-card">
    <div className="container-narrow">
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-end justify-items-center">
          {accreditations.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center gap-3 group"
            >
              <img
                src={item.image}
                alt={item.label}
                className="h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </a>
          ))}
          {/* Staff Verified — styled badge */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                <BadgeCheck size={36} strokeWidth={1.5} className="text-accent" />
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Staff Verified</span>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default AccreditationStrip;
