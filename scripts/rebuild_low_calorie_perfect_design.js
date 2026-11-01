const fs = require('fs');

// Read the raw items from build_low_calorie_page.js
const sourceFile = fs.readFileSync('scripts/build_low_calorie_page.js', 'utf8');
const match = sourceFile.match(/const rawItems = (\[[\s\S]*?\]);\s*\/\/ Sort ascending/);
if (!match) {
  console.error('Could not extract rawItems!');
  process.exit(1);
}

const rawItems = eval(match[1]);
rawItems.sort((a, b) => a.cal - b.cal);

const totalDishes = rawItems.length;
const avgCalories = Math.round(rawItems.reduce((acc, it) => acc + it.cal, 0) / totalDishes);
const avgProtein = Math.round(rawItems.reduce((acc, it) => acc + parseInt(it.pro), 0) / totalDishes);
const avgSodium = Math.round(rawItems.reduce((acc, it) => acc + parseInt(it.sodium), 0) / totalDishes);

function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waffle House Low-Calorie Menu: ${totalDishes} Dishes Under 600 Calories (2026)</title>
  <meta name="description" content="Explore ${totalDishes} official Waffle House dishes under 600 calories ranked lightest first. Full nutritional profile: calories, protein, sodium, fat, and ordering tips.">
  <link rel="canonical" href="https://www.wafflehouse-menu.com/diet/low-calorie/">
  <meta name="robots" content="index, follow, max-image-preview:large">

  <!-- Open Graph -->
  <meta property="og:title" content="Waffle House Low-Calorie Menu: ${totalDishes} Dishes Under 600 Calories (2026)">
  <meta property="og:description" content="Ranked lightest first: every Waffle House meal under 600 calories with exact protein, calories, and sodium counts.">
  <meta property="og:url" content="https://www.wafflehouse-menu.com/diet/low-calorie/">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://www.wafflehouse-menu.com/assets/nutrition/classic-waffle.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  
  <!-- Fonts & Primary Site Stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/home.css">

  <!-- Robust Fallback & Component Styles -->
  <style>
    body {
      font-family: 'Work Sans', sans-serif;
      background-color: #FAF7F0;
      color: #0B0B0E;
      margin: 0;
      padding: 0;
    }
    h1, h2, h3, h4, h5, .font-heading {
      font-family: 'Poppins', sans-serif;
    }
    .bg-brandYellow { background-color: #FFC72C; }
    .text-brandDark { color: #0B0B0E; }
    
    /* Interactive Filter Buttons */
    .filter-btn {
      transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
    }
    .filter-btn.active {
      background-color: #FFC72C !important;
      color: #0B0B0E !important;
      border-color: #FFC72C !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
    
    /* Table Styling */
    .dish-row {
      transition: background-color 0.15s ease;
    }
    .dish-row:hover {
      background-color: #FFFDF5;
    }

    /* Essential Dropdown Styles: Hidden by default, visible on hover */
    .dropdown-panel {
      display: none;
    }
    .group:hover > .dropdown-panel {
      display: block;
    }
  </style>

  <!-- Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.wafflehouse-menu.com/diet/low-calorie/#webpage",
        "url": "https://www.wafflehouse-menu.com/diet/low-calorie/",
        "name": "Waffle House Low-Calorie Menu: ${totalDishes} Dishes Under 600 Calories (2026)",
        "description": "Ranked calorie leaderboard for Waffle House diner dishes under 600 calories.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.wafflehouse-menu.com/#website",
          "name": "Waffle House Menu Guide",
          "url": "https://www.wafflehouse-menu.com/"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.wafflehouse-menu.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Diet & Nutrition",
              "item": "https://www.wafflehouse-menu.com/nutrition"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Low-Calorie",
              "item": "https://www.wafflehouse-menu.com/diet/low-calorie/"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the absolute lowest-calorie meal combo at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Order 2 farm fresh eggs cooked scrambled or poached (180 calories) with a side of sliced tomatoes (10 calories) and an unsweet iced tea or black coffee (0-5 calories). That entire breakfast is only 190–195 calories with 12 grams of protein."
            }
          },
          {
            "@type": "Question",
            "name": "How can I ensure eggs are cooked without added butter or grease?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Politely ask your server to have the grill operator prepare your eggs 'in the pan with cooking spray' rather than dropping them directly on the seasoned grill surface. This avoids 50 to 100 hidden fat calories."
            }
          },
          {
            "@type": "Question",
            "name": "What is the highest-protein meal under 500 calories?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Meat Lover's Chicken & Eggs platter (2 grilled chicken breasts and 2 whole eggs, plate only) provides 70 grams of protein for just 440 total calories and 16g fat."
            }
          },
          {
            "@type": "Question",
            "name": "Can I fit Waffle House hashbrowns into a low-calorie diet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A regular single order of hashbrowns is 190 calories. You can ask for them prepared 'dry' to minimize oil, and top with grilled tomatoes (+5 cal), capped mushrooms (+10 cal), or smothered onions (+15 cal)."
            }
          },
          {
            "@type": "Question",
            "name": "Why is sodium high on low-calorie diner items?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional cured meats like country ham carry 2,110 mg of sodium. Choosing City Ham (850 mg sodium), grilled chicken (470 mg sodium), or plain eggs (176 mg sodium) dramatically reduces your sodium intake."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="flex flex-col min-h-screen">

  <!-- ================= TOP HEADER (EXACT OFFICIAL SITE HEADER) ================= -->
  <header class="w-full flex flex-col sticky top-0 left-0 right-0 z-50 bg-white shadow-xs border-b border-gray-200">
    
    <!-- Upper Branding Bar -->
    <div class="py-4 md:py-5 text-center px-4 bg-white">
      <a title="WaffleHouse Menu Home" class="inline-block group focus:outline-none" href="/">
        <div class="flex items-center justify-center gap-3 mb-1">
          <img src="/assets/logo-icon.png" width="44" height="44" alt="Waffle House Menu Guide Logo" decoding="async" class="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl shadow-xs group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
          <span class="flex items-center gap-2 text-[26px] sm:text-3xl md:text-[34px] whitespace-nowrap font-black text-[#0B0B0E] tracking-tight font-heading leading-none">
            WaffleHouse
            <span class="bg-[#FFC72C] text-[#0B0B0E] rounded-lg px-2.5 py-1.5 text-[0.62em] uppercase tracking-wider leading-none shadow-xs">Menu</span>
          </span>
        </div>
      </a>
      <p class="text-gray-500 font-medium text-xs sm:text-[13px] tracking-wide">
        Full Information About Waffle House Menu 2026
      </p>
    </div>

    <!-- Lower Brand Yellow Navigation Bar -->
    <div class="bg-[#FFC72C] border-t border-yellow-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 py-3.5" aria-label="Main Navigation">
          
          <!-- Menu & Prices Dropdown -->
          <div class="relative group" id="menu-nav-container">
            <a 
              href="/menu"
              id="menu-nav-btn" 
              class="inline-flex items-center gap-1 text-[#0B0B0E] text-[15px] font-extrabold hover:text-black/70 transition-colors whitespace-nowrap focus:outline-none cursor-pointer py-1"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span>Menu &amp; Prices</span>
              <svg class="w-3.5 h-3.5 text-[#0B0B0E] transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </a>
            <div class="hidden group-hover:block dropdown-panel absolute left-0 top-full pt-2 w-56 z-50 text-left">
              <div class="bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 overflow-hidden">
                <a href="/menu" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Full Menu &amp; Prices
                </a>
                <a href="/menu/pdf" class="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-900 bg-amber-50 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  <span>Printable Menu (PDF)</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">2026</span>
                </a>
                <a href="/prices-by-state" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Prices by State
                </a>
              </div>
            </div>
          </div>

          <a title="Catering" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/waffle-house-catering/">
            Catering
          </a>

          <!-- Nutrition Dropdown (Active) -->
          <div class="relative group" id="nutrition-nav-container">
            <button 
              id="nutrition-nav-btn" 
              type="button" 
              class="inline-flex items-center gap-1 text-[#0B0B0E] text-[15px] font-extrabold hover:text-black/70 transition-colors whitespace-nowrap focus:outline-none cursor-pointer py-1"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="border-b-2 border-[#0B0B0E]">Nutrition</span>
              <svg class="w-3.5 h-3.5 text-[#0B0B0E] transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div class="hidden group-hover:block dropdown-panel absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 z-50 text-left">
              <div class="bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 overflow-hidden">
                <a href="/nutrition" class="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Nutrition Overview
                </a>
                <a href="/waffle-house-calories-allergies/" class="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Calories &amp; Allergies
                </a>
                <a href="/diet/low-calorie/" class="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-900 bg-amber-100/70 hover:bg-[#FFC72C]/30 transition-colors">
                  <span>Low-Calorie Menu</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">Under 600</span>
                </a>
                <a href="/waffle-house-dietary-guide/" class="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Dietary Guide
                </a>
                <a href="/menu/pdf" class="block px-4 py-2.5 text-sm font-bold text-amber-900 bg-amber-50 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  Printable Nutrition PDF
                </a>
              </div>
            </div>
          </div>

          <a title="Deals &amp; Coupons" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/coupons">
            Deals &amp; Coupons
          </a>
          <a title="Blog" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/blog/">
            Blog
          </a>
          <a title="Store Hours &amp; Locations" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/locations">
            Store Hours &amp; Locations
          </a>
          <a title="About Us" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/about">
            About Us
          </a>
          <a title="Contact" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/contact">
            Contact
          </a>
        </nav>

        <!-- Mobile Header Bar -->
        <div class="flex lg:hidden justify-between items-center py-2.5">
          <span class="text-[#0B0B0E] font-black text-sm tracking-wide uppercase font-heading">Menu Navigation</span>
          <button id="mobile-menu-btn" type="button" class="text-[#0B0B0E] p-1.5 hover:bg-black/10 rounded-lg transition-colors focus:outline-none cursor-pointer" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <div id="mobile-nav" class="fixed inset-0 z-50 hidden" aria-hidden="true">
    <div id="mobile-nav-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"></div>
    <aside class="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 overflow-hidden">
      <div class="p-4 bg-[#FFC72C] flex items-center justify-between border-b border-yellow-400">
        <span class="font-heading font-black text-base text-[#0B0B0E] uppercase">WaffleHouse Menu</span>
        <button id="mobile-close-btn" class="p-1 rounded-lg text-[#0B0B0E] hover:bg-black/10" aria-label="Close menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm font-bold">
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/menu">Full Menu &amp; Prices</a>
        <a class="block py-2 border-b border-gray-100 text-amber-900 bg-amber-50 px-2 rounded-lg font-black" href="/diet/low-calorie/">Low-Calorie Menu (Under 600 Cal)</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/nutrition">Nutrition Overview</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/waffle-house-calories-allergies/">Calories &amp; Allergies</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/waffle-house-dietary-guide/">Dietary Guide</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/menu/pdf">Printable Menu (PDF)</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/waffle-house-catering/">Catering</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/locations">Store Hours &amp; Locations</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/coupons">Deals &amp; Coupons</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/blog/">Blog &amp; Guides</a>
        <a class="block py-2 border-b border-gray-100 text-[#0B0B0E]" href="/about">About Us</a>
        <a class="block py-2 text-[#0B0B0E]" href="/contact">Contact</a>
      </div>
    </aside>
  </div>

  <main id="main-content" tabindex="-1" class="flex-1">

    <!-- ================= BREADCRUMBS ================= -->
    <nav aria-label="breadcrumb" class="bg-[#FBFBFC] py-3 px-4 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol class="flex flex-wrap items-center gap-2 text-sm font-sans">
          <li class="flex items-center gap-2">
            <a class="text-[#0B0B0E] hover:text-amber-600 font-bold transition-colors" href="/">Home</a>
            <span class="text-gray-300">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"></path>
              </svg>
            </span>
          </li>
          <li class="flex items-center gap-2">
            <a class="text-[#0B0B0E] hover:text-amber-600 font-bold transition-colors" href="/nutrition">Diet &amp; Nutrition</a>
            <span class="text-gray-300">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"></path>
              </svg>
            </span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-amber-600 font-bold" aria-current="page">Low-Calorie</span>
          </li>
        </ol>
      </div>
    </nav>

    <!-- ================= HERO HEADER ================= -->
    <section class="bg-white py-12 md:py-16 px-4 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        
        <span class="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-700 font-heading block mb-2">
          Lighter picks, ranked by calorie count
        </span>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0B0E] font-heading uppercase tracking-tight leading-tight mb-4">
          Waffle House Dishes Under 600 Calories
        </h1>

        <!-- Author / Verification Byline -->
        <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium flex-wrap">
          <span>By <a href="/about" class="text-amber-700 font-bold hover:underline">Editorial Staff</a></span>
          <span>&bull;</span>
          <span>Last updated May 2026 Edition</span>
          <span>&bull;</span>
          <span class="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-xs">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            Official Nutrition Tables
          </span>
        </div>

        <p class="text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl mb-8 font-normal">
          Every dish at or under 600 calories, ranked lightest first, so you can plan a satisfying meal around a specific calorie target without accidental hidden calories or guesswork.
        </p>

        <!-- 4 Metric Highlight Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-[#FAF7F0] border-2 border-gray-200 rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Qualifying dishes</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${totalDishes}</span>
          </div>
          <div class="bg-[#FAF7F0] border-2 border-gray-200 rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Avg. calories</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${avgCalories}</span>
          </div>
          <div class="bg-[#FAF7F0] border-2 border-gray-200 rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Avg. protein</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${avgProtein} g</span>
          </div>
          <div class="bg-[#FAF7F0] border-2 border-[#FFC72C] bg-[#FFFDF7] rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Avg. sodium</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${avgSodium} mg</span>
          </div>
        </div>

      </div>
    </section>

    <!-- ================= ADVISORY & AT A GLANCE ================= -->
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- What to Watch For (AEO Snippet Box) -->
        <div class="bg-white rounded-3xl border-2 border-[#FFC72C] p-6 sm:p-8 shadow-xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-base border border-amber-300">!</span>
            <h2 class="text-xl sm:text-2xl font-black text-[#0B0B0E] font-heading uppercase">
              What to watch for on the low-calorie menu
            </h2>
          </div>
          <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
            Calorie count is one consideration; sodium and cooking oil are another. Cured breakfast meats like country ham carry <strong>2,110 mg of sodium</strong> per slice despite being under 200 calories. If you are watching blood pressure or water retention, opt for <strong>City Ham (850 mg sodium)</strong>, <strong>Grilled Chicken Breast (470 mg sodium)</strong>, or plain eggs (176 mg sodium). Always request eggs cooked &ldquo;in the pan&rdquo; with cooking spray to avoid up to 100 extra calories from liquid margarine on the flat top.
          </p>
        </div>

        <!-- How this list is built & At A Glance Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-xs">
            <h3 class="text-lg font-black text-[#0B0B0E] font-heading uppercase mb-3">
              How this list is built
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">
              A dish qualifies at <strong>600 calories or fewer</strong>. Dishes without official corporate disclosures or combo platters with unfixed sides are split into their verifiable components so you can calculate your custom meal.
            </p>
            <p class="text-gray-600 text-sm leading-relaxed">
              Every data point mirrors the official Waffle House Nutrition Guide (May 2026 Edition), with zero synthetic estimates.
            </p>
          </div>

          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-xs">
            <h3 class="text-lg font-black text-[#0B0B0E] font-heading uppercase mb-3">
              At a glance
            </h3>
            <ul class="space-y-3 text-sm text-gray-700">
              <li class="flex items-center justify-between border-b border-gray-100 pb-2">
                <span class="font-medium text-gray-600">Qualifying dishes</span>
                <span class="font-bold text-[#0B0B0E]">${totalDishes} across 8 diner categories</span>
              </li>
              <li class="flex items-center justify-between border-b border-gray-100 pb-2">
                <span class="font-medium text-gray-600">Lowest-calorie items</span>
                <span class="font-bold text-amber-700">0–5 cal (Unsweet Tea, Royal Coffee)</span>
              </li>
              <li class="flex items-center justify-between border-b border-gray-100 pb-2">
                <span class="font-medium text-gray-600">Highest protein under 600 cal</span>
                <span class="font-bold text-emerald-700">70 g (Meat Lover's Chicken &amp; Eggs)</span>
              </li>
              <li class="flex items-center justify-between">
                <span class="font-medium text-gray-600">Price range</span>
                <span class="font-bold text-[#0B0B0E]">$0.65 – $14.95</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>

    <!-- ================= COMPLETE RANKED LIST & INTERACTIVE FILTERS ================= -->
    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200" id="leaderboard">
      <div class="max-w-6xl mx-auto">
        
        <!-- Section Title & Counter -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span class="text-xs font-black uppercase tracking-widest text-gray-500 font-heading block mb-1">
              The Complete List
            </span>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0B0E] font-heading uppercase tracking-tight">
              All ${totalDishes} Low-Calorie Dishes
            </h2>
            <p class="text-gray-600 text-sm mt-1">
              Showing <span id="visible-count" class="font-bold text-black">${totalDishes}</span> of ${totalDishes} qualifying dishes &bull; Ranked lightest first
            </p>
          </div>

          <!-- Live Search Bar -->
          <div class="w-full md:w-72">
            <div class="relative">
              <input 
                type="text" 
                id="search-input" 
                placeholder="Search dish name..." 
                class="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#FFC72C] focus:outline-none text-sm font-medium bg-[#FBFBFC]"
              >
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Filter Buttons Bar -->
        <div class="flex flex-wrap items-center gap-2 mb-6" id="filter-pills">
          <button type="button" class="filter-btn active px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-[#FFC72C] text-[#0B0B0E] border-2 border-[#FFC72C] transition-all cursor-pointer shadow-2xs" data-category="all">
            All Dishes (${totalDishes})
          </button>
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC72C] transition-all cursor-pointer" data-category="Breakfast &amp; Eggs">
            Breakfast &amp; Eggs
          </button>
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC72C] transition-all cursor-pointer" data-category="Hashbrowns &amp; Sides">
            Hashbrowns &amp; Sides
          </button>
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC72C] transition-all cursor-pointer" data-category="Steaks &amp; Dinners">
            Steaks &amp; Dinners
          </button>
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC72C] transition-all cursor-pointer" data-category="Sandwiches &amp; Melts">
            Sandwiches &amp; Melts
          </button>
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC72C] transition-all cursor-pointer" data-category="Beverages">
            Beverages
          </button>
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FFC72C] transition-all cursor-pointer" data-category="Waffles &amp; Treats">
            Waffles &amp; Treats
          </button>
        </div>

        <!-- Ranked Table Container -->
        <div class="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-xs bg-white">
          <table class="w-full text-left text-xs sm:text-sm font-sans" id="dishes-table">
            <thead class="bg-gray-100 text-[#0B0B0E] font-heading font-black uppercase text-[11px] sm:text-xs tracking-wider border-b-2 border-gray-200">
              <tr>
                <th class="py-3.5 px-4 sm:px-6">Dish Name</th>
                <th class="py-3.5 px-3">Category</th>
                <th class="py-3.5 px-3 text-center">Calories</th>
                <th class="py-3.5 px-3 text-center">Protein</th>
                <th class="py-3.5 px-3 text-center">Sodium</th>
                <th class="py-3.5 px-4 text-right">Est. Price</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200" id="table-body">
              ${rawItems.map((item) => `
                <tr class="dish-row" data-name="${item.name.toLowerCase()}" data-category="${item.category}" data-cal="${item.cal}">
                  <td class="py-3 px-4 sm:px-6">
                    <div class="font-bold text-[#0B0B0E] text-sm sm:text-base">
                      ${item.name}
                    </div>
                  </td>
                  <td class="py-3 px-3">
                    <span class="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200 font-heading">
                      ${item.category}
                    </span>
                  </td>
                  <td class="py-3 px-3 text-center">
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-black font-heading ${item.cal <= 200 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : item.cal <= 400 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-orange-100 text-orange-900 border border-orange-300'}">
                      ${item.cal} cal
                    </span>
                  </td>
                  <td class="py-3 px-3 text-center font-bold text-gray-900">
                    ${item.pro}
                  </td>
                  <td class="py-3 px-3 text-center text-gray-600 font-medium">
                    ${item.sodium}
                  </td>
                  <td class="py-3 px-4 text-right font-black font-heading text-gray-900">
                    ${item.price}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>
    </section>

    <!-- ================= DIETARY & REFERENCE HUB ================= -->
    <section class="py-14 md:py-16 px-4 bg-[#FAF7F0] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        
        <div class="mb-10 text-center max-w-2xl mx-auto">
          <span class="text-xs font-black uppercase tracking-widest text-gray-500 font-heading block mb-1">Dietary &amp; Reference Hub</span>
          <h2 class="text-2xl sm:text-3xl font-black text-[#0B0B0E] font-heading uppercase tracking-tight">
            Explore All Dietary Views &amp; Menu Analysis
          </h2>
          <p class="text-gray-600 text-sm mt-2">
            Detailed guides to navigate Waffle House dining for any nutritional preference or lifestyle goal.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Column 1: Dietary Guides -->
          <div class="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-xs">
            <h3 class="text-base font-black text-[#0B0B0E] font-heading uppercase mb-3 flex items-center justify-between">
              <span>All Dietary Guides</span>
              <span class="text-[#FFC72C] text-lg font-black">&rarr;</span>
            </h3>
            <ul class="space-y-2.5 text-sm text-gray-700">
              <li>
                <a href="/diet/low-calorie/" class="font-bold text-amber-800 hover:underline flex items-center justify-between">
                  <span>Low-Calorie Guide (Under 600 Cal)</span>
                  <span class="text-xs text-amber-600 font-heading uppercase">&bull; Active</span>
                </a>
              </li>
              <li>
                <a href="/blog/healthiest-breakfast-for-weight-loss/" class="hover:text-amber-700 transition-colors">
                  Healthy Breakfast for Weight Loss
                </a>
              </li>
              <li>
                <a href="/waffle-house-dietary-guide/" class="hover:text-amber-700 transition-colors">
                  Keto &amp; Low-Carb Diner Guide
                </a>
              </li>
              <li>
                <a href="/blog/waffle-house-hashbrowns/" class="hover:text-amber-700 transition-colors">
                  Hashbrown Customization Guide
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 2: Nutritional & Allergens -->
          <div class="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-xs">
            <h3 class="text-base font-black text-[#0B0B0E] font-heading uppercase mb-3 flex items-center justify-between">
              <span>Nutritional &amp; Allergens</span>
              <span class="text-[#FFC72C] text-lg font-black">&rarr;</span>
            </h3>
            <ul class="space-y-2.5 text-sm text-gray-700">
              <li>
                <a href="/nutrition" class="hover:text-amber-700 transition-colors">
                  Full Nutrition Table &amp; Macro Breakdown
                </a>
              </li>
              <li>
                <a href="/waffle-house-calories-allergies/" class="hover:text-amber-700 transition-colors">
                  Big-9 Allergen Exclusion Tool
                </a>
              </li>
              <li>
                <a href="/menu/pdf" class="hover:text-amber-700 transition-colors">
                  Printable Menu &amp; Nutrition Guide (PDF)
                </a>
              </li>
              <li>
                <a href="/waffle-house-all-star-special-price/" class="hover:text-amber-700 transition-colors">
                  All-Star Special Calories &amp; Savings
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: Full Menu & Ordering -->
          <div class="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-xs">
            <h3 class="text-base font-black text-[#0B0B0E] font-heading uppercase mb-3 flex items-center justify-between">
              <span>Full Menu &amp; Ordering</span>
              <span class="text-[#FFC72C] text-lg font-black">&rarr;</span>
            </h3>
            <ul class="space-y-2.5 text-sm text-gray-700">
              <li>
                <a href="/menu" class="hover:text-amber-700 transition-colors">
                  Browse Full Menu &amp; Prices (2026)
                </a>
              </li>
              <li>
                <a href="/prices-by-state" class="hover:text-amber-700 transition-colors">
                  State-by-State Pricing Overview
                </a>
              </li>
              <li>
                <a href="/coupons" class="hover:text-amber-700 transition-colors">
                  Regulars Club Deals &amp; Coupons
                </a>
              </li>
              <li>
                <a href="/locations" class="hover:text-amber-700 transition-colors">
                  Find Nearest 24/7 Waffle House Diner
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>

    <!-- ================= FREQUENTLY ASKED QUESTIONS ================= -->
    <section class="py-16 md:py-20 bg-[#F9FAFB] border-t border-gray-200" id="faq">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1 font-heading">Common Questions</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B0B0E] tracking-tight uppercase">
            Low-Calorie Menu FAQ
          </h2>
          <p class="text-gray-600 text-sm sm:text-base mt-2 font-sans">
            Expert diner tips for calorie counting, macro tracking, and keeping sodium in check at Waffle House.
          </p>
        </div>

        <div class="border-2 border-[#FFC72C] rounded-3xl p-5 sm:p-7 bg-[#FAF7F0] shadow-sm my-6">
          <div class="space-y-3 font-sans" id="home-faq-list">
            
            <!-- FAQ 1 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>What is the absolute lowest-calorie meal combo at Waffle House?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Order <strong>2 farm fresh eggs</strong> cooked scrambled or poached (180 calories) with a side order of <strong>sliced tomatoes</strong> (10 calories) and an unsweet iced tea or black Royal Blend coffee (0-5 calories). That entire sit-down breakfast comes out to only <strong>190–195 calories</strong> while delivering 12 grams of high-quality protein.
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>How can I ensure eggs are cooked without added butter or grease?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Politely request your server to have the grill operator prepare your eggs <strong>&ldquo;in the pan with cooking spray&rdquo;</strong> rather than dropping them directly onto the seasoned diner flat-top grill. Grill butter and residual bacon fat can add 50 to 100 unmeasured fat calories.
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>What is the highest-protein meal under 500 calories?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                The <strong>Meat Lover's Chicken &amp; Eggs</strong> platter (2 grilled chicken breasts and 2 whole eggs, plate only) supplies an astonishing <strong>70 grams of protein</strong> for just 440 total calories and 16g of fat. It is one of the highest protein-to-calorie ratios in American casual dining.
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>Can I fit Waffle House hashbrowns into a low-calorie diet?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Yes! A regular single portion of hashbrowns is <strong>190 calories</strong>. You can ask for them prepared &ldquo;steamed&rdquo; or &ldquo;crisped dry&rdquo; to minimize cooking oil. Enhance flavor without massive calories by ordering them <em>smothered</em> (sautéed onions for +15 cal) and <em>capped</em> (grilled mushrooms for +10 cal).
              </div>
            </div>

            <!-- FAQ 5 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>Why is sodium so high on low-calorie diner items?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Traditional diner curing methods use salt extensively for shelf-life and moisture retention. For instance, country ham contains 2,110 mg of sodium. Choosing City Ham (850 mg), bacon (375 mg for 3 slices), or fresh USDA Choice steaks (260–436 mg sodium) dramatically lowers your sodium intake while staying under your calorie limit.
              </div>
            </div>

            <!-- FAQ 6 -->
            <div class="faq-item bg-white border-2 border-[#FFC72C] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#0B0B0E] flex items-center justify-between gap-4 focus:outline-none cursor-pointer" aria-expanded="false">
                <span>Does Waffle House serve egg whites?</span>
                <span class="faq-icon text-[#0B0B0E] font-black text-base shrink-0 transition-transform duration-200">&darr;</span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">
                Waffle House uses real shell eggs cracked fresh on the line. While liquid egg whites are not a standard stocked carton product at all locations, cooks can readily separate whole egg whites upon polite request during non-peak hours, bringing two egg whites down to approximately 35 calories and 7g protein.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- ================= FOOTER ================= -->
  <footer id="footer-section" class="bg-[#0B0B0E] text-white pt-10 pb-8 font-sans border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Section -->
      <div class="mb-8 pb-6 border-b border-gray-800/80">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="bg-[#FFC72C] text-[#0B0B0E] px-2.5 py-1 rounded-md font-heading font-black text-lg tracking-wider uppercase">
              WAFFLE HOUSE
            </span>
            <span class="font-heading font-semibold text-sm tracking-wider uppercase text-gray-300">
              Menu Guide 2026
            </span>
          </div>
          <p class="text-xs text-gray-400 font-sans max-w-xl">
            Independent consumer directory for Waffle House restaurant pricing, nutritional data, and diner ordering guides.
          </p>
        </div>
      </div>

      <!-- Links Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm text-gray-300">
        <div>
          <h4 class="font-heading font-bold text-white text-[13px] uppercase tracking-wider mb-3.5">Menu &amp; Nutrition</h4>
          <ul class="space-y-2 text-[13px]">
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/menu">Full menu with prices</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/nutrition">Nutrition &amp; calorie guide</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/diet/low-calorie/">Low-calorie menu</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/waffle-house-calories-allergies/">Allergen filter &amp; safety</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/menu/pdf">Printable menu (PDF)</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-heading font-bold text-white text-[13px] uppercase tracking-wider mb-3.5">Plan a Visit</h4>
          <ul class="space-y-2 text-[13px]">
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/locations">Store hours &amp; locations</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/coupons">Deals &amp; coupons</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/prices-by-state">Prices by state</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/waffle-house-catering/">Waffle House catering</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/blog/">All blogs &amp; guides</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-heading font-bold text-white text-[13px] uppercase tracking-wider mb-3.5">About &amp; Legal</h4>
          <ul class="space-y-2 text-[13px]">
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/about">About us</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/contact">Contact</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/#faq">FAQ</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/privacy">Privacy policy</a></li>
            <li><a class="text-gray-400 hover:text-[#FFC72C] transition-colors" href="/terms">Terms of service</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Disclaimer -->
      <div class="pt-6 border-t border-gray-800 text-[11px] text-gray-500 space-y-2 leading-relaxed">
        <p>
          <strong>Disclaimer:</strong> This website is an independent informational and research guide created for consumers. We are not affiliated with, endorsed by, or sponsored by Waffle House, Inc., WH Capital, L.L.C., or their respective affiliates. All trademarks, service marks, trade names, product names, and logos appearing on this site are the property of their respective owners.
        </p>
        <p>
          Nutritional figures, calorie benchmarks, and sodium metrics reflect published corporate data (May 2026 Edition) and independent culinary testing. Menu prices may vary slightly by franchise location, local supply costs, and regional tax rates.
        </p>
        <div class="pt-2 text-center text-gray-600">
          &copy; 2026 wafflehouse-menu.com. All rights reserved.
        </div>
      </div>

    </div>
  </footer>

  <!-- ================= JAVASCRIPT ================= -->
  <script>
    // Live Search and Category Filtering
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.dish-row');
    const visibleCount = document.getElementById('visible-count');

    let currentCategory = 'all';
    let searchQuery = '';

    function filterTable() {
      let count = 0;
      rows.forEach(row => {
        const name = row.getAttribute('data-name');
        const category = row.getAttribute('data-category');

        const matchesCat = (currentCategory === 'all' || category === currentCategory);
        const matchesSearch = (searchQuery === '' || name.includes(searchQuery));

        if (matchesCat && matchesSearch) {
          row.style.display = '';
          count++;
        } else {
          row.style.display = 'none';
        }
      });
      if (visibleCount) {
        visibleCount.textContent = count;
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterTable();
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-[#FFC72C]', 'text-[#0B0B0E]', 'border-[#FFC72C]', 'shadow-2xs');
          b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
        });
        btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
        btn.classList.add('active', 'bg-[#FFC72C]', 'text-[#0B0B0E]', 'border-[#FFC72C]', 'shadow-2xs');

        currentCategory = btn.getAttribute('data-category');
        filterTable();
      });
    });

    // Mobile Navigation Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileClose = document.getElementById('mobile-close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileBackdrop = document.getElementById('mobile-nav-backdrop');

    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener('click', () => {
        mobileNav.classList.remove('hidden');
      });
      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          mobileNav.classList.add('hidden');
        });
      }
      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', () => {
          mobileNav.classList.add('hidden');
        });
      }
    }

    // Homepage FAQ Accordion
    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('hidden');
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  </script>

</body>
</html>
`;
}

const html = generateHtml();

// 1. Primary route: diet/low-calorie/index.html
fs.writeFileSync('diet/low-calorie/index.html', html, 'utf8');
console.log('Successfully wrote diet/low-calorie/index.html (' + (html.length / 1024).toFixed(1) + ' KB)');

// 2. Direct html mirror: diet-low-calorie.html
fs.writeFileSync('diet-low-calorie.html', html, 'utf8');
console.log('Successfully wrote diet-low-calorie.html');

// 3. Keyword slug mirror: waffle-house-low-calorie-menu/index.html
fs.writeFileSync('waffle-house-low-calorie-menu/index.html', html, 'utf8');
console.log('Successfully wrote waffle-house-low-calorie-menu/index.html');
