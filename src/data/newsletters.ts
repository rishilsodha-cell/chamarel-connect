export type Newsletter = {
  slug: string; // "2026-08"
  title: string; // "August 2026"
  date: string; // ISO, used for sorting newest-first
  summary: string;
  cover: string; // path in /public
  pdf: string; // path in /public
  /** Page images rendered from the PDF: /public/newsletters/<slug>/page-1.webp … page-N.webp */
  pageCount: number;
};

/** The reader shows these images, not the PDF: phones and in-app browsers (Instagram,
 * WhatsApp, Android Chrome) cannot display a PDF inside the page. */
export const newsletterPages = (n: Newsletter) =>
  Array.from({ length: n.pageCount }, (_, i) => `/newsletters/${n.slug}/page-${i + 1}.webp`);

export const newsletters: Newsletter[] = [
  {
    slug: "2026-09",
    title: "September 2026",
    date: "2026-09-30",
    summary:
      "Our second edition. Rose and Dipa introduce themselves and the work they do, there are foot spas, shopping trips, a Ludo afternoon and a new room to settle into, and the month finishes with a day by the sea at Great Yarmouth.",
    cover: "/newsletters/2026-09-cover.png",
    pdf: "/newsletters/chamarel-newsletter-2026-09.pdf",
    pageCount: 8,
  },
  {
    slug: "2026-08",
    title: "August 2026",
    date: "2026-08-31",
    summary:
      "Our very first newsletter. Meet Netty and Ria from the team, catch up with Rose in her first months as manager, and see the moments that made August — Sandra's bench in the garden, Danny and Luna, and plenty more besides.",
    cover: "/newsletters/2026-08-cover.png",
    pdf: "/newsletters/chamarel-newsletter-2026-08.pdf",
    pageCount: 7,
  },
];

export const latestNewsletter = [...newsletters].sort((a, b) =>
  b.date.localeCompare(a.date)
)[0];
