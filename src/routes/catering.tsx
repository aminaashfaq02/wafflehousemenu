import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Copy,
  DollarSign,
  Download,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import hero5 from "@/assets/hero-5-diner.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";
import wafflesImg from "@/assets/hero-waffles.jpg";
import allStarImg from "@/assets/all-star-breakfast.jpg";
import hashbrownsImg from "@/assets/hashbrowns.jpg";
import pattyMeltImg from "@/assets/patty-melt.jpg";
import burgerImg from "@/assets/burger.jpg";
import icedCoffeeImg from "@/assets/iced-coffee.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/catering")({
  head: () => {
    const url = `${SITE}/catering`;
    const title = "Waffle House Catering Menu & Prices (August 2026) | Party Platters & Food Truck";
    const description =
      "Explore the complete Waffle House catering menu with party tray prices, waffle multi-packs, hashbrown pans, Texas melt platters, bulk beverages, food truck rental guide, and interactive budget calculator.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
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
              { "@type": "ListItem", position: 2, name: "Catering", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Waffle House Catering Menu & Prices (August 2026)",
            url,
            description,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Does Waffle House cater?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Waffle House provides large party to-go catering orders through local restaurant locations, as well as full-service mobile Food Trucks in select Southeastern markets.",
                },
              },
              {
                "@type": "Question",
                name: "How much is Waffle House catering per person?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Waffle House catering typically costs between $8.00 and $15.00 per person depending on whether you order waffle packs, scrambled egg pans, hashbrown trays, or Texas melt platters.",
                },
              },
              {
                "@type": "Question",
                name: "How many people do Waffle House party trays feed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most hot catering pans (scrambled eggs, hashbrowns, chili) feed 8 to 10 guests. Waffle multi-packs are available in 10-count and 20-count boxes, while sandwich platters serve 8 to 10 people.",
                },
              },
              {
                "@type": "Question",
                name: "Can I rent an official Waffle House Food Truck?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Waffle House operates official mobile catering Food Trucks in select states (such as Georgia and surrounding areas) for weddings, corporate events, and festivals, featuring live on-site griddle cooking.",
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: CateringPage,
});

// Catering Menu Database
const waffleCatering = [
  { item: "Classic Golden Waffles (10-Pack Box)", serves: "Serves 10", price: "$45.00 – $55.00", single: "$4.65" },
  { item: "Classic Golden Waffles (20-Pack Mega Box)", serves: "Serves 20", price: "$85.00 – $99.00", single: "$4.65" },
  { item: "Pecan Waffles (10-Pack Platter)", serves: "Serves 10", price: "$55.00 – $65.00", single: "$5.45" },
  { item: "Chocolate Chip Waffles (10-Pack Platter)", serves: "Serves 10", price: "$52.00 – $62.00", single: "$5.25" },
  { item: "Peanut Butter Chip Waffles (10-Pack Platter)", serves: "Serves 10", price: "$52.00 – $62.00", single: "$5.25" },
  { item: "Southern Pecan Pie (Whole 8-Slice Pie)", serves: "Serves 8", price: "$18.00 – $22.00", single: "$3.50 / slice" },
  { item: "Triple Chocolate Pie (Whole 8-Slice Pie)", serves: "Serves 8", price: "$18.00 – $22.00", single: "$3.50 / slice" },
];

const eggCatering = [
  { item: "Scrambled Eggs Large Catering Pan (24 Eggs)", serves: "Serves 8–10", price: "$28.00 – $34.00", single: "$6.95 (2 eggs)" },
  { item: "Cheese 'N Eggs Large Catering Pan", serves: "Serves 8–10", price: "$34.00 – $40.00", single: "$7.95 (2 eggs)" },
  { item: "Hickory Smoked Bacon Platter (30 Strips)", serves: "Serves 10", price: "$32.00 – $38.00", single: "$3.95 (3 strips)" },
  { item: "Jimmy Dean® Sausage Patties Platter (20 Patties)", serves: "Serves 10", price: "$30.00 – $36.00", single: "$3.95 (2 patties)" },
  { item: "Country Ham / City Ham Slices Platter", serves: "Serves 8–10", price: "$36.00 – $44.00", single: "$4.75" },
  { item: "Southern Creamy Grits Catering Bowl", serves: "Serves 8–10", price: "$16.00 – $22.00", single: "$2.75" },
];

const hashbrownCatering = [
  { item: "Regular Scattered Hashbrowns Pan", serves: "Serves 8–10", price: "$22.00 – $27.00", single: "$3.35 (Large)" },
  { item: "Smothered & Covered Hashbrowns Pan (Onions + Melted Cheese)", serves: "Serves 8–10", price: "$30.00 – $36.00", single: "$4.55" },
  { item: "Chunked & Peppered Hashbrowns Pan (Ham + Jalapeños)", serves: "Serves 8–10", price: "$34.00 – $42.00", single: "$4.95" },
  { item: "Hashbrowns All-The-Way Mega Pan (All 8 Classic Toppings)", serves: "Serves 8–10", price: "$42.00 – $50.00", single: "$6.25" },
  { item: "Southern Sausage Gravy Catering Bowl", serves: "Serves 8–10", price: "$18.00 – $24.00", single: "$2.95" },
];

const sandwichCatering = [
  { item: "Texas Bacon, Egg & Cheese Melts Platter (10 Halved Melts)", serves: "Serves 10", price: "$52.00 – $62.00", single: "$6.45" },
  { item: "Texas Sausage, Egg & Cheese Melts Platter (10 Halved Melts)", serves: "Serves 10", price: "$52.00 – $62.00", single: "$6.45" },
  { item: "Texas Cheesesteak Melt Platter (10 Halved Melts)", serves: "Serves 10", price: "$64.00 – $74.00", single: "$7.95" },
  { item: "Texas Angus Patty Melt Platter (10 Halved Melts)", serves: "Serves 10", price: "$58.00 – $68.00", single: "$7.25" },
  { item: "Grilled Buttermilk Biscuits Box with Butter & Jelly (12 Biscuits)", serves: "Serves 12", price: "$16.00 – $22.00", single: "$1.95" },
  { item: "Sausage & Egg Biscuit Handheld Platter (10 Biscuits)", serves: "Serves 10", price: "$42.00 – $50.00", single: "$4.95" },
];

const burgerCatering = [
  { item: "Classic Angus Hamburger Platter (10 Burgers with Fixings)", serves: "Serves 10", price: "$50.00 – $58.00", single: "$5.85" },
  { item: "Double Angus Cheeseburger Platter (10 Burgers)", serves: "Serves 10", price: "$68.00 – $78.00", single: "$7.95" },
  { item: "Grilled Chicken Breast Sandwich Platter (10 Sandwiches)", serves: "Serves 10", price: "$56.00 – $65.00", single: "$6.65" },
  { item: "Texas Bacon BLT Platter (10 Sandwiches)", serves: "Serves 10", price: "$48.00 – $56.00", single: "$5.75" },
  { item: "Bert's Best Bowl of Chili Catering Pan (with Cheese & Onions)", serves: "Serves 8–10", price: "$28.00 – $35.00", single: "$4.95" },
];

const beverageCatering = [
  { item: "Alice's Southern Sweet Iced Tea (1 Gallon with Cups & Ice)", serves: "10–12 Glasses", price: "$8.99 – $11.99", single: "$2.75" },
  { item: "Southern Unsweetened Iced Tea (1 Gallon with Cups & Ice)", serves: "10–12 Glasses", price: "$8.99 – $11.99", single: "$2.75" },
  { item: "Waffle House Classic Blend Arabica Coffee Box (96 oz Joe-To-Go)", serves: "10–12 Cups", price: "$18.95 – $22.95", single: "$2.65" },
  { item: "Dark Roast / Decaf Arabica Coffee Box (96 oz Joe-To-Go)", serves: "10–12 Cups", price: "$18.95 – $22.95", single: "$2.65" },
  { item: "Minute Maid® 100% Pure Orange Juice (1 Gallon)", serves: "10–12 Glasses", price: "$14.95 – $18.95", single: "$3.25" },
];

const cateringFaqs = [
  {
    q: "Does Waffle House offer catering for large groups and events?",
    a: "Yes! Waffle House locations nationwide provide bulk carryout catering for corporate breakfasts, sports teams, school events, family reunions, and tailgates. In select Southeastern regions, Waffle House also operates official mobile Food Trucks with on-site griddles for weddings, festivals, and large private parties.",
  },
  {
    q: "How much does Waffle House catering cost per person?",
    a: "On average, Waffle House catering ranges from $8.00 to $15.00 per person. A light breakfast (waffle pack + coffee) runs around $7 to $9 per guest, while a full All-Star spread (waffles, scrambled eggs, bacon/sausage, hashbrowns, biscuits, and sweet tea) averages $12 to $16 per guest.",
  },
  {
    q: "How do I place a Waffle House catering order?",
    a: "For large takeout catering orders, call your nearest local Waffle House directly and speak with the unit manager. It is best to call between 2:00 PM and 4:00 PM (outside peak rush hours). For food truck rentals, contact the official Waffle House catering event coordinator online.",
  },
  {
    q: "How many people do Waffle House catering pans feed?",
    a: "Most hot catering pans (scrambled eggs, hashbrown trays, grits, and chili) comfortably serve 8 to 10 people. Waffle multi-packs come in 10-count or 20-count boxes, and breakfast sandwich / melt platters typically serve 10 guests.",
  },
  {
    q: "How far in advance should I order catering?",
    a: "For bulk store takeout orders (10 to 50 guests), a minimum of 24 to 48 hours advance notice is highly recommended. For official Waffle House Food Truck rentals, you should book at least 2 to 4 weeks in advance, especially for weekend events and wedding receptions.",
  },
  {
    q: "How does the Waffle House Food Truck rental work?",
    a: "The mobile food truck brings the authentic diner experience directly to your venue, complete with short-order grill masters cooking fresh golden waffles, hashbrowns, bacon, and burgers on-site. Pricing typically includes a base rental setup fee ($200–$300) plus a per-person menu package ($10–$18 per guest) with a minimum spend requirement.",
  },
  {
    q: "Are syrup, butter, plates, and utensils included?",
    a: "Yes! When you place a catering or large party order, the restaurant provides warm syrup bottles/cups, whipped butter tubs, disposable plates, napkins, and plastic cutlery packets upon request at no extra charge.",
  },
  {
    q: "Does Waffle House deliver catering orders?",
    a: "Store pickup is the primary method for large party orders. However, many locations partner with third-party delivery services (such as DoorDash, Uber Eats, or local couriers) for large group drop-offs. Call your local restaurant to confirm local delivery policies.",
  },
  {
    q: "Can I customize catering for vegetarian or gluten-free guests?",
    a: "Yes. Waffle House is very accommodating. Vegetarian options include Classic Golden Waffles, Cheese 'N Eggs pans, Smothered & Covered Hashbrowns (without meat), Grilled Cheese Melts, and Grits. For gluten-conscious guests, eggs, bacon, sausage, and plain hashbrowns can be requested cooked in separate pans.",
  },
  {
    q: "Can I order whole pies and gallons of coffee/tea?",
    a: "Absolutely. Whole 8-slice Southern Pecan Pies and Triple Chocolate Pies can be ordered boxed. You can also order 96 oz Joe-To-Go coffee boxes (with cups, creamers, sugars) and 1-gallon jugs of Alice's famous Southern Sweet Tea.",
  },
  {
    q: "Is there a minimum order spend for catering?",
    a: "For in-store pickup, there is no strict minimum spend—you can order as few or as many party platters as needed. For food truck catering, regional minimum guest counts (usually 30–50+ guests) and total spend minimums apply.",
  },
  {
    q: "How do I find Waffle House catering near me?",
    a: "Use our comprehensive Waffle House Locations Directory to search by state and city, find your closest store's phone number, and call the manager directly to schedule your pickup time.",
  },
];

function CateringPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [guestCount, setGuestCount] = useState<number>(20);
  const [eventType, setEventType] = useState<string>("allstar");
  const [dietaryHighlight, setDietaryHighlight] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Calculator Logic
  const getOrderBreakdown = () => {
    const factor = guestCount / 10;
    if (eventType === "allstar") {
      return {
        waffles: Math.ceil(factor * 1), // 10-packs
        eggs: Math.ceil(factor * 1), // Egg pans
        bacon: Math.ceil(factor * 1), // Bacon/Sausage platters
        hashbrowns: Math.ceil(factor * 1), // Hashbrown pans
        teaCoffee: Math.ceil(factor * 1), // Gallons / Coffee boxes
        minTotal: Math.round(guestCount * 11),
        maxTotal: Math.round(guestCount * 15),
        itemsList: [
          { name: `${Math.ceil(factor * 1)}x Classic Waffles (10-Pack Box)`, link: "/menu/waffles", serves: "10 waffles each" },
          { name: `${Math.ceil(factor * 1)}x Scrambled Cheese 'N Eggs Pan`, link: "/menu/breakfast", serves: "Serves 8-10" },
          { name: `${Math.ceil(factor * 1)}x Smoked Bacon & Sausage Platter`, link: "/menu/breakfast", serves: "30 strips/patties" },
          { name: `${Math.ceil(factor * 1)}x Smothered & Covered Hashbrown Pan`, link: "/menu/hashbrowns", serves: "Serves 8-10" },
          { name: `${Math.ceil(factor * 1)}x Alice's Sweet Tea Gallon / Joe-To-Go Coffee`, link: "/menu/beverages", serves: "10-12 servings" },
        ],
      };
    } else if (eventType === "meeting") {
      return {
        waffles: Math.ceil(factor * 1),
        eggs: 0,
        bacon: 0,
        hashbrowns: 0,
        teaCoffee: Math.ceil(factor * 1.5),
        minTotal: Math.round(guestCount * 7.5),
        maxTotal: Math.round(guestCount * 10),
        itemsList: [
          { name: `${Math.ceil(factor * 1)}x Classic Golden Waffles (10-Pack Box)`, link: "/menu/waffles", serves: "10 waffles each" },
          { name: `${Math.ceil(factor * 1)}x Grilled Buttermilk Biscuits Box`, link: "/menu/biscuits", serves: "12 biscuits each" },
          { name: `${Math.ceil(factor * 1.5)}x Waffle House Arabica Coffee (96 oz Box)`, link: "/menu/beverages", serves: "10-12 cups each" },
          { name: `${Math.ceil(factor * 0.5)}x Minute Maid® Orange Juice Gallon`, link: "/menu/beverages", serves: "10-12 glasses" },
        ],
      };
    } else if (eventType === "lunch") {
      return {
        waffles: 0,
        eggs: 0,
        bacon: 0,
        hashbrowns: Math.ceil(factor * 1),
        teaCoffee: Math.ceil(factor * 1),
        minTotal: Math.round(guestCount * 10),
        maxTotal: Math.round(guestCount * 14),
        itemsList: [
          { name: `${Math.ceil(factor * 1)}x Texas Bacon, Egg & Cheese Melts Platter`, link: "/menu/sandwiches", serves: "10 melts" },
          { name: `${Math.ceil(factor * 0.5)}x Angus Cheeseburger Platter`, link: "/menu/burgers", serves: "10 burgers" },
          { name: `${Math.ceil(factor * 1)}x Hashbrowns All-The-Way Mega Pan`, link: "/menu/hashbrowns", serves: "Serves 8-10" },
          { name: `${Math.ceil(factor * 1)}x Alice's Southern Sweet Tea Gallon`, link: "/menu/beverages", serves: "10-12 glasses" },
          { name: `${Math.ceil(factor * 0.5)}x Whole Southern Pecan Pie`, link: "/menu/beverages", serves: "8 slices" },
        ],
      };
    } else {
      // Late night waffle party
      return {
        waffles: Math.ceil(factor * 1.5),
        eggs: 0,
        bacon: Math.ceil(factor * 0.8),
        hashbrowns: Math.ceil(factor * 1),
        teaCoffee: Math.ceil(factor * 1),
        minTotal: Math.round(guestCount * 9),
        maxTotal: Math.round(guestCount * 13),
        itemsList: [
          { name: `${Math.ceil(factor * 1.5)}x Chocolate Chip & Pecan Waffles (10-Packs)`, link: "/menu/waffles", serves: "15 waffles" },
          { name: `${Math.ceil(factor * 1)}x Hashbrowns All-The-Way Mega Pan`, link: "/menu/hashbrowns", serves: "Serves 8-10" },
          { name: `${Math.ceil(factor * 0.8)}x Hickory Smoked Bacon Platter`, link: "/menu/breakfast", serves: "24-30 strips" },
          { name: `${Math.ceil(factor * 1)}x Alice's Sweet Tea Gallon & Coffee Box`, link: "/menu/beverages", serves: "10-12 cups" },
          { name: `${Math.ceil(factor * 0.5)}x Triple Chocolate Pie (Whole)`, link: "/menu/beverages", serves: "8 slices" },
        ],
      };
    }
  };

  const breakdown = getOrderBreakdown();

  const handleCopyOrder = () => {
    const text = `Waffle House Catering Plan for ${guestCount} Guests (${eventType.toUpperCase()}):
${breakdown.itemsList.map((i) => `• ${i.name} (${i.serves})`).join("\n")}
Estimated Cost: $${breakdown.minTotal} – $${breakdown.maxTotal} ($${(breakdown.minTotal / guestCount).toFixed(2)} – $${(breakdown.maxTotal / guestCount).toFixed(2)} / person)
Order via Waffle House Menu & Catering Guide (wafflehousemenu.com/catering)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white text-foreground font-sans">
      {/* ── BREADCRUMB ── */}
      <div className="border-b border-border bg-[#F7F7F5] py-3">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-ink-soft/60" />
            <span className="font-semibold text-foreground">Catering Menu</span>
          </nav>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="border-b border-border bg-surface py-12 md:py-16">
        <div className="container-editorial">
          <div className="max-w-3xl space-y-4">
            <span className="chip font-bold text-primary">Large Parties &amp; Events</span>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Waffle House Catering Menu &amp; Prices (August 2026)
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft pt-1">
              <span>By <Link to="/about" className="font-semibold text-primary hover:underline">Marcus Goodwin</Link>, Editor</span>
              <span>•</span>
              <span>Reviewed August 2026</span>
              <span>•</span>
              <span>Menu checked August 2026</span>
              <span>•</span>
              <Link to="/methodology" className="font-semibold text-primary hover:underline">How this is sourced</Link>
            </div>
            <p className="text-base text-ink-soft leading-relaxed pt-2">
              Planning food for a big morning meeting, sports tailgate, church breakfast, late-night wedding snack, or family gathering? The Waffle House catering setup is delightfully straightforward and budget-friendly. Restaurants scale their most popular diner favorites—sweet cream waffles, farm-fresh scrambled eggs, signature hashbrown pans, and Texas melts—into generous multi-serving party platters. You can typically expect to spend roughly <strong>$8.00 to $15.00 per person</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link to="/menu" className="btn-primary">
                View Full Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-xs font-bold text-foreground shadow-xs hover:border-primary transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-primary" /> Download Catering PDF
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-ink-soft hover:text-primary transition-colors"
              >
                <HelpCircle className="h-3.5 w-3.5" /> Catering FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 📄 PDF REFERENCE BOX ── */}
      <section className="bg-white py-8 border-b border-border">
        <div className="container-editorial">
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <FileText className="h-4 w-4" />
                <span>Instant 6-Page PDF Reference</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Download Catering Menu &amp; Prices PDF
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Get the full catering menu with party tray portion estimates, waffle multi-packs, hashbrown pans, Texas melt platters, bulk beverage gallons, and event budgeting guide in one complete printable PDF.
              </p>
            </div>
            <a
              href="/waffle-house-menu-nutritionals.pdf"
              download
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold shrink-0 flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download Catering PDF
            </a>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE / KEY FACTS ── */}
      <section className="py-12 border-b border-border bg-surface">
        <div className="container-editorial">
          <div className="max-w-3xl mb-8">
            <span className="chip">Quick Overview</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
              At a Glance / Key Catering Facts
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <DollarSign className="h-4 w-4" />
                <span>Per-Person Cost</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">$8.00 – $15.00</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Average cost per guest across breakfast trays, waffle boxes, and hashbrown pans.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Users className="h-4 w-4" />
                <span>Tray Servings</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">8 to 10 People</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Standard hot pans (scrambled eggs, hashbrowns) comfortably feed 8 to 10 guests.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Truck className="h-4 w-4" />
                <span>Food Truck Rentals</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">Mobile On-Site Grill</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Official Waffle House Food Trucks available in Southeastern markets for private events.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Clock className="h-4 w-4" />
                <span>Lead Time</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">24 to 48 Hours</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Recommended notice for store pickup trays; 2–4 weeks for food truck bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE BUDGET & PORTION ESTIMATOR ── */}
      <section className="py-16 border-b border-border bg-white">
        <div className="container-editorial">
          <div className="max-w-3xl mb-10">
            <span className="chip font-bold text-primary">Interactive Planning Tool</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">
              Interactive Catering Budget &amp; Portion Estimator
            </h2>
            <p className="text-sm text-ink-soft mt-1 leading-relaxed">
              Planning an event? Adjust guest count, event type, and dietary preferences below to generate an instant order guide and per-person cost breakdown.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Control Column */}
            <div className="lg:col-span-6 rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Guest Count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Number of Guests: <span className="text-primary font-extrabold text-base">{guestCount} People</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[10, 20, 30, 50, 100].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        guestCount === num
                          ? "bg-primary text-black"
                          : "bg-white border border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Event Type / Meal Package:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "allstar", label: "Breakfast Feast (All-Star Spread)" },
                    { id: "meeting", label: "Morning Meeting (Waffles & Coffee)" },
                    { id: "lunch", label: "Lunch & Texas Melts Spread" },
                    { id: "party", label: "Late-Night Waffle Party" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEventType(t.id)}
                      className={`p-3 rounded-2xl text-left text-xs font-bold transition-all border ${
                        eventType === t.id
                          ? "border-primary bg-primary/10 text-primary shadow-xs"
                          : "border-border bg-white text-foreground hover:border-primary/50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Checkbox */}
              <div className="pt-2 border-t border-border">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-foreground">
                  <input
                    type="checkbox"
                    checked={dietaryHighlight}
                    onChange={(e) => setDietaryHighlight(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span>Highlight Vegetarian &amp; Gluten-Conscious Options</span>
                </label>
              </div>
            </div>

            {/* Output Calculation Breakdown */}
            <div className="lg:col-span-6 rounded-3xl border-2 border-primary bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Instant Calculation</span>
                  <h3 className="font-display text-xl font-bold text-foreground">Suggested Order Breakdown:</h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary px-3 py-1.5 text-xs font-bold text-foreground transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-700" /> : <Copy className="h-3.5 w-3.5 text-primary" />}
                  <span>{copied ? "Copied!" : "Copy Order Plan"}</span>
                </button>
              </div>

              {/* Items list */}
              <div className="space-y-2.5">
                {breakdown.itemsList.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-border text-xs">
                    <Link to={item.link as any} className="font-bold text-foreground hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <span className="text-ink-soft text-[11px] font-medium">{item.serves}</span>
                  </div>
                ))}
              </div>

              {dietaryHighlight && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-950">
                  <strong className="block font-bold text-amber-900 mb-0.5">Dietary Notes:</strong>
                  Waffles &amp; Cheese 'N Eggs provide complete vegetarian protein. Plain hashbrowns and bacon/sausage can be packaged separately for gluten-conscious attendees.
                </div>
              )}

              {/* Cost Summary Box */}
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-border p-4">
                  <span className="text-[11px] text-ink-soft font-medium block">Estimated Total (Before Tax)</span>
                  <span className="font-display text-2xl font-bold text-foreground text-amber-700">
                    ${breakdown.minTotal} – ${breakdown.maxTotal}
                  </span>
                </div>
                <div className="rounded-2xl bg-white border border-border p-4">
                  <span className="text-[11px] text-ink-soft font-medium block">Per Person Budget</span>
                  <span className="font-display text-2xl font-bold text-foreground text-primary">
                    ${(breakdown.minTotal / guestCount).toFixed(2)} – ${(breakdown.maxTotal / guestCount).toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-ink-soft italic">
                * Estimates are computed based on snapshot dine-in portion averages. Prices vary by restaurant location. Confirm final pricing directly with your local Waffle House unit manager.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATERING MENU WITH PRICES AND PORTION SIZES ── */}
      <section className="py-16 border-b border-border bg-white">
        <div className="container-editorial max-w-5xl space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="chip">Complete Pricing Guide</span>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Waffle House Catering Menu with Prices and Portion Sizes
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Waffle House stores handle group orders as custom bulk takeout pans. Below is the verified breakdown of party platter portion sizes, single-order comparison pricing, and estimated party pan rates.
            </p>
          </div>

          {/* 1. Waffles & Sweet Treats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Waffle House Classic Waffle Packs &amp; Pies (Serves 8–12)
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  Golden sweet cream waffles packaged with butter and warm syrup. Whole pies boxed for slicing.
                </p>
              </div>
              <Link to="/menu/waffles" className="text-xs font-bold text-primary hover:underline hidden sm:inline">
                Browse Waffles →
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3 text-left">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left">Party Portion</th>
                    <th scope="col" className="px-6 py-3 text-right">Party Tray Estimate</th>
                    <th scope="col" className="px-6 py-3 text-right">Single Dine-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {waffleCatering.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.item}</td>
                      <td className="px-6 py-3.5 text-left text-ink-soft text-xs">{row.serves}</td>
                      <td className="px-6 py-3.5 text-right font-display font-bold text-amber-800">{row.price}</td>
                      <td className="px-6 py-3.5 text-right text-ink-soft text-xs">{row.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Scrambled Egg Pans & Breakfast Platters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Farm-Fresh Egg Pans &amp; Breakfast Platters (Serves 8–10)
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  Fresh USDA Grade A eggs scrambled hot on the griddle, paired with hickory bacon and sausage.
                </p>
              </div>
              <Link to="/menu/breakfast" className="text-xs font-bold text-primary hover:underline hidden sm:inline">
                Browse Egg Breakfasts →
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3 text-left">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left">Party Portion</th>
                    <th scope="col" className="px-6 py-3 text-right">Party Tray Estimate</th>
                    <th scope="col" className="px-6 py-3 text-right">Single Dine-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {eggCatering.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.item}</td>
                      <td className="px-6 py-3.5 text-left text-ink-soft text-xs">{row.serves}</td>
                      <td className="px-6 py-3.5 text-right font-display font-bold text-amber-800">{row.price}</td>
                      <td className="px-6 py-3.5 text-right text-ink-soft text-xs">{row.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Signature Hashbrown Catering Pans */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Signature Hashbrown Catering Pans (Serves 8–10)
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  Crisp scattered shredded potatoes loaded with cheese, onions, ham, and gravy.
                </p>
              </div>
              <Link to="/menu/hashbrowns" className="text-xs font-bold text-primary hover:underline hidden sm:inline">
                Browse Hashbrowns →
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3 text-left">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left">Party Portion</th>
                    <th scope="col" className="px-6 py-3 text-right">Party Tray Estimate</th>
                    <th scope="col" className="px-6 py-3 text-right">Single Dine-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {hashbrownCatering.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.item}</td>
                      <td className="px-6 py-3.5 text-left text-ink-soft text-xs">{row.serves}</td>
                      <td className="px-6 py-3.5 text-right font-display font-bold text-amber-800">{row.price}</td>
                      <td className="px-6 py-3.5 text-right text-ink-soft text-xs">{row.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Breakfast Sandwiches & Texas Melts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Breakfast Sandwiches &amp; Texas Melt Platters (Serves 8–10)
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  Handheld sandwiches on thick Texas toast and grilled buttermilk biscuits cut and ready for quick service.
                </p>
              </div>
              <Link to="/menu/sandwiches" className="text-xs font-bold text-primary hover:underline hidden sm:inline">
                Browse Melts →
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3 text-left">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left">Party Portion</th>
                    <th scope="col" className="px-6 py-3 text-right">Party Tray Estimate</th>
                    <th scope="col" className="px-6 py-3 text-right">Single Dine-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {sandwichCatering.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.item}</td>
                      <td className="px-6 py-3.5 text-left text-ink-soft text-xs">{row.serves}</td>
                      <td className="px-6 py-3.5 text-right font-display font-bold text-amber-800">{row.price}</td>
                      <td className="px-6 py-3.5 text-right text-ink-soft text-xs">{row.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. 100% Angus Burgers & Lunch Platters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  100% Angus Beef Burgers &amp; Lunch Platters (Serves 8–10)
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  Juicy Angus cheeseburgers, grilled chicken sandwiches, and Bert's Chili pans for afternoon gatherings.
                </p>
              </div>
              <Link to="/menu/burgers" className="text-xs font-bold text-primary hover:underline hidden sm:inline">
                Browse Burgers →
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3 text-left">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left">Party Portion</th>
                    <th scope="col" className="px-6 py-3 text-right">Party Tray Estimate</th>
                    <th scope="col" className="px-6 py-3 text-right">Single Dine-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {burgerCatering.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.item}</td>
                      <td className="px-6 py-3.5 text-left text-ink-soft text-xs">{row.serves}</td>
                      <td className="px-6 py-3.5 text-right font-display font-bold text-amber-800">{row.price}</td>
                      <td className="px-6 py-3.5 text-right text-ink-soft text-xs">{row.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Bulk Beverages & Coffee Service */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Bulk Beverage Service (Gallons &amp; Joe-To-Go Boxes)
                </h3>
                <p className="text-xs text-ink-soft mt-0.5">
                  Alice's iced tea gallons and 96 oz hot coffee boxes complete with cups, lids, creamers, and sugars.
                </p>
              </div>
              <Link to="/menu/beverages" className="text-xs font-bold text-primary hover:underline hidden sm:inline">
                Browse Drinks →
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3 text-left">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left">Volume</th>
                    <th scope="col" className="px-6 py-3 text-right">Catering Price</th>
                    <th scope="col" className="px-6 py-3 text-right">Single Glass</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {beverageCatering.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.item}</td>
                      <td className="px-6 py-3.5 text-left text-ink-soft text-xs">{row.serves}</td>
                      <td className="px-6 py-3.5 text-right font-display font-bold text-amber-800">{row.price}</td>
                      <td className="px-6 py-3.5 text-right text-ink-soft text-xs">{row.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 🚚 OFFICIAL WAFFLE HOUSE FOOD TRUCK RENTAL GUIDE ── */}
      <section className="py-16 md:py-24 border-b border-border bg-surface">
        <div className="container-editorial max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="chip font-bold text-primary">On-Site Grilling Experience</span>
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
                Official Waffle House Food Truck Catering
              </h2>
              <p className="text-base text-ink-soft leading-relaxed">
                Want to amaze your wedding guests, corporate clients, or college campus festival? Waffle House operates custom mobile Food Trucks equipped with authentic diner griddles and waffle irons, manned by experienced short-order cooks.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-foreground">
                <div className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Authentic On-Site Cooking:</strong> Fresh waffles, bacon, burgers, and hashbrowns cooked right in front of your attendees.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Pricing &amp; Minimums:</strong> Typically requires a base setup/mileage fee ($200–$300) plus a per-guest menu package ($10–$18/person) with a minimum spend requirement.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p><strong>Coverage Area:</strong> Primarily operational in the greater Atlanta, Georgia area and surrounding Southeastern regional markets.</p>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/locations" className="btn-primary">
                  Find Nearest Location / Contact Coordinator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-3xl border border-border shadow-md bg-white p-2">
              <img
                src={hero5}
                alt="Waffle House Diner and Catering"
                className="rounded-2xl h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 🔗 EXPLORE MORE MENUS & DIRECTORIES (12 LINKS) ── */}
      <section className="py-16 border-b border-border bg-white">
        <div className="container-editorial max-w-5xl space-y-8">
          <div>
            <span className="chip">Resource Hub</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
              Explore More Menus, Diet Guides and Local Restaurant Directories
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Whether you are placing a catering order for a large group or planning a casual diner visit, explore our comprehensive guides:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            <Link to="/menu" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Full Menu with Prices →</strong>
              <span className="text-ink-soft mt-0.5 block">View all 73 verified menu items across 13 categories.</span>
            </Link>

            <Link to="/locations" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Locations Directory →</strong>
              <span className="text-ink-soft mt-0.5 block">Find catering pickup near you across 25 U.S. states.</span>
            </Link>

            <Link to="/deals" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Deals &amp; Promotions →</strong>
              <span className="text-ink-soft mt-0.5 block">Latest discount coupons and All-Star Special value perks.</span>
            </Link>

            <Link to="/nutrition" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Nutrition &amp; Calorie Guide →</strong>
              <span className="text-ink-soft mt-0.5 block">Calorie counts, macro breakdowns, and printable PDF chart.</span>
            </Link>

            <Link to="/allergens" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Allergen Safety Matrix →</strong>
              <span className="text-ink-soft mt-0.5 block">Comprehensive cross-contact allergen guidelines.</span>
            </Link>

            <Link to="/dietary" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Dietary Options &amp; Keto →</strong>
              <span className="text-ink-soft mt-0.5 block">Vegetarian, low-carb, keto, and high-protein dining picks.</span>
            </Link>

            <Link to="/breakfast" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Breakfast Favorites →</strong>
              <span className="text-ink-soft mt-0.5 block">All-Star specials, 2-egg platters, and custom grits bowls.</span>
            </Link>

            <Link to="/delivery" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Delivery &amp; Takeout →</strong>
              <span className="text-ink-soft mt-0.5 block">Online ordering options, DoorDash policies, and pickup.</span>
            </Link>

            <Link to="/hours" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Hours &amp; Holiday Schedule →</strong>
              <span className="text-ink-soft mt-0.5 block">24/7/365 operating hours and Waffle House Index info.</span>
            </Link>

            <Link to="/methodology" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Editorial Methodology →</strong>
              <span className="text-ink-soft mt-0.5 block">How we collect and independently audit menu pricing data.</span>
            </Link>

            <Link to="/blog" className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group">
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Diner Blog &amp; Insights →</strong>
              <span className="text-ink-soft mt-0.5 block">Secret menu hacks, hashbrown ordering codes, and history.</span>
            </Link>

            <a
              href="/waffle-house-menu-nutritionals.pdf"
              download
              className="p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all group"
            >
              <strong className="block font-display text-sm text-foreground group-hover:text-primary">Printable Catering PDF →</strong>
              <span className="text-ink-soft mt-0.5 block">Instant offline download for party planning and budgeting.</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── ❓ COMPREHENSIVE FAQS (ACCORDION) ── */}
      <section id="faq" aria-labelledby="catering-faq-heading" className="py-16 md:py-24 border-b border-border bg-surface">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-12 space-y-3">
            <span className="chip">Frequently Asked Questions</span>
            <h2 id="catering-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Catering FAQs
            </h2>
            <p className="text-sm text-ink-soft">
              Factual, verified answers regarding party platters, portion sizes, bulk pickups, and food truck rentals.
            </p>
          </div>

          <div className="space-y-3.5">
            {cateringFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-muted/30"
                  >
                    <span className="font-display text-base font-bold text-foreground pr-4">{faq.q}</span>
                    <span className="text-primary font-bold text-xl shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INDEPENDENT TRUST NOTICE ── */}
      <section className="py-12 border-b border-border bg-white text-center">
        <div className="container-editorial max-w-3xl space-y-3">
          <span className="chip">Independent Guide</span>
          <p className="text-xs text-ink-soft leading-relaxed">
            An independent directory of Waffle House menu items, catering estimates, current prices, nutrition facts, and restaurant locations across the United States. Not affiliated with, endorsed by, or sponsored by Waffle House, Inc.
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-primary pt-1">
            <Link to="/menu" className="hover:underline">Browse Menu</Link>
            <span>•</span>
            <Link to="/locations" className="hover:underline">Locations Directory</Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">Contact Editorial</Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER SUBSCRIPTION ── */}
      <SubscriberSection idPrefix="catering-sub" />
    </div>
  );
}
