import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { newsletterPages, type Newsletter } from "@/data/newsletters";

interface ReaderTriggerProps {
  newsletter: Newsletter;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Opens the newsletter as a scrollable stack of page images, on every screen size.
 * Deliberately NOT a PDF iframe: Android Chrome and the Instagram/WhatsApp in-app browsers
 * cannot render a PDF inside a page, so the old reader showed nothing or forced a download.
 */
const NewsletterReader = ({ newsletter, className, children, ariaLabel }: ReaderTriggerProps) => {
  const [open, setOpen] = useState(false);
  const pages = newsletterPages(newsletter);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={ariaLabel}>
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[96vw] max-h-[92vh] overflow-y-auto p-3 sm:p-6 gap-3">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-base font-medium text-left">{newsletter.title} Newsletter</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {pages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${newsletter.title} newsletter, page ${i + 1} of ${pages.length}`}
                loading={i < 2 ? "eager" : "lazy"}
                className="w-full h-auto rounded-lg border border-border bg-secondary"
                style={{ aspectRatio: "1466 / 825" }}
              />
            ))}
          </div>
          <a
            href={newsletter.pdf}
            download
            className="self-start text-sm font-medium text-accent hover:text-primary transition-colors"
          >
            Download the PDF ↓
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsletterReader;
