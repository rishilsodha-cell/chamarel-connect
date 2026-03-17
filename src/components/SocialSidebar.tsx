import { Instagram, Facebook, Linkedin } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/chamarelhealthcare" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/chamarelhealthcare" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/chamarelhealthcare" },
];

const SocialSidebar = () => (
  <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 pl-3">
    {socials.map((s) => (
      <a
        key={s.label}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.label}
        className="group flex items-center gap-0 overflow-hidden rounded-r-full bg-card ring-1 ring-border transition-all duration-300 hover:shadow-md"
      >
        <span className="flex items-center justify-center w-10 h-10 text-accent group-hover:text-primary transition-colors shrink-0">
          <s.icon size={18} strokeWidth={1.5} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-foreground/80 transition-all duration-300 group-hover:max-w-[6rem] group-hover:pr-4">
          {s.label}
        </span>
      </a>
    ))}
  </div>
);

export default SocialSidebar;
