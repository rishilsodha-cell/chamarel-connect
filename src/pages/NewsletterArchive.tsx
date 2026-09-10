import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import NewsletterReader from "@/components/NewsletterReader";
import { newsletters } from "@/data/newsletters";

const NewsletterArchive = () => {
  const editions = [...newsletters].sort((a, b) => b.date.localeCompare(a.date));
  const single = editions.length === 1;

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-20 md:py-24">
        <div className="container-narrow text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Monthly Newsletter</h1>
            <p className="mt-5 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              News, photos and moments from Chamarel Healthcare — published every month for the
              families, friends and staff who make it what it is.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div
            className={
              single
                ? "max-w-md mx-auto"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            }
          >
            {editions.map((n, i) => (
              <FadeIn key={n.slug} delay={i * 0.1}>
                <article
                  className="bg-card rounded-2xl overflow-hidden h-full flex flex-col"
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  <NewsletterReader
                    newsletter={n}
                    ariaLabel={`Read the ${n.title} newsletter`}
                    className="block w-full cursor-pointer group"
                  >
                    <img
                      src={n.cover}
                      alt={`${n.title} newsletter cover`}
                      loading="lazy"
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </NewsletterReader>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-medium mb-2">{n.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{n.summary}</p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <NewsletterReader
                        newsletter={n}
                        className="text-center px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
                      >
                        Read
                      </NewsletterReader>
                      <a
                        href={n.pdf}
                        download
                        className="text-center px-6 py-2.5 rounded-full text-sm font-semibold border-2 border-primary/70 text-primary hover:bg-primary/5 transition-all duration-250"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsletterArchive;
