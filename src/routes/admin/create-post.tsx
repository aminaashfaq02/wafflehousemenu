import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, CheckCircle2, AlertCircle, Copy, Sparkles, HelpCircle, FileText, Layers, Globe, Plus, Trash2 } from "lucide-react";
import { saveBlogPost } from "@/data/blogStore";
import type { BlogPost } from "@/data/blogPosts";
import { defaultAuthor } from "@/components/AuthorBox";

import breakfastPlatesImg from "@/assets/article-breakfast-plates.jpg";
import waffleGuideImg from "@/assets/article-waffle-guide.jpg";
import hashbrownsArticleImg from "@/assets/article-hashbrowns.jpg";
import budgetMealsImg from "@/assets/article-budget-meals.jpg";
import lateNightCoffeeImg from "@/assets/article-late-night-coffee.jpg";

const SITE = "https://wafflehousemenu.com";

const sampleImages = [
  { label: "Breakfast Plates Cover", url: breakfastPlatesImg },
  { label: "Waffle Guide Cover", url: waffleGuideImg },
  { label: "Hashbrowns Cover", url: hashbrownsArticleImg },
  { label: "Budget Meals Cover", url: budgetMealsImg },
  { label: "Coffee & Drinks Cover", url: lateNightCoffeeImg },
];

export const Route = createFileRoute("/admin/create-post")({
  head: () => ({
    meta: [{ title: "Create & Publish SEO Article — Admin CMS" }, { name: "robots", content: "noindex, nofollow" }],
    links: [{ rel: "canonical", href: `${SITE}/admin/create-post` }],
  }),
  component: CreatePostPage,
});

function CreatePostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("The Complete Waffle House Waffle Guide 2026");
  const [slug, setSlug] = useState("waffle-house-waffle-guide");
  const [seoTitle, setSeoTitle] = useState("Waffle House Waffle Menu: Prices, Calories & Flavors (2026)");
  const [metaDescription, setMetaDescription] = useState(
    "Explore every Waffle House waffle variant — Classic Buttermilk, Pecan, Chocolate Chip, and Blueberry. Full 2026 prices, calories, and ordering tips."
  );
  const [summary, setSummary] = useState(
    "Everything you need to know about ordering Waffle House waffles: classic buttermilk base, sweet toppings, calorie breakdowns, and custom add-ons."
  );
  const [quickAnswer, setQuickAnswer] = useState(
    "The standard Waffle House Classic Buttermilk Waffle costs $4.55 and contains 410 calories. Adding Pecans (+150 kcal), Chocolate Chips (+110 kcal) or Peanut Butter Chips (+150 kcal) increases the price by $0.70 to $1.20."
  );
  const [category, setCategory] = useState("Waffles");
  const [readMinutes, setReadMinutes] = useState(5);
  const [focusKeyword, setFocusKeyword] = useState("Waffle House Waffles");
  const [selectedImage, setSelectedImage] = useState(waffleGuideImg);

  const [sections, setSections] = useState([
    {
      id: "waffle-overview",
      h2: "Overview of Waffle House Waffle Menu Options",
      content:
        "Waffle House waffles are baked fresh to order using a signature buttermilk batter that produces crisp edges and fluffy interiors. Here is the complete breakdown of every waffle variant available on the menu in 2026.",
      bulletPoints: ["Classic Buttermilk Waffle: 410 kcal", "Pecan Waffle: 560 kcal", "Chocolate Chip Waffle: 520 kcal"],
    },
    {
      id: "waffle-pricing",
      h2: "Waffle Prices & Calorie Comparison Table",
      content: "Below is a handy comparison of prices, calories, and macronutrient values for all waffle dishes.",
      table: {
        headers: ["Waffle Flavor", "Price (USD)", "Calories", "Protein (g)"],
        rows: [
          ["Classic Buttermilk", "$4.55", "410 kcal", "8g"],
          ["Pecan Waffle", "$5.75", "560 kcal", "10g"],
          ["Chocolate Chip Waffle", "$5.25", "520 kcal", "9g"],
        ],
      },
    },
  ]);

  const [faqs, setFaqs] = useState([
    {
      question: "Can I get a double waffle at Waffle House?",
      answer: "Yes, Waffle House offers a Double Waffle for $7.95, providing two full buttermilk waffles cooked fresh on the griddle.",
    },
    {
      question: "Are Waffle House waffles gluten-free?",
      answer: "No, Waffle House waffle batter is made with wheat flour and buttermilk, containing gluten and dairy.",
    },
  ]);

  const [copied, setCopied] = useState(false);

  // Calculate SEO Health Score out of 100
  const titleScore = seoTitle.length >= 40 && seoTitle.length <= 65 ? 25 : 10;
  const descScore = metaDescription.length >= 120 && metaDescription.length <= 165 ? 25 : 10;
  const quickAnsScore = quickAnswer ? 20 : 0;
  const faqsScore = faqs.length > 0 ? 15 : 0;
  const sectionsScore = sections.length >= 2 ? 15 : 5;
  const totalSeoScore = titleScore + descScore + quickAnsScore + faqsScore + sectionsScore;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(autoSlug);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${sections.length + 1}`,
        h2: "New Article Section Heading",
        content: "Write detailed informative content for this section...",
        bulletPoints: [],
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "Common customer question?", answer: "Clear, factual answer..." }]);
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  const handlePublish = () => {
    const today = new Date().toISOString().split("T")[0];
    const newPost: BlogPost = {
      slug,
      title,
      seoTitle,
      metaDescription,
      summary,
      quickAnswer,
      image: selectedImage,
      author: defaultAuthor,
      publishDate: today,
      lastUpdated: today,
      readMinutes,
      category,
      toc: sections.map((s) => ({ id: s.id, title: s.h2, level: 2 })),
      faqs,
      sections,
    };

    saveBlogPost(newPost);
    alert(`Article "${title}" published successfully!`);
    navigate({ to: "/blog/$slug", params: { slug } });
  };

  const handleCopyJson = () => {
    const today = new Date().toISOString().split("T")[0];
    const code = JSON.stringify(
      {
        slug,
        title,
        seoTitle,
        metaDescription,
        summary,
        quickAnswer,
        image: "waffleGuideImg",
        author: "defaultAuthor",
        publishDate: today,
        lastUpdated: today,
        readMinutes,
        category,
        toc: sections.map((s) => ({ id: s.id, title: s.h2, level: 2 })),
        faqs,
        sections,
      },
      null,
      2
    );

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-white py-4 shadow-xs">
        <div className="container-editorial flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin/blog" className="rounded-xl border border-border p-2 hover:bg-surface text-ink-soft">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">SEO Article Creator &amp; Publisher</h1>
              <p className="text-xs text-ink-soft">Build, audit SEO score, and publish to blog in real-time</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyJson}
              className="btn-ghost text-xs inline-flex items-center gap-1.5 border border-border rounded-xl px-3 py-2"
            >
              <Copy className="h-4 w-4 text-primary" /> {copied ? "Copied JSON!" : "Copy TS Data"}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="btn-primary text-xs inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 font-semibold"
            >
              <Save className="h-4 w-4" /> Save &amp; Publish Article
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container-editorial py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Builder (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Article Info Card */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-5">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
              <FileText className="h-5 w-5 text-primary" /> 1. Article Core Details
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Article Title (H1)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-xl border border-border px-3 py-2 text-xs font-mono text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Waffles">Waffles</option>
                  <option value="Sides">Sides</option>
                  <option value="Value">Value</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Short Article Summary
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-xl border border-border p-3 text-xs leading-relaxed text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* SEO & Snippet Settings */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-5">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
              <Globe className="h-5 w-5 text-primary" /> 2. SEO &amp; Search Snippet Optimization
            </h2>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  SEO Meta Title (Title Tag)
                </label>
                <span className={`text-xs font-mono ${seoTitle.length <= 60 ? "text-emerald-600" : "text-amber-600"}`}>
                  {seoTitle.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Meta Description
                </label>
                <span className={`text-xs font-mono ${metaDescription.length <= 160 ? "text-emerald-600" : "text-amber-600"}`}>
                  {metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full rounded-xl border border-border p-3 text-xs leading-relaxed text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1.5">
                Quick Answer / Featured Snippet Box (Google AI Overview target)
              </label>
              <textarea
                rows={3}
                value={quickAnswer}
                onChange={(e) => setQuickAnswer(e.target.value)}
                className="w-full rounded-xl border border-primary/40 bg-primary/5 p-3 text-xs leading-relaxed text-foreground focus:border-primary focus:outline-none"
                placeholder="Direct 2-3 sentence answer providing key prices, calories, or facts..."
              />
            </div>
          </div>

          {/* Sections Builder */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" /> 3. Article Content Sections ({sections.length})
              </h2>
              <button
                type="button"
                onClick={handleAddSection}
                className="btn-ghost text-xs inline-flex items-center gap-1 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg"
              >
                <Plus className="h-4 w-4" /> Add Section
              </button>
            </div>

            <div className="space-y-6">
              {sections.map((sec, idx) => (
                <div key={sec.id} className="rounded-xl border border-border/80 bg-surface/40 p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="chip">Section #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-medium"
                    >
                      Delete Section
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      H2 Heading
                    </label>
                    <input
                      type="text"
                      value={sec.h2}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[idx].h2 = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Paragraph Content
                    </label>
                    <textarea
                      rows={3}
                      value={sec.content}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[idx].content = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full rounded-lg border border-border p-2.5 text-xs leading-relaxed text-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Builder */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" /> 4. FAQ Schema Builder ({faqs.length})
              </h2>
              <button
                type="button"
                onClick={handleAddFaq}
                className="btn-ghost text-xs inline-flex items-center gap-1 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg"
              >
                <Plus className="h-4 w-4" /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-border/80 bg-surface/40 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-soft">FAQ #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-medium"
                    >
                      Remove FAQ
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Question?"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full rounded-lg border border-border px-3 py-2 text-xs font-semibold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Clear answer..."
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].answer = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full rounded-lg border border-border p-2.5 text-xs leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live SEO Audit & Google SERP Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* SEO Health Scorecard */}
          <div className="sticky top-20 space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">Live SEO Health Audit</span>
                <span className={`font-display text-2xl font-bold ${totalSeoScore >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                  {totalSeoScore} / 100
                </span>
              </div>

              <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-border">
                <div
                  className={`h-full transition-all duration-500 ${totalSeoScore >= 80 ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${totalSeoScore}%` }}
                />
              </div>

              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="flex items-center gap-1.5">
                    {seoTitle.length >= 40 && seoTitle.length <= 65 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    SEO Title Length (40-65 chars)
                  </span>
                  <span className="font-mono text-ink-soft">{seoTitle.length}ch</span>
                </li>

                <li className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="flex items-center gap-1.5">
                    {metaDescription.length >= 120 && metaDescription.length <= 165 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    Meta Description (120-165 chars)
                  </span>
                  <span className="font-mono text-ink-soft">{metaDescription.length}ch</span>
                </li>

                <li className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="flex items-center gap-1.5">
                    {quickAnswer ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    Quick Answer / AI Snippet Target
                  </span>
                  <span className="font-semibold text-emerald-600">{quickAnswer ? "Ready" : "Missing"}</span>
                </li>

                <li className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5">
                    {faqs.length > 0 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    FAQPage Schema ({faqs.length} FAQs)
                  </span>
                  <span className="font-semibold text-emerald-600">{faqs.length > 0 ? "Active" : "None"}</span>
                </li>
              </ul>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-primary" /> Live Google SERP Snippet Preview
              </span>

              <div className="rounded-xl border border-border/80 bg-[#FFFFFF] p-4 font-sans text-left space-y-1 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-[#202124]">
                  <span className="h-4 w-4 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-bold text-black">
                    W
                  </span>
                  <span className="truncate">wafflehousemenu.com</span>
                  <span className="text-[#5f6368]">› blog › {slug}</span>
                </div>
                <h3 className="text-[18px] font-normal leading-snug text-[#1a0dab] hover:underline cursor-pointer">
                  {seoTitle || title}
                </h3>
                <p className="text-xs text-[#4d5156] leading-normal line-clamp-2">
                  {metaDescription || summary}
                </p>
              </div>
            </div>

            {/* Cover Image Selector */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">Select Article Featured Cover</span>
              <div className="grid grid-cols-3 gap-2">
                {sampleImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img.url)}
                    className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === img.url ? "border-primary ring-2 ring-primary/20 scale-95" : "border-border opacity-70"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
