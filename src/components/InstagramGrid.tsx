import { useCallback, useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { SOCIAL_URLS } from "@/data/social";

/** Behold JSON feed for @chamarelhealthcare. Replaces the <behold-widget> embed, whose
 * styling clashed with the site and whose tiles did not link through to the posts. */
const FEED_URL = "https://feeds.behold.so/fKrNbOuUZjlkttJLOmjp";

type Post = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  prunedCaption?: string;
  caption?: string;
  sizes?: Record<"small" | "medium" | "large" | "full", { mediaUrl: string } | undefined>;
  thumbnailUrl?: string;
  mediaUrl?: string;
};

/** Behold's resized copies (behold.pictures) sometimes 502 for recent posts, so each tile walks
 * a list of candidates and falls back to Instagram's own CDN URL. */
const candidates = (p: Post) =>
  [p.sizes?.medium?.mediaUrl, p.sizes?.large?.mediaUrl, p.sizes?.small?.mediaUrl, p.thumbnailUrl, p.mediaUrl].filter(
    (u): u is string => !!u
  );

const Tile = ({ post, onFail }: { post: Post; onFail: (id: string) => void }) => {
  const srcs = candidates(post);
  const [idx, setIdx] = useState(0);
  const caption = (post.prunedCaption ?? post.caption ?? "").trim();
  const failed = idx >= srcs.length;
  useEffect(() => {
    if (failed) onFail(post.id);
  }, [failed, onFail, post.id]);
  if (failed) return null;
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={caption ? `Instagram post: ${caption.slice(0, 80)}` : "View this post on Instagram"}
      className="group relative block aspect-square overflow-hidden rounded-2xl bg-secondary"
    >
      <img
          src={srcs[idx]}
          alt=""
          loading="lazy"
          onError={() => setIdx((i) => i + 1)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 p-4">
        <p className="text-primary-foreground text-xs leading-snug line-clamp-3">{caption}</p>
      </div>
    </a>
  );
};

const InstagramGrid = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failedIds, setFailedIds] = useState<string[]>([]);
  // A post whose image cannot be loaded from any source is dropped, never shown as a blank tile.
  const markFailed = useCallback((id: string) => setFailedIds((f) => (f.includes(id) ? f : [...f, id])), []);
  const visible = (posts ?? []).filter((p) => !failedIds.includes(p.id));

  useEffect(() => {
    let alive = true;
    fetch(FEED_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => alive && setPosts((d.posts ?? []).slice(0, 9)))
      .catch(() => alive && setPosts([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="section-padding" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-narrow">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-2">Follow Our Journey</h2>
          <a
            href={SOCIAL_URLS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-accent font-medium text-sm mb-10 hover:text-primary transition-colors"
          >
            @chamarelhealthcare
          </a>
        </FadeIn>

        {posts === null && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-secondary animate-pulse" />
            ))}
          </div>
        )}

        {posts && visible.length > 0 && (
          <div
            className={`grid ${visible.length % 2 === 0 ? "grid-cols-2" : "grid-cols-3"} md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto`}
          >
            {visible.map((p) => (
              <Tile key={p.id} post={p} onFail={markFailed} />
            ))}
          </div>
        )}

        <FadeIn delay={0.2}>
          <div className="text-center mt-10">
            <a
              href={SOCIAL_URLS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 border-2 border-[#00706B] text-[#00706B] bg-white hover:bg-[#00706B] hover:text-white px-8 py-3"
            >
              <Instagram size={16} strokeWidth={1.5} />
              Follow us on Instagram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default InstagramGrid;
