import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import NewsletterReader from "@/components/NewsletterReader";
import { latestNewsletter } from "@/data/newsletters";

const NewsletterSection = () => {
  const n = latestNewsletter;
  if (!n) return null;

  return (
    <section id="newsletter" className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <FadeIn>
            <NewsletterReader
              newsletter={n}
              ariaLabel={`Read the ${n.title} newsletter`}
              className="block w-full cursor-pointer group"
            >
              <img
                src={n.cover}
                alt={`${n.title} newsletter cover`}
                loading="lazy"
                className="w-full aspect-video object-cover rounded-2xl ring-1 ring-primary-foreground/10 transition-all duration-300 group-hover:-translate-y-1"
                style={{ boxShadow: "var(--card-shadow)" }}
              />
            </NewsletterReader>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent/90 mb-3">Monthly Newsletter</p>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">{n.title}</h2>
              <p className="text-primary-foreground/75 leading-relaxed">{n.summary}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <NewsletterReader
                  newsletter={n}
                  className="w-full sm:w-auto text-center px-8 py-3 rounded-full font-semibold bg-background text-primary hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
                >
                  Read the newsletter
                </NewsletterReader>
                <a
                  href={n.pdf}
                  download
                  className="w-full sm:w-auto text-center px-8 py-3 rounded-full font-semibold border-2 border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-250"
                >
                  Download PDF
                </a>
              </div>

              <p className="mt-4 text-sm text-primary-foreground/60">A new edition every month</p>
              <Link
                to="/newsletter"
                className="inline-block mt-4 text-sm font-medium text-accent hover:text-primary-foreground transition-colors"
              >
                View past editions →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
