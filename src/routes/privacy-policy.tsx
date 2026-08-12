import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Shield } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Waffle House Menu Guide" },
      { name: "description", content: "Read the Privacy Policy for Waffle House Menu Guide — how we collect, use and protect your personal information." },
      { property: "og:title", content: "Privacy Policy | Waffle House Menu Guide" },
      { property: "og:description", content: "How we collect, use and protect your personal information on Waffle House Menu Guide." },
      { property: "og:url", content: `${SITE}/privacy-policy` },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/privacy-policy` }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <Link to="/" className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90">
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">Privacy Policy</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-7 w-7 text-primary" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
              <p className="mt-1 text-sm text-ink-soft">Last updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink-soft">

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="font-semibold text-foreground">Quick Summary</p>
            <p className="mt-2">Waffle House Menu Guide (<strong>wafflehousemenu.com</strong>) is an independent, informational food blog. We do not sell your personal data. We collect only what is necessary to operate the site. We use cookies for analytics and advertising purposes as described below.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Who We Are</h2>
            <p className="mt-4">Waffle House Menu Guide is an independent editorial website that provides menu prices, nutrition information, and food content related to Waffle House restaurants. We are not affiliated with, endorsed by, or sponsored by Waffle House, Inc.</p>
            <p className="mt-3"><strong>Website:</strong> https://wafflehousemenu.com<br /><strong>Contact Email:</strong> hello@wafflejournal.co</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-4">We collect the following types of information:</p>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">2a. Information You Provide</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Contact Form:</strong> If you submit a contact form, we collect your name, email address, and message.</li>
              <li><strong>Newsletter Signup:</strong> If you subscribe to our newsletter, we collect your email address.</li>
            </ul>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">2b. Information Collected Automatically</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Log Data:</strong> IP address, browser type, pages visited, time spent on pages, referral URLs.</li>
              <li><strong>Cookies:</strong> Small text files placed on your device for analytics and advertising (see Cookie Policy).</li>
              <li><strong>Google Analytics:</strong> We use Google Analytics to understand traffic patterns. This may collect anonymized usage data.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>To respond to your inquiries submitted via the contact form.</li>
              <li>To send newsletters if you have opted in (you may unsubscribe at any time).</li>
              <li>To analyze site performance and improve user experience via Google Analytics.</li>
              <li>To serve relevant advertisements via Google AdSense (if applicable).</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Cookies</h2>
            <p className="mt-4">We use the following types of cookies:</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Cookie Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-4 py-3">Essential</td><td className="px-4 py-3">Site functionality</td><td className="px-4 py-3">This site</td></tr>
                  <tr><td className="px-4 py-3">Analytics</td><td className="px-4 py-3">Traffic measurement</td><td className="px-4 py-3">Google Analytics</td></tr>
                  <tr><td className="px-4 py-3">Advertising</td><td className="px-4 py-3">Relevant ads</td><td className="px-4 py-3">Google AdSense</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">5. Third-Party Services</h2>
            <p className="mt-4">We use the following third-party services that may collect data:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Google Analytics</strong> — traffic analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Privacy Policy</a>)</li>
              <li><strong>Google AdSense</strong> — advertising platform</li>
              <li><strong>Google Fonts</strong> — typography (font files loaded from Google servers)</li>
              <li><strong>YouTube</strong> — embedded video content (if applicable)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">6. Data Sharing</h2>
            <p className="mt-4">We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share data with:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Service providers (hosting, email) who operate under confidentiality agreements.</li>
              <li>Law enforcement if required by law.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">7. Your Rights</h2>
            <p className="mt-4">Depending on your location, you may have the following rights:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
              <li><strong>Opt-out:</strong> Unsubscribe from newsletters at any time via the unsubscribe link in each email.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
            </ul>
            <p className="mt-4">To exercise these rights, email us at <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a>.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">8. Data Security</h2>
            <p className="mt-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">9. Children's Privacy</h2>
            <p className="mt-4">This website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">10. Changes to This Policy</h2>
            <p className="mt-4">We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised "Last updated" date. We encourage you to review this page periodically.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">11. Contact Us</h2>
            <p className="mt-4">If you have any questions about this Privacy Policy, please contact us:</p>
            <p className="mt-3"><strong>Email:</strong> <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a><br /><strong>Website:</strong> <Link to="/contact" className="text-primary underline">Contact Page</Link></p>
          </div>

          {/* Related Links */}
          <div className="rounded-2xl border border-border bg-[#F7F7F5] p-6">
            <p className="font-semibold text-foreground">Related Legal Pages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { to: "/disclaimer" as const, label: "Disclaimer" },
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
