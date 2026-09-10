import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Newsletter } from "@/data/newsletters";

interface ReaderTriggerProps {
  newsletter: Newsletter;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Renders a button that opens the newsletter PDF in a modal on md+ screens,
 * and in a new tab on small screens (iOS Safari cannot render PDFs in iframes).
 */
const NewsletterReader = ({ newsletter, className, children, ariaLabel }: ReaderTriggerProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <a
        href={newsletter.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={ariaLabel}>
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-base font-medium">{newsletter.title} Newsletter</DialogTitle>
          </DialogHeader>
          <iframe
            src={`${newsletter.pdf}#toolbar=0&view=FitH`}
            title={`${newsletter.title} newsletter`}
            className="w-full aspect-video rounded-xl border border-border"
          />
          <a
            href={newsletter.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Open in a new tab ↗
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsletterReader;
