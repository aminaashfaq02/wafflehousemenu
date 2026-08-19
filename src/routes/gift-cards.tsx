import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Gift, CreditCard, ShieldCheck, CheckCircle2, AlertTriangle, Clock, HelpCircle, ExternalLink, Sparkles, DollarSign, Store, Phone, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const SITE = "https://wafflehousemenu.com";

const giftCardFaqs = [
  {
    q: "Where can I buy an official Waffle House gift card?",
    a: "You can purchase authentic Waffle House gift cards directly over the counter at any of the 1,900+ diner locations across 25 states, or online via the official Waffle House store at shop.wafflehouse.com. Physical cards can be mailed, while digital eGift cards are delivered instantly via email.",
  },
  {
    q: "How do I check my Waffle House gift card balance?",
    a: "You can check your remaining balance online through the official Waffle House portal (wafflehouse.com/gift-cards) by entering the 16-digit card number and the PIN found under the silver scratch-off panel on the back. Any server or cashier can also swipe your card at the diner register, or you can call Waffle House customer support at 1-877-9-WAFFLE (1-877-992-3353).",
  },
  {
    q: "Do Waffle House gift cards expire or charge maintenance fees?",
    a: "No. Under the federal Credit CARD Act of 2009 and state consumer protection laws, purchased Waffle House gift cards never expire and are never subject to dormancy, maintenance, or non-use penalty fees. Your balance remains valid until fully redeemed.",
  },
  {
    q: "Can you tip a server using a Waffle House gift card?",
    a: "Yes! When paying your bill with a gift card, the server will swipe the card and print out an itemized guest receipt. You can write in a tip for your server and short-order cook just as you would with a standard debit or credit card, provided your remaining balance covers the combined total.",
  },
  {
    q: "Can I use multiple gift cards or split payment on a single meal?",
    a: "Yes. Waffle House registers easily handle split tenders. You can combine multiple gift cards to settle a single check, or pay a portion with a gift card and cover the remaining balance with cash, debit, Apple Pay, or a credit card.",
  },
  {
    q: "Can I use a Waffle House gift card for DoorDash or UberEats orders?",
    a: "No. Third-party delivery services like DoorDash, UberEats, and Grubhub process transactions through their own proprietary billing systems and cannot redeem restaurant-branded gift cards. However, you can use your gift card for takeout orders placed directly through the official Waffle House online ordering portal (order.wafflehouse.com) or in person.",
  },
  {
    q: "Can I purchase Waffle House coffee, mugs, or merch with a gift card?",
    a: "Physical gift cards can be used for in-store food, beverages, and merchandise sold at participating diner counters. For official online merchandise orders at shop.wafflehouse.com, online gift card redemption is supported at checkout.",
  },
  {
    q: "What should I do if my Waffle House gift card is lost or stolen?",
    a: "If your card is misplaced or stolen, contact Waffle House Corporate Guest Relations immediately with your original store purchase receipt or online email order confirmation. While unverified anonymous cards cannot always be replaced, verified registered balances can often be frozen and reissued to a new card.",
  },
  {
    q: "Are Waffle House gift cards reloadable?",
    a: "Standard physical plastic cards purchased at diner counters can be reloaded with additional funds by asking the cashier or server at any participating restaurant. Digital eGift cards are typically single-load, but multiple e-cards can be stored on your mobile device.",
  },
  {
    q: "Does this website sell or reload Waffle House gift cards?",
    a: "No. This website is an independent informational reference and consumer guide. We do not sell, activate, or manage gift cards, and we never ask for card numbers, PINs, or financial information. All purchases must be made through official Waffle House channels.",
  },
];

export const Route = createFileRoute("/gift-cards")({
  head: () => {
    const url = `${SITE}/gift-cards`;
    const title = "Waffle House Gift Cards: Balance Check, Where to Buy & Rules (August 2026)";
    const description =
      "Everything you need to know about Waffle House gift cards: how to check your balance, where to buy official cards, tipping rules, 24/7 diner redemption, and US consumer law protections.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Gift Cards", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Waffle House Gift Cards Guide",
            url,
            inLanguage: "en-US",
            description: "Informational buyer guide for Waffle House gift cards, balance checks, tipping policies, and legal expiry rules.",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: giftCardFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        },
      ],
    };
  },
  component: GiftCardsGuidePage,
});

export default function GiftCardsGuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white min-h-screen text-foreground font-sans selection:bg-primary/20">
      {/* 1. BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span className="text-foreground font-semibold">Gift Cards</span>
        </div>
      </nav>

      {/* 2. HERO / ARTICLE HEADER */}
      <header className="bg-white border-b border-border">
        <div className="container-editorial py-10 md:py-14 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/60">
              Buyer's guide · Checked August 2026
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Waffle House Gift Cards: Balance Check, Where to Buy &amp; Rules
          </h1>

          <div className="text-xs sm:text-sm text-ink-soft flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>By <Link to="/about" className="text-primary font-semibold hover:underline">Marcus Goodwin</Link>, Editor</span>
            <span>·</span>
            <span>Reviewed 18 August 2026</span>
            <span>·</span>
            <span>Policy checked August 2026</span>
            <span>·</span>
            <Link to="/methodology" className="text-primary hover:underline font-semibold">How this is sourced</Link>
          </div>

          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Where to buy one, how to check what's left on it, what US law says about expiry, and where it will be accepted. Written as a plain reference — this site does not sell gift cards and has no way to look up your balance.
          </p>

          {/* 3. QUICK ANSWER / TL;DR BOX */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 sm:p-6 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-800" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-950">Quick Answer / TL;DR</h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950/90 leading-relaxed font-medium">
              <li className="flex items-start gap-2">
                <strong className="text-amber-950 shrink-0">Where to check balance:</strong>
                <span>You can check your balance on the official Waffle House website (<a href="https://www.wafflehouse.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-950 hover:text-black">wafflehouse.com</a>) using the 16-digit card number and PIN, or in person at any of the 1,900+ restaurants.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-amber-950 shrink-0">Do they expire?</strong>
                <span>Purchased gift cards do not expire and have no inactivity fees under the federal Credit CARD Act of 2009. Promotional coupons (like Regulars Club free waffles) have specific promotional expiry dates.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-amber-950 shrink-0">Can you tip with it?</strong>
                <span>Yes, you can write in a tip for your server on the itemized receipt when paying with a gift card, provided sufficient balance remains.</span>
              </li>
            </ul>
          </div>

          {/* 4. BUY FROM THE RESTAURANT, NOT FROM US CALLOUT */}
          <div className="rounded-2xl border border-black/10 bg-surface p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Buy from the restaurant, not from us</h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              We are an independent reference guide with no checkout, no storefront, and no affiliation with Waffle House, Inc. Everything transactional on this page links to the official website at <a href="https://www.wafflehouse.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">wafflehouse.com</a>. Sites promising heavily discounted cards (e.g. 50% off) are almost always gift card draining scams.
            </p>
          </div>
        </div>
      </header>

      {/* 5. THE SHORT ANSWERS (BUY, CHECK, USE) */}
      <section className="bg-surface py-12 md:py-16 border-b border-border">
        <div className="container-editorial max-w-4xl space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">The short answers</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Buy, check, use
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* BUYING */}
            <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-bold text-foreground">Buying</h3>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Online from the official Waffle House store for physical or digital e-gift cards, or over the counter at any of the 1,900+ diners nationwide. E-gift cards arrive instantly by email.
                </p>
              </div>
              <a
                href="https://www.wafflehouse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between text-xs font-bold text-primary hover:underline pt-2 border-t border-black/5"
              >
                <span>Official gift cards ↗</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* CHECKING A BALANCE */}
            <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-bold text-foreground">Checking a balance</h3>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  You need the 16-digit card number and the PIN from the scratch-off on the back. Any server can also check your balance at the register during your meal.
                </p>
              </div>
              <a
                href="https://www.wafflehouse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between text-xs font-bold text-primary hover:underline pt-2 border-t border-black/5"
              >
                <span>Check balance portal ↗</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* USING IT */}
            <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-bold text-foreground">Using it</h3>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Accepted at all 1,900+ diners for dine-in and counter seating, as well as official online to-go orders. Third-party apps (DoorDash/UberEats) do not take brand gift cards.
                </p>
              </div>
              <Link
                to="/locations"
                className="inline-flex items-center justify-between text-xs font-bold text-primary hover:underline pt-2 border-t border-black/5"
              >
                <span>Find a location →</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IN-DEPTH EDITORIAL ARTICLE SECTIONS */}
      <section className="bg-white py-14 md:py-20 border-b border-border">
        <div className="container-editorial max-w-4xl space-y-12">
          
          {/* SECTION A: How to Check Balance */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              How to Check Your Waffle House Gift Card Balance
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              If you have a Waffle House card from a birthday, road trip, or holiday gift, checking the remaining balance is fast and secure. There are three official ways to check your funds:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface border border-black/5 space-y-1.5">
                <span className="text-xs font-extrabold text-primary uppercase">Method 1</span>
                <h3 className="text-sm font-bold text-foreground">Official Online Portal</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Visit the official portal at <a href="https://www.wafflehouse.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">wafflehouse.com</a> and enter the 16-digit card number and 8-digit PIN from the back.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-black/5 space-y-1.5">
                <span className="text-xs font-extrabold text-primary uppercase">Method 2</span>
                <h3 className="text-sm font-bold text-foreground">At Any Diner Register</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Hand the card to your server or cashier at any of the 1,900+ diners across 25 states. They can swipe the magnetic stripe to print an instant balance inquiry.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-black/5 space-y-1.5">
                <span className="text-xs font-extrabold text-primary uppercase">Method 3</span>
                <h3 className="text-sm font-bold text-foreground">Phone Support</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Call Waffle House Corporate Guest Relations toll-free at <a href="tel:18779923353" className="text-primary hover:underline font-semibold">1-877-9-WAFFLE</a> (1-877-992-3353) to verify active funds.
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-soft italic pt-1">
              <strong>Security Tip:</strong> On physical cards, the PIN is concealed beneath a silver scratch-off panel. If purchasing a card in a third-party retail rack and the silver coating is scratched off or taped over, do not buy it.
            </p>
          </div>

          {/* SECTION B: Deals, Regulars Club & Promotions */}
          <div className="space-y-4 pt-6 border-t border-border">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Waffle House Gift Card Deals &amp; Regulars Club Promotions
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              While third-party coupon sites advertising "half-price Waffle House cards" are fraudulent, the company offers official perks and promotions throughout the year:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-black/5 bg-surface space-y-1.5">
                <h3 className="text-sm font-bold text-foreground">Waffle House Regulars Club Free Waffle</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  When you join the free official <Link to="/deals" className="text-primary hover:underline font-semibold">Waffle House Regulars Club</Link>, you receive a complimentary waffle coupon delivered to your email, along with birthday coupons and exclusive holiday merchandise offers.
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-black/5 bg-surface space-y-1.5">
                <h3 className="text-sm font-bold text-foreground">Holiday Merchandise &amp; Gift Bundles</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  During November and December, the official Waffle House Shop frequently bundles gift cards with commemorative ceramic coffee mugs, waffle batter mixes, or branded apparel.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION C: Using Your Gift Card: Tipping and Exclusions */}
          <div className="space-y-4 pt-6 border-t border-border">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Using Your Gift Card: Tipping, Dine-in &amp; Exclusions
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Many guests ask: <em>"Can you tip with a gift card at Waffle House?"</em> The answer is <strong>yes</strong>. Waffle House point-of-sale registers treat gift cards with full payment parity:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-soft list-disc list-inside leading-relaxed">
              <li><strong>Tipping on the check:</strong> Hand your gift card to your server. They swipe it and bring back an itemized receipt where you can write in the tip amount for your server and short-order grill master.</li>
              <li><strong>Split tender payments:</strong> If your meal total exceeds the card's balance, the register drains the gift card and allows you to cover the remaining balance with cash, debit, Apple Pay, or credit card.</li>
              <li><strong>Third-party delivery exclusion:</strong> DoorDash and UberEats run external payment gateways that cannot redeem restaurant gift cards. To use your card for takeout, order directly in-store or through <Link to="/delivery" className="text-primary hover:underline font-semibold">official Waffle House pickup channels</Link>.</li>
            </ul>
          </div>

          {/* SECTION D: Physical Cards vs. eGift Cards */}
          <div className="space-y-4 pt-6 border-t border-border">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Physical Plastic Cards vs. Digital eGift Cards
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Both formats hold equal cash value and are accepted across all 1,900+ diner locations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-surface p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-base font-bold text-foreground">Physical Plastic Card</h3>
                </div>
                <ul className="text-xs text-ink-soft space-y-1.5">
                  <li>• Available at all diner cash registers and by mail.</li>
                  <li>• Reusable magnetic stripe for instant table swiping.</li>
                  <li>• Perfect for traditional gifting in cards and stockings.</li>
                  <li>• Reloadable at participating diner cash registers.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-black/10 bg-surface p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-base font-bold text-foreground">Digital eGift Card</h3>
                </div>
                <ul className="text-xs text-ink-soft space-y-1.5">
                  <li>• Instant delivery via email or scheduled for a future date.</li>
                  <li>• Scannable barcode displayed directly on any smartphone.</li>
                  <li>• Zero shipping fees or risk of mailing delays.</li>
                  <li>• Stored safely in your email inbox or Apple/Google Wallet.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION E: The Rule People Get Wrong: Expiry & Fees */}
          <div className="rounded-3xl border border-amber-200/80 bg-amber-50/50 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                The Rule People Get Wrong: Expiry &amp; Fees
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Restaurant gift cards sold in the United States sit under the <strong>Credit CARD Act of 2009</strong>. Under federal law, funds cannot expire sooner than 5 years from purchase, and dormancy or maintenance fees are strictly prohibited for at least 12 months.
            </p>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Waffle House goes further: company-issued gift cards have <strong>no expiration dates</strong> and <strong>no non-use penalties</strong>. Several key states (including California, Georgia, Florida, and Texas) also enforce state-level consumer protections that ban gift card expiration altogether.
            </p>
            <p className="text-[11px] text-ink-soft/80 italic">
              *Note: This is a consumer informational summary, not formal legal counsel. Official terms published on the back of each card govern individual issuances.
            </p>
          </div>

          {/* SECTION F: Avoiding Gift Card Scams */}
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Worth Knowing: Avoiding Gift Card Scams
              </h2>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">
              Gift card fraud is one of the most common consumer scams online. Keep these rules in mind to protect your funds:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Nobody legitimate demands payment in gift cards.</strong> The IRS, utility companies, bail agents, and tech support will never ask for payment in restaurant gift cards. Any such demand is 100% a scam.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Buy only from the diner or official site.</strong> Unofficial secondary resale marketplaces sell drained cards that are difficult or impossible to refund.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Inspect packaging in retail stores.</strong> If purchasing from grocery store gift card racks, check that the scratch-off PIN coating is untouched and has not been peeled and reapplied.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Always save your activation receipt.</strong> The paper or digital activation receipt is the primary document required to verify and recover lost or stolen balances.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. PLANNING THE VISIT ITSELF RESOURCE STRIP */}
      <section className="bg-surface py-12 md:py-16 border-b border-border">
        <div className="container-editorial max-w-4xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Planning the visit itself</span>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
              Explore menus, locations &amp; hours before dining
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold">
            <Link
              to="/menu"
              className="p-4 rounded-2xl border border-black/10 bg-white hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Full menu with prices (74 items) →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/breakfast"
              className="p-4 rounded-2xl border border-black/10 bg-white hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Breakfast &amp; All-Star Special™ →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/locations"
              className="p-4 rounded-2xl border border-black/10 bg-white hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>All 1,900+ locations &amp; 24/7 hours →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/deals"
              className="p-4 rounded-2xl border border-black/10 bg-white hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Regulars Club deals &amp; specials →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. GIFT CARD FAQ ACCORDION */}
      <section id="faq" className="bg-white py-14 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="chip">Gift Card FAQ</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft">
              Clear answers to questions about buying, checking, tipping, and redeeming Waffle House gift cards.
            </p>
          </div>

          <div className="space-y-3">
            {giftCardFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-surface shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-sans cursor-pointer hover:bg-black/[0.02] transition"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-foreground pr-4">{faq.q}</span>
                    <span className="text-primary font-bold text-xl shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. GIFT CARDS & VISITOR GUIDES 3-COLUMN HUB MATRIX */}
      <section className="bg-surface py-14 md:py-20 border-b border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Gift Cards &amp; Visitor Guides</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Everything you need to spend or gift a meal
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            {/* Store & Dining Tools */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                Store &amp; Dining Tools
              </h3>
              <ul className="space-y-2 text-ink-soft font-medium">
                <li>
                  <Link to="/locations" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Find Nearest Restaurant Location →</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/hours" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>24/7 Hours &amp; Shift Schedule</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/catering" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Catering &amp; Food Truck Rental</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Regulars Club Free Waffle Specials</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Menu & Ordering */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                Menu &amp; Ordering
              </h3>
              <ul className="space-y-2 text-ink-soft font-medium">
                <li>
                  <Link to="/menu" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Full Menu &amp; Current Prices →</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/menu/waffles" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Sweet Cream Waffles &amp; Pecan Waffles</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Delivery &amp; Curbside Pickup Rules</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/menu/hashbrowns" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Scattered Hashbrowns &amp; Toppings</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nutritional & Editorial */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                Nutritional &amp; Editorial
              </h3>
              <ul className="space-y-2 text-ink-soft font-medium">
                <li>
                  <Link to="/nutrition" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Nutrition Facts &amp; Calorie Index →</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/allergens" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Allergen Exclusion Filter</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/methodology" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Editorial Methodology &amp; Sourcing</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Report a Correction or Contact Us</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INDEPENDENT DISCLOSURE */}
      <footer className="bg-white py-10">
        <div className="container-editorial max-w-4xl text-center space-y-3 text-xs text-ink-soft">
          <p>
            An independent informational guide to Waffle House gift cards, balance checks, diner policies, and menu pricing. Not affiliated with, endorsed by, or sponsored by Waffle House, Inc.
          </p>
          <div className="flex justify-center gap-4 pt-1 font-medium">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>
            <span>•</span>
            <Link to="/contact" className="text-primary hover:underline">Contact &amp; Corrections</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
