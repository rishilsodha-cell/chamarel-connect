import { BadgeCheck } from "lucide-react";
import FadeIn from "./FadeIn";

const CQCBadge = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" rx="10" fill="#00474C" />
    <text x="60" y="38" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22" fontFamily="system-ui, sans-serif">CQC</text>
    <text x="48" y="58" textAnchor="middle" fill="#FFD700" fontSize="13" fontFamily="system-ui, sans-serif">★</text>
    <text x="72" y="58" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui, sans-serif">Rated Good</text>
  </svg>
);

const NLWBadge = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" rx="10" fill="#1B3A6B" />
    <text x="60" y="38" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22" fontFamily="system-ui, sans-serif">NLW</text>
    <text x="60" y="58" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui, sans-serif">National Living Wage</text>
  </svg>
);

const FoodHygieneBadge = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" rx="10" fill="#00843D" />
    <text x="60" y="48" textAnchor="middle" fill="white" fontWeight="bold" fontSize="32" fontFamily="system-ui, sans-serif">5</text>
    <text x="60" y="66" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui, sans-serif">Food Hygiene</text>
  </svg>
);

const badges = [
  { label: "CQC Inspected & Rated Good", href: "https://www.cqc.org.uk", Badge: CQCBadge },
  { label: "National Living Wage Employer", href: "https://www.livingwage.org.uk", Badge: NLWBadge },
  { label: "Food Hygiene Rating: 5", href: "https://www.food.gov.uk", Badge: FoodHygieneBadge },
];

const AccreditationStrip = () => (
  <section className="py-12 bg-card">
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
              <div className="rounded-xl shadow-md transition-transform duration-200 group-hover:scale-105 overflow-hidden">
                <item.Badge />
              </div>
              <span className="text-xs font-medium" style={{ color: "#444", fontSize: "12px" }}>{item.label}</span>
            </a>
          ))}
          {/* Staff Verified — styled badge */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                <BadgeCheck size={36} strokeWidth={1.5} className="text-accent" />
              </div>
            </div>
            <span className="text-xs font-medium" style={{ color: "#444", fontSize: "12px" }}>Staff Verified</span>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default AccreditationStrip;
