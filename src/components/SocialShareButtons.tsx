import { Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
}

const SocialShareButtons = ({ title, url }: SocialShareButtonsProps) => {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, label: "Facebook" },
    { icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, label: "X" },
    { icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, label: "LinkedIn" },
    { icon: MessageCircle, href: `https://wa.me/?text=${encodedTitle}%20${encoded}`, label: "WhatsApp" },
  ];

  return (
    <div className="flex items-center gap-2 pt-3 border-t border-border/50">
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mr-1">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          className="p-1.5 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
        >
          <l.icon size={14} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
