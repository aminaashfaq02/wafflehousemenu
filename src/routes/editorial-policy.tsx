import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight, BookOpen, CheckCircle } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy | Waffle House Menu Guide" },
      { name: "description", content: "Our editorial policy — how we research, write, fact-check and maintain content at Waffle House Menu Guide. Learn about our commitment to accuracy and EEAT." },
      { property: "og:title", content: "Editorial Policy | Waffle House Menu Guide" },
      { property: "og:url", content: `${SITE}/editorial-policy` },
      { property: "og:type", content: "article" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/editorial-policy` }],
  }),
  component: EditorialPolicyPage,
});

function EditorialPolicyPage() {
  const standards = [
    { title: "Accuracy First", desc: "All menu prices, calories, and nutrition data are verified against official sources before publication." },
    { title: "Independence", desc: "Our editorial team operates independently. No advertiser, brand, or affiliate relationship influences our content." },
    { title: "Transparency", desc: "We clearly disclose affiliate relationships and advertising. Sponsored content is always labeled." },
    { title: "Regular Updates", desc: "Menu information is reviewed and updated regularly to reflect current offerings and prices." },
    { title: "EEAT Compliance", desc: "We follow Google's Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT) guidelines." },
    { title: "No Plagiarism", desc: "All content is original. We never copy content from other websites. External sources are always cited." },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <Link to="/" className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90">
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">Editorial Policy</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <BookOpen className="h-7 w-7 text-green-700" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Editorial Policy</h1>
              <p className="mt-1 text-sm text-ink-soft">Last updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink-soft">

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <p className="font-semibold text-foreground">Our Editorial Mission</p>
            <p className="mt-2">Waffle House Menu Guide is committed to providing <strong>accurate, honest, and helpful information</strong> about the Waffle House menu. Every article and data point we publish is researched, fact-checked, and written with our readers' best interests in mind — not to serve advertisers or generate clicks.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Our Core Editorial Standards</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {standards.map((s) => (
                <div key={s.title} className="flex gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden />
                  <div>
                    <p className="font-semibold text-foreground">{s.title}</p>
                    <p className="mt-1 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">How We Research Content</h2>
            <p className="mt-4">All content on Waffle House Menu Guide goes through a multi-step research and verification process:</p>
            <ol className="mt-4 list-decimal space-y-3 pl-6">
              <li><strong>Primary Sources:</strong> We start with official Waffle House menu boards, nutrition guides, and publicly available nutritional documents.</li>
              <li><strong>Verification:</strong> Prices and calorie counts are cross-referenced with multiple sources before publication.</li>
              <li><strong>Expert Review:</strong> Articles involving nutritional or dietary information are reviewed for accuracy.</li>
              <li><strong>Publication:</strong> Content is published only after it meets our accuracy and quality standards.</li>
              <li><strong>Monitoring & Updates:</strong> Published content is reviewed regularly and updated when menu changes occur.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Independence & Objectivity</h2>
            <p className="mt-4">Our editorial team makes all content decisions independently. Our writers and editors are not compensated by Waffle House, Inc. or any restaurant brand for favorable coverage.</p>
            <p className="mt-3">While this site generates revenue through advertising and affiliate links, these commercial relationships <strong>never influence</strong> our editorial content. Advertisers have no input into our articles, rankings, or ratings.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Corrections Policy</h2>
            <p className="mt-4">We take accuracy seriously. If you notice an error in any of our content, please contact us at <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a>. We will investigate promptly and issue a correction if warranted. Significant corrections are noted directly in the affected article.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Content Update Policy</h2>
            <p className="mt-4">Restaurant menus change frequently. We aim to review and update our content:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Menu prices: Reviewed quarterly or when significant changes are reported.</li>
              <li>Calorie and nutrition data: Updated when official data changes.</li>
              <li>Category pages: Reviewed monthly for accuracy.</li>
              <li>Blog articles: Updated annually or when information becomes outdated.</li>
            </ul>
            <p className="mt-4">Each page shows a "Last updated" date so readers know how current the information is.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">EEAT Commitment</h2>
            <p className="mt-4">We follow Google's EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines. This means:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Experience:</strong> Content is written by people with genuine knowledge of the subject matter.</li>
              <li><strong>Expertise:</strong> Nutritional and food content is researched using reliable sources.</li>
              <li><strong>Authoritativeness:</strong> We build authority through consistent, high-quality content.</li>
              <li><strong>Trustworthiness:</strong> We are transparent about who we are, how we make money, and our limitations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Contact the Editorial Team</h2>
            <p className="mt-4">For editorial inquiries, corrections, or feedback:</p>
            <p className="mt-3"><strong>Email:</strong> <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a><br /><strong>Contact Form:</strong> <Link to="/contact" className="text-primary underline">Contact Page</Link></p>
          </div>

          <div className="rounded-2xl border border-border bg-[#F7F7F5] p-6">
            <p className="font-semibold text-foreground">Related Legal Pages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { to: "/privacy-policy" as const, label: "Privacy Policy" },
                { to: "/disclaimer" as const, label: "Disclaimer" },
                { to: "/terms" as const, label: "Terms & Conditions" },
                { to: "/cookie-policy" as const, label: "Cookie Policy" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
