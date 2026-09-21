export type Newsletter = {
  slug: string; // "2026-08"
  title: string; // "August 2026"
  date: string; // ISO, used for sorting newest-first
  summary: string;
  cover: string; // path in /public
  pdf: string; // path in /public
};

export const newsletters: Newsletter[] = [
  {
    slug: "2026-08",
    title: "August 2026",
    date: "2026-08-31",
    summary:
      "Our very first newsletter. Meet Netty and Ria from the team, catch up with Rose in her first months as manager, and see the moments that made August — Sandra's bench in the garden, Danny and Luna, and plenty more besides.",
    cover: "/newsletters/2026-08-cover.png",
    pdf: "/newsletters/chamarel-newsletter-2026-08.pdf",
  },
];

export const latestNewsletter = [...newsletters].sort((a, b) =>
  b.date.localeCompare(a.date)
)[0];
