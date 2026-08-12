import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Cookie } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Waffle House Menu Guide" },
      { name: "description", content: "How Waffle House Menu Guide uses cookies — what they are, which ones we use, and how to control them." },
      { property: "og:title", content: "Cookie Policy | Waffle House Menu Guide" },
      { property: "og:url", content: `${SITE}/cookie-policy` },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/cookie-policy` }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <Link to="/" className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90">
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">Cookie Policy</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <Cookie className="h-7 w-7 text-orange-600" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Cookie Policy</h1>
              <p className="mt-1 text-sm text-ink-soft">Last updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-ink-soft">

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <p className="font-semibold text-foreground">What Are Cookies?</p>
            <p className="mt-2">Cookies are small text files placed on your device when you visit a website. They help the website remember information about your visit, making your experience better and the site easier to use. This page explains what cookies we use and why.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Cookies We Use</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Name / Provider</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Essential</td>
                    <td className="px-4 py-3">Session cookie</td>
                    <td className="px-4 py-3">Keeps the site working correctly</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Analytics</td>
                    <td className="px-4 py-3">Google Analytics (_ga, _gid)</td>
                    <td className="px-4 py-3">Measures traffic and user behavior</td>
                    <td className="px-4 py-3">2 years / 24 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Advertising</td>
                    <td className="px-4 py-3">Google AdSense</td>
                    <td className="px-4 py-3">Serves relevant advertisements</td>
                    <td className="px-4 py-3">Up to 13 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Preferences</td>
                    <td className="px-4 py-3">This site</td>
                    <td className="px-4 py-3">Remembers your consent choices</td>
                    <td className="px-4 py-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Essential Cookies</h2>
            <p className="mt-4">Essential cookies are necessary for the website to function properly. They enable core functionality such as page navigation and security. These cookies cannot be disabled without affecting site performance. No personal data is stored in essential cookies.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Analytics Cookies (Google Analytics)</h2>
            <p className="mt-4">We use Google Analytics to understand how visitors interact with our website. This service sets cookies to help us measure:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Number of visitors and sessions</li>
              <li>Pages visited and time spent on each page</li>
              <li>Geographic location (country/city level only)</li>
              <li>Device type and browser</li>
              <li>Traffic sources (search, social, direct)</li>
            </ul>
            <p className="mt-4">This data is anonymized and aggregated. We cannot identify individual users from this data. Google Analytics is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google's Privacy Policy</a>.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Advertising Cookies (Google AdSense)</h2>
            <p className="mt-4">We may display advertisements served by Google AdSense. Google AdSense uses cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads Settings</a>.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">4. How to Control Cookies</h2>
            <p className="mt-4">You can control cookies in several ways:</p>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Browser Settings</h3>
            <p className="mt-2">Most browsers allow you to view, manage, and delete cookies. Instructions for popular browsers:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer" className="text-primary underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-4"><strong>Note:</strong> Disabling certain cookies may affect website functionality.</p>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">Opt-Out Tools</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads Personalization Settings</a></li>
              <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Your Online Choices (EU)</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">5. Changes to This Cookie Policy</h2>
            <p className="mt-4">We may update this Cookie Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this page periodically to stay informed about how we use cookies.</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">6. Contact Us</h2>
            <p className="mt-4">Questions about cookies or this policy? Email us: <a href="mailto:hello@wafflejournal.co" className="text-primary underline">hello@wafflejournal.co</a></p>
          </div>

          <div className="rounded-2xl border border-border bg-[#F7F7F5] p-6">
            <p className="font-semibold text-foreground">Related Legal Pages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { to: "/privacy-policy" as const, label: "Privacy Policy" },
                { to: "/disclaimer" as const, label: "Disclaimer" },
                { to: "/terms" as const, label: "Terms & Conditions" },
                { to: "/editorial-policy" as const, label: "Editorial Policy" },
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
