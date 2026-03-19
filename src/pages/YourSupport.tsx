import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import residentialCareImg from "@/assets/photos/residential-care-home.png";
import supportedLivingImg from "@/assets/photos/supported-living.png";

const supports = [
  {
    title: "Residential Care Home",
    desc: "Our purpose-built residential care home provides a safe, warm and homely environment with 24/7 specialist support. Designed with dignity and independence at its heart.",
    photo: residentialCareImg,
    cta: "Call Us Now",
    href: "tel:01954789856",
    external: false,
    variant: "default" as const,
  },
  {
    title: "Supported Living",
    desc: "Live independently in your own home or shared setting with the right level of flexible, person-centred support around you.",
    photo: supportedLivingImg,
    cta: "Find Out More",
    href: "/referral",
    external: false,
    variant: "default" as const,
  },
  {
    title: "Respite Care",
    desc: "Short-term, planned breaks for individuals and their families — giving everyone the rest and breathing space they need.",
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
    cta: "Make a Referral",
    href: "/referral",
    external: false,
    variant: "default" as const,
  },
  {
    title: "Day Opportunities",
    desc: "Structured, meaningful activities that promote skills, confidence and social connection — from gardening and arts to community outings and supported employment.",
    photo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
    cta: "Follow Our Activities on Instagram",
    href: "https://www.instagram.com/chamarelhealthcare",
    external: true,
    variant: "instagram" as const,
  },
  {
    title: "Community Care Services",
    desc: "Flexible, person-centred community support delivered in the individual's own home and local area — helping people live safely and independently.",
    photo: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600",
    cta: "Learn More",
    href: "/community-care-services",
    external: false,
    variant: "default" as const,
  },
];

const YourSupport = () => (
  <Layout>
    {/* Hero */}
    <section
      className="flex items-center justify-center text-center px-5"
      style={{ height: 220, backgroundColor: "#00706B" }}
    >
      <div>
        <h1 className="text-[48px] font-bold text-white leading-tight">Your Support</h1>
        <p className="mt-3 text-[18px] text-white/90 max-w-2xl mx-auto">
          Finding the right support is a big decision. We're here to help you every step of the way.
        </p>
      </div>
    </section>

    {/* Cards */}
    <section className="section-padding">
      <div className="container-narrow">
        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {supports.slice(0, 3).map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <SupportCard {...s} />
            </FadeIn>
          ))}
        </div>
        {/* Bottom row: 2 cards centred */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-[66.666%] lg:mx-auto items-stretch">
          {supports.slice(3).map((s, i) => (
            <FadeIn key={i + 3} delay={(i + 3) * 0.08}>
              <SupportCard {...s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

function SupportCard({
  title,
  desc,
  photo,
  cta,
  href,
  external,
  variant,
}: (typeof supports)[number]) {
  const isInternal = !external && href.startsWith("/");
  const buttonBase =
    "block w-full text-center py-3 px-4 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:opacity-90";
  const buttonStyle =
    variant === "instagram"
      ? { background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }
      : { backgroundColor: "#00706B" };

  const buttonEl = isInternal ? (
    <Link to={href} className={`${buttonBase} text-white`} style={buttonStyle}>
      {cta}
    </Link>
  ) : (
    <a
      href={href}
      className={`${buttonBase} text-white`}
      style={buttonStyle}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {cta}
    </a>
  );

  return (
    <div
      className="bg-card rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 hover:-translate-y-1"
      style={{
        borderRadius: 16,
        boxShadow: "var(--card-shadow)",
        borderTop: "4px solid #00706B",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
    >
      <img
        src={photo}
        alt={title}
        className="w-full object-cover"
        style={{ height: 200 }}
        loading="lazy"
      />
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{desc}</p>
        {buttonEl}
      </div>
    </div>
  );
}

export default YourSupport;
