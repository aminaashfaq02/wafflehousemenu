import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight, AlertTriangle } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | Waffle House Menu Guide" },
      { name: "description", content: "Read the Disclaimer for Waffle House Menu Guide — an independent informational site not affiliated with Waffle House, Inc." },
      { property: "og:title", content: "Disclaimer | Waffle House Menu Guide" },
      { property: "og:url", content: `${SITE}/disclaimer` },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/disclaimer` }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <Link to="/" className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90">
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">Disclaimer</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <AlertTriangle className="h-7 w-7 text-amber-600" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Disclaimer</h1>
              <p className="mt-1 text-sm text-ink-soft">Last updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink-soft">

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="font-semibold text-foreground">Important Notice</p>
            <p className="mt-2"><strong>Waffle House Menu Guide</strong> is an <strong>independent, informational website</strong>. We are not affiliated with, endorsed by, sponsored by, or in any way officially connected to <strong>Waffle House, Inc.</strong> All information on this site is for general informational purposes only.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">1. No Affiliation with Waffle House</h2>
            <p className="mt-4">Waffle House Menu Guide (wafflehousemenu.com) is an independent editorial project. The name "Waffle House," the Waffle House logo, and all related trademarks, service marks, and trade names are the property of Waffle House, Inc. Their use on this website is for descriptive and informational purposes only and does not imply any affiliation or endorsement.</p>
            <p className="mt-3">For official and authoritative information about Waffle House restaurants, please visit the official Waffle House website at <a href="https://www.wafflehouse.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">wafflehouse.com</a>.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Accuracy of Menu Information</h2>
            <p className="mt-4">We make every effort to provide accurate, up-to-date menu prices, calorie counts, nutrition information, and allergen data. However:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Menu prices <strong>vary by location</strong> and may change without notice.</li>
              <li>Calorie and nutrition data are based on publicly available information and may not reflect current values.</li>
              <li>Allergen information is provided as general guidance only. If you have food allergies or dietary restrictions, always contact the restaurant directly before ordering.</li>
              <li>We do not guarantee the completeness or accuracy of any information on this site.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Nutritional & Health Information</h2>
            <p className="mt-4">The nutritional information provided on this website is for general informational and educational purposes only. It is not intended as medical or dietary advice. Always consult a qualified healthcare professional or registered dietitian for personalized nutritional guidance.</p>
            <p className="mt-3">People with food allergies, intolerances, or special dietary needs should always verify ingredient information directly with the restaurant before consuming any menu item.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Affiliate & Advertising Disclosure</h2>
            <p className="mt-4">This website may contain advertisements served by Google AdSense or other advertising networks. We may also participate in affiliate marketing programs. When you click on certain links and make a purchase, we may earn a small commission at no additional cost to you.</p>
            <p className="mt-3">All editorial content on this site is created independently and is not influenced by advertisers or affiliate relationships. Our reviews and recommendations represent our honest, independent opinions.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">5. External Links</h2>
            <p className="mt-4">This website may contain links to third-party websites for reference purposes. We are not responsible for the content, accuracy, or privacy practices of any third-party websites. The inclusion of any link does not imply endorsement of the linked site.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="mt-4">Waffle House Menu Guide shall not be held liable for any losses, injuries, or damages arising from the use of information provided on this website. All information is provided "as is" without warranty of any kind.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">7. Contact</h2>
            <p className="mt-4">If you notice any inaccurate information on this site or have any questions about this disclaimer, please contact us:</p>
            <p className="mt-3"><strong>Email:</strong> <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a></p>
          </div>

          <div className="rounded-2xl border border-border bg-[#F7F7F5] p-6">
            <p className="font-semibold text-foreground">Related Legal Pages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { to: "/privacy-policy" as const, label: "Privacy Policy" },
                { to: "/terms" as const, label: "Terms & Conditions" },
                { to: "/editorial-policy" as const, label: "Editorial Policy" },
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
