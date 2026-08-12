import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, HelpCircle, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { getAllBlogPosts } from "@/data/blogStore";
import { ReadingProgress } from "@/components/ReadingProgress";
import { FaqSection } from "@/components/FaqSection";
import { SocialShare } from "@/components/SocialShare";
import { TableOfContents } from "@/components/TableOfContents";
import { AuthorBox } from "@/components/AuthorBox";
import { Sidebar } from "@/components/Sidebar";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug) || blogPosts[0];
    const url = `${SITE}/blog/${post.slug}`;
    const image = `${SITE}${post.image}`;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.seoTitle || post.title,
      description: post.metaDescription || post.summary,
      image: [image],
      datePublished: post.publishDate,
      dateModified: post.lastUpdated,
      author: {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.role,
        url: `${SITE}/author`,
      },
      publisher: {
        "@type": "Organization",
        name: "Waffle House Menu Guide",
        url: SITE,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    };

    const faqSchema = post.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    } : null;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    };

    const scripts = [
      { type: "application/ld+json", children: JSON.stringify(articleSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ];

    if (faqSchema) {
      scripts.push({ type: "application/ld+json", children: JSON.stringify(faqSchema) });
    }

    return {
      meta: [
        { title: post.seoTitle || post.title },
        { name: "description", content: post.metaDescription || post.summary },
        { property: "og:title", content: post.seoTitle || post.title },
        { property: "og:description", content: post.metaDescription || post.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.seoTitle || post.title },
        { name: "twitter:description", content: post.metaDescription || post.summary },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  const allPosts = getAllBlogPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const post = postIndex !== -1 ? allPosts[postIndex] : allPosts[0];

  const prevPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-white">
      {/* Top Reading Progress Bar */}
      <ReadingProgress />

      {/* Page Header */}
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-10 md:py-14">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
            >
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
            >
              Blog <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary/20 px-3 py-1.5 text-foreground truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl max-w-4xl text-foreground">
            {post.title}
          </h1>

          {/* Meta Info Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-7 w-7 rounded-full object-cover border border-amber-400"
              />
              <span>
                By{" "}
                <Link to="/author" className="font-semibold text-foreground hover:text-primary underline">
                  {post.author.name}
                </Link>
              </span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-amber-600" /> Published {post.publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-emerald-600" /> Updated {post.lastUpdated}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" /> {post.readMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Article Body (8 Cols) */}
          <article className="lg:col-span-8 min-w-0">
            {/* Featured Image */}
            <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
                loading="eager"
              />
            </div>

            {/* Social Share Buttons */}
            <SocialShare title={post.title} />

            {/* Quick Answer / Executive Summary Box */}
            {post.quickAnswer && (
              <div className="my-8 rounded-2xl border border-amber-300 bg-amber-50/80 p-6 shadow-sm">
                <div className="flex items-center gap-2 font-display text-base font-semibold text-amber-900">
                  <BookOpen className="h-5 w-5 text-amber-600" />
                  Quick Answer / Key Takeaway
                </div>
                <p className="mt-2 text-sm leading-relaxed text-amber-950 font-medium">
                  {post.quickAnswer}
                </p>
              </div>
            )}

            {/* Table of Contents */}
            <TableOfContents items={post.toc} />

            {/* Content Sections */}
            <div className="mt-8 space-y-10 text-base leading-relaxed text-ink-soft">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                  <h2 className="font-display text-2xl font-semibold text-foreground pt-4 border-t border-border/40 first:border-0 first:pt-0">
                    {section.h2}
                  </h2>
                  <p className="text-foreground/90">{section.content}</p>

                  {/* Optional Bullet Points */}
                  {section.bulletPoints && (
                    <ul className="my-4 space-y-2 pl-6 list-disc text-foreground">
                      {section.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  )}

                  {/* Optional Comparison Table */}
                  {section.table && (
                    <div className="my-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-[#FAF9F6] border-b border-border">
                            <tr>
                              {section.table.headers.map((h, i) => (
                                <th
                                  key={i}
                                  className="px-4 py-3 text-left font-bold text-foreground uppercase tracking-wider text-xs"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {section.table.rows.map((row, ri) => (
                              <tr key={ri} className="hover:bg-surface/50 transition-colors">
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className={`px-4 py-3 ${
                                      ci === 0 ? "font-semibold text-foreground" : "text-ink-soft"
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Optional Subsections H3 */}
                  {section.subSections && (
                    <div className="space-y-6 mt-6">
                      {section.subSections.map((sub) => (
                        <div key={sub.id} id={sub.id} className="scroll-mt-24 pl-4 border-l-2 border-primary">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {sub.h3}
                          </h3>
                          <p className="mt-2 text-sm text-ink-soft">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* FAQs Section */}
            {post.faqs.length > 0 && (
              <div id="faqs" className="mt-12 scroll-mt-24">
                <FaqSection
                  eyebrow="Article FAQ"
                  heading="Frequently Asked Questions"
                  intro=""
                  items={post.faqs}
                  bgClassName="bg-[#FAF9F6] rounded-2xl border border-border"
                />
              </div>
            )}

            {/* Bottom Social Share */}
            <SocialShare title={post.title} />

            {/* Author Box */}
            <AuthorBox author={post.author} />

            {/* Previous & Next Post Navigation */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-8">
              {prevPost ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: prevPost.slug }}
                  className="group rounded-2xl border border-border bg-white p-5 transition-all hover:border-primary hover:shadow-md flex flex-col justify-between"
                >
                  <span className="flex items-center gap-1 text-xs font-semibold text-ink-soft uppercase tracking-wider group-hover:text-primary">
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous Article
                  </span>
                  <span className="mt-2 font-display text-sm font-semibold text-foreground line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}

              {nextPost && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: nextPost.slug }}
                  className="group rounded-2xl border border-border bg-white p-5 transition-all hover:border-primary hover:shadow-md flex flex-col justify-between text-right"
                >
                  <span className="flex items-center justify-end gap-1 text-xs font-semibold text-ink-soft uppercase tracking-wider group-hover:text-primary">
                    Next Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-2 font-display text-sm font-semibold text-foreground line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Related Guides &amp; Articles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((rel) => (
                    <article
                      key={rel.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-primary"
                    >
                      <Link
                        to="/blog/$slug"
                        params={{ slug: rel.slug }}
                        className="block aspect-[16/10] overflow-hidden bg-muted"
                      >
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                          {rel.category}
                        </span>
                        <h4 className="mt-1 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          <Link to="/blog/$slug" params={{ slug: rel.slug }}>
                            {rel.title}
                          </Link>
                        </h4>
                        <p className="mt-2 text-xs text-ink-soft line-clamp-2 flex-1">
                          {rel.summary}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar currentSlug={post.slug} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
