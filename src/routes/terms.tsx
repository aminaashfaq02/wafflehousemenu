import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight, FileText } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Waffle House Menu Guide" },
      { name: "description", content: "Read the Terms & Conditions for using Waffle House Menu Guide — your rights, responsibilities, and our legal policies." },
      { property: "og:title", content: "Terms & Conditions | Waffle House Menu Guide" },
      { property: "og:url", content: `${SITE}/terms` },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <Link to="/" className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90">
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">Terms & Conditions</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <FileText className="h-7 w-7 text-blue-600" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Terms &amp; Conditions</h1>
              <p className="mt-1 text-sm text-ink-soft">Last updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink-soft">

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-semibold text-foreground">Agreement to Terms</p>
            <p className="mt-2">By accessing and using <strong>wafflehousemenu.com</strong>, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use this website. These terms apply to all visitors, users, and others who access or use the site.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Use of This Website</h2>
            <p className="mt-4">You may use this website for personal, non-commercial purposes only. You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Copy, reproduce, or republish content from this site without written permission.</li>
              <li>Use content for commercial purposes without a license agreement.</li>
              <li>Scrape, crawl, or harvest data from this website in an automated manner.</li>
              <li>Attempt to gain unauthorized access to any part of the website.</li>
              <li>Use the website for any unlawful purpose or in violation of any laws.</li>
              <li>Transmit any malicious code, viruses, or harmful software.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Intellectual Property</h2>
            <p className="mt-4">All content on this website — including text, images, graphics, logos, and design — is the property of Waffle House Menu Guide or its content suppliers and is protected by applicable intellectual property laws.</p>
            <p className="mt-3">You may share short excerpts with attribution and a link back to the original page. Full reproduction or republication without written consent is prohibited.</p>
            <p className="mt-3">The "Waffle House" name and logo are registered trademarks of Waffle House, Inc. Their use on this site is descriptive and informational only.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Accuracy of Information</h2>
            <p className="mt-4">We strive to provide accurate, current information. However, menu prices, calorie data, and nutritional information may change without notice. We make no warranties regarding the accuracy, completeness, or timeliness of information on this site.</p>
            <p className="mt-3">Always verify important nutritional and allergy information directly with the restaurant before making food choices, especially if you have dietary restrictions or health conditions.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Third-Party Links</h2>
            <p className="mt-4">This website contains links to third-party websites. These links are provided for your convenience and do not signify our endorsement of the linked sites. We are not responsible for the content or privacy practices of any external sites.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">5. Advertising & Affiliate Links</h2>
            <p className="mt-4">This website may display advertisements through Google AdSense or other ad networks. We may also use affiliate links. When you click on affiliate links and make purchases, we may receive a commission at no additional cost to you. This helps support the operation of this site.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="mt-4">To the fullest extent permitted by law, Waffle House Menu Guide shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use this website or any information contained herein.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">7. Governing Law</h2>
            <p className="mt-4">These Terms & Conditions shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms shall be resolved in the appropriate courts of the United States.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">8. Changes to These Terms</h2>
            <p className="mt-4">We reserve the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with a revised "Last updated" date. Your continued use of the website after changes are posted constitutes your acceptance of the new terms.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">9. Contact Us</h2>
            <p className="mt-4">If you have any questions about these Terms & Conditions, please contact us at: <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a></p>
          </div>

          <div className="rounded-2xl border border-border bg-[#F7F7F5] p-6">
            <p className="font-semibold text-foreground">Related Legal Pages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { to: "/privacy-policy" as const, label: "Privacy Policy" },
                { to: "/disclaimer" as const, label: "Disclaimer" },
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
