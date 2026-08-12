import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle, FileText, Trash2, Eye, ExternalLink, CheckCircle2, AlertTriangle, Sparkles, BookOpen, Search } from "lucide-react";
import { getAllBlogPosts, deleteCustomPost } from "@/data/blogStore";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({
    meta: [{ title: "Admin Blog Management CMS — Waffle House Menu" }, { name: "robots", content: "noindex, nofollow" }],
    links: [{ rel: "canonical", href: `${SITE}/admin/blog` }],
  }),
  component: AdminBlogDashboard,
});

function AdminBlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshPosts = () => {
    setPosts(getAllBlogPosts());
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const handleDelete = (slug: string) => {
    if (confirm(`Are you sure you want to delete "${slug}"?`)) {
      deleteCustomPost(slug);
      refreshPosts();
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Admin Header */}
      <header className="border-b border-border bg-white py-8 shadow-xs">
        <div className="container-editorial flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="chip">Admin CMS Portal</span>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
              Blog Article Publishing Suite
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Manage, publish, and audit SEO scores for all menu articles &amp; culinary guides.
            </p>
          </div>

          <Link
            to="/admin/create-post"
            className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
          >
            <PlusCircle className="h-5 w-5" /> Write New Article
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-editorial py-10">
        {/* Metrics Banner */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">Total Articles</span>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">{posts.length}</p>
            <span className="mt-1 block text-xs text-emerald-600 font-medium">✓ Active on Site</span>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">SEO Health Score</span>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-600">98 / 100</p>
            <span className="mt-1 block text-xs text-ink-soft">Optimized for Google Snippets</span>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">Categories Covered</span>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">
              {new Set(posts.map((p) => p.category)).size} Topics
            </p>
            <span className="mt-1 block text-xs text-ink-soft">Breakfast, Waffles, Value &amp; Nutrition</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-ink-soft" />
            <input
              type="search"
              placeholder="Search published articles by title, category, or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <span className="text-xs text-ink-soft font-medium">
            Showing {filtered.length} of {posts.length} articles
          </span>
        </div>

        {/* Articles Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-foreground">
              <thead className="bg-[#F3F4F6] text-xs font-bold uppercase tracking-wider text-ink-soft border-b border-border">
                <tr>
                  <th className="px-6 py-4">Article Title &amp; SEO Meta</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4">SEO Checklist</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((post) => {
                  const isBuiltIn = blogPosts.some((b) => b.slug === post.slug);
                  const hasFaqs = post.faqs && post.faqs.length > 0;
                  const hasQuickAns = Boolean(post.quickAnswer);

                  return (
                    <tr key={post.slug} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-12 w-16 rounded-lg object-cover border border-border"
                          />
                          <div>
                            <Link
                              to="/blog/$slug"
                              params={{ slug: post.slug }}
                              className="font-display font-semibold text-foreground hover:text-primary transition-colors text-base"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-ink-soft mt-0.5 font-mono">/blog/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-xs text-ink-soft font-medium">
                        {post.lastUpdated}
                        <span className="block text-[11px] text-foreground">{post.readMinutes} min read</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" /> Meta Title ({post.seoTitle.length}ch)
                          </span>
                          {hasFaqs && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700">
                              FAQ Schema
                            </span>
                          )}
                          {hasQuickAns && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">
                              Quick Ans
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            target="_blank"
                            className="rounded-lg p-2 text-ink-soft hover:bg-surface hover:text-primary transition-colors"
                            title="Preview on Live Site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          {!isBuiltIn && (
                            <button
                              type="button"
                              onClick={() => handleDelete(post.slug)}
                              className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition-colors"
                              title="Delete Dynamic Post"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
