import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck, Twitter, Linkedin, Mail, BookOpen, Clock } from "lucide-react";
import { defaultAuthor } from "@/components/AuthorBox";
import { blogPosts } from "@/data/blogPosts";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/author/")({
  head: () => {
    const author = defaultAuthor;
    const url = `${SITE}/author`;
    const title = `${author.name} — Author & Culinary Specialist Profile | Waffle House Menu`;
    const description = `Read culinary reviews, menu research, and nutritional guides written by ${author.name}, ${author.role}.`;

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE}/#author`,
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: `${SITE}${author.avatar}`,
      url: `${SITE}/author`,
      sameAs: [
        author.social.linkedin,
        author.social.twitter,
        author.website,
      ].filter(Boolean),
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "University of Warwick",
      },
      hasCredential: author.credentials.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c,
      })),
      knowsAbout: [
        "Restaurant Nutrition & Calorie Data",
        "FDA Food Labeling Standards",
        "American Diner Culture",
        "Waffle House Menu & Prices",
      ],
      homeLocation: {
        "@type": "Place",
        name: "Atlanta, Georgia",
      },
      worksFor: {
        "@type": "Organization",
        name: "Waffle House Menu Guide",
      },
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${SITE}${author.avatar}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(personSchema),
        },
      ],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const author = defaultAuthor;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
            >
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">
              Author Profile
            </span>
          </nav>

          {/* Profile Card */}
          <div className="mt-8 flex flex-col md:flex-row items-start gap-8">
            <div className="shrink-0">
              <div className="h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-amber-400 bg-muted shadow-lg">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {author.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified EEAT Author
                </span>
              </div>
              <p className="mt-1 font-display text-lg font-medium text-amber-700">
                {author.role}
              </p>

              <p className="mt-4 text-base leading-relaxed text-ink-soft max-w-3xl">
                {author.bio}
              </p>

              {/* Credentials */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft mr-2">
                  Credentials &amp; Expertise:
                </span>
                {author.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="rounded-lg border border-border bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-xs"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-4">
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-foreground hover:border-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Twitter className="h-3.5 w-3.5" /> Twitter / X
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-foreground hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                )}
                {author.social.email && (
                  <a
                    href={author.social.email}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:bg-primary hover:text-black transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" /> Contact Author
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Articles Section */}
      <section className="container-editorial py-12 md:py-16">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-5 w-5 text-amber-500" />
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Articles &amp; Guides by {author.name} ({blogPosts.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block aspect-[16/10] overflow-hidden bg-muted"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="rounded-md bg-amber-50 px-2.5 py-0.5 font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
                    {post.category}
                  </span>
                  <span className="text-ink-soft flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readMinutes} min read
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2 flex-1">
                  {post.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-border/60 text-xs text-ink-soft">
                  Updated {post.lastUpdated}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
