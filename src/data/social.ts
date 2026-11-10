import { Instagram, Facebook, Linkedin, type LucideIcon } from "lucide-react";

/**
 * Single source of truth for Chamarel's social profile URLs.
 * Verified 10 Nov 2026:
 *  - LinkedIn: company page 146629908, public slug "chamarel-healthcare"
 *  - Instagram: @chamarelhealthcare (live)
 *  - Facebook: no public Page exists yet. Set the URL here once one is published
 *    and every Facebook link on the site (footer, sidebar, contact block) appears automatically.
 */
export const SOCIAL_URLS = {
  linkedin: "https://www.linkedin.com/company/chamarel-healthcare",
  instagram: "https://www.instagram.com/chamarelhealthcare/",
  facebook: null as string | null,
};

export type SocialLink = { label: string; href: string; icon: LucideIcon };

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: SOCIAL_URLS.linkedin, icon: Linkedin },
  { label: "Instagram", href: SOCIAL_URLS.instagram, icon: Instagram },
  ...(SOCIAL_URLS.facebook ? [{ label: "Facebook", href: SOCIAL_URLS.facebook, icon: Facebook }] : []),
];
