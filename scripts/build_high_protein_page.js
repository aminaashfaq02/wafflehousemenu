const fs = require('fs');
const path = require('path');

const highProteinItems = [
  {
    name: "Meat Lover's Chicken & Eggs Platter (2 Breasts, 2 Eggs, Hashbrowns & Toast)",
    category: "Breakfast Classics",
    protein: 76,
    calories: 850,
    sodium: 2390,
    price: "$13.95",
    fat: "32g",
    carbs: "57g",
    desc: "Two marinated grilled chicken breasts paired with two farm eggs, regular hashbrowns, and buttered toast."
  },
  {
    name: "Meat Lover's Chicken & Eggs (2 Breasts + 2 Eggs - Plate Only)",
    category: "Breakfast Classics",
    protein: 70,
    calories: 440,
    sodium: 2036,
    price: "$11.45",
    fat: "16g",
    carbs: "6g",
    desc: "The leanest high-protein power plate on the entire menu. 70g protein for only 440 calories."
  },
  {
    name: "Triple Angus Cheeseburger Platter (3 Patties, Triple Cheese, Double Hashbrowns)",
    category: "Burgers & Sandwiches",
    protein: 68,
    calories: 1210,
    sodium: 2780,
    price: "$12.25",
    fat: "68g",
    carbs: "64g",
    desc: "Three 100% pure Angus beef patties grilled on the flat-top with melted American cheese."
  },
  {
    name: "Two Center Cut Pork Chops & Eggs Platter (Chops, 2 Eggs, Hashbrowns & Toast)",
    category: "Breakfast Classics",
    protein: 66,
    calories: 930,
    sodium: 1720,
    price: "$12.95",
    fat: "44g",
    carbs: "57g",
    desc: "Two seasoned bone-in pork chops served with two eggs any style, crispy hashbrowns, and toast."
  },
  {
    name: "Two Center Cut Pork Chops & 2 Eggs (Plate Only)",
    category: "Breakfast Classics",
    protein: 64,
    calories: 520,
    sodium: 1216,
    price: "$10.45",
    fat: "28g",
    carbs: "2g",
    desc: "Pure protein diner combo with zero carbs, delivering 64 grams of sustained protein."
  },
  {
    name: "10 oz USDA Choice T-Bone Steak & Eggs Platter",
    category: "Steaks & Dinners",
    protein: 61,
    calories: 1010,
    sodium: 1040,
    price: "$15.95",
    fat: "59g",
    carbs: "57g",
    desc: "Full 10 oz USDA Choice T-Bone steak, two eggs, regular hashbrowns, and buttered toast."
  },
  {
    name: "Pork Chop Dinner (3 Center-Cut Chops, Double Hashbrowns & Texas Toast)",
    category: "Steaks & Dinners",
    protein: 60,
    calories: 990,
    sodium: 1840,
    price: "$13.45",
    fat: "46g",
    carbs: "68g",
    desc: "Southern diner dinner plate featuring three center-cut chops seared to perfection."
  },
  {
    name: "Delmonico Ribeye Steak & Eggs Platter",
    category: "Steaks & Dinners",
    protein: 59,
    calories: 890,
    sodium: 1140,
    price: "$14.25",
    fat: "44g",
    carbs: "57g",
    desc: "Tender Delmonico Ribeye steak paired with farm fresh eggs and golden crispy hashbrowns."
  },
  {
    name: "10 oz USDA Choice T-Bone Steak (Steak Only)",
    category: "Steaks & Dinners",
    protein: 53,
    calories: 480,
    sodium: 260,
    price: "$12.50",
    fat: "28g",
    carbs: "2g",
    desc: "10-ounce custom-trimmed T-Bone, seasoned and seared directly on the grill."
  },
  {
    name: "Delmonico Ribeye Steak & 2 Eggs (Plate Only)",
    category: "Steaks & Dinners",
    protein: 53,
    calories: 480,
    sodium: 636,
    price: "$11.95",
    fat: "28g",
    carbs: "2g",
    desc: "High-protein, low-carb favorite delivering 53g protein and zero grain carbs."
  },
  {
    name: "Two Grilled Pork Chops (Center Cut Plain)",
    category: "Steaks & Dinners",
    protein: 52,
    calories: 340,
    sodium: 1040,
    price: "$8.95",
    fat: "14g",
    carbs: "0g",
    desc: "Two lean center-cut chops with only 14g fat, no breading, and 52g protein."
  },
  {
    name: "Fiesta Protein Bowl (Grilled Chicken, 3 Eggs, Melted Cheese, Jalapeños)",
    category: "Hashbrown Bowls",
    protein: 52,
    calories: 530,
    sodium: 2084,
    price: "$9.95",
    fat: "31g",
    carbs: "14g",
    desc: "Custom diner bowl loaded with diced grilled chicken breast, 3 scrambled eggs, and American cheese."
  },
  {
    name: "Texas Melt & Large Hashbrowns Combo",
    category: "Burgers & Sandwiches",
    protein: 51,
    calories: 1290,
    sodium: 2840,
    price: "$11.45",
    fat: "68g",
    carbs: "119g",
    desc: "Texas Cheesesteak on thick-cut Texas toast served alongside a double portion of hashbrowns."
  },
  {
    name: "Country Ham & Eggs Platter (Thick-Cut Ham, 2 Eggs, Hashbrowns & Toast)",
    category: "Breakfast Classics",
    protein: 50,
    calories: 830,
    sodium: 2680,
    price: "$11.95",
    fat: "35g",
    carbs: "57g",
    desc: "Cured salt-aged Southern country ham slice served sizzling hot with 2 fresh eggs."
  },
  {
    name: "USDA Choice T-Bone Steak & 2 Eggs (Plate Only)",
    category: "Steaks & Dinners",
    protein: 49,
    calories: 600,
    sodium: 436,
    price: "$14.95",
    fat: "43g",
    carbs: "2g",
    desc: "Sizzling T-Bone with 2 farm eggs cooked over-medium or scrambled."
  },
  {
    name: "Grilled Chicken & Cheese Large Omelet",
    category: "Omelets & Eggs",
    protein: 49,
    calories: 480,
    sodium: 1200,
    price: "$9.45",
    fat: "31g",
    carbs: "6g",
    desc: "Three fluffy eggs folded around diced marinated chicken breast and double American cheese."
  },
  {
    name: "Double Angus Cheeseburger Platter with Hashbrowns",
    category: "Burgers & Sandwiches",
    protein: 48,
    calories: 970,
    sodium: 2190,
    price: "$9.95",
    fat: "54g",
    carbs: "62g",
    desc: "Two juicy Angus patties with melted cheese, grilled bun, and crispy hashbrowns."
  },
  {
    name: "Texas Bacon Cheesesteak Melt Platter",
    category: "Burgers & Sandwiches",
    protein: 47,
    calories: 1100,
    sodium: 2580,
    price: "$10.85",
    fat: "60g",
    carbs: "97g",
    desc: "Thin-sliced sirloin cheesesteak with Smithfield® bacon and melted cheese on grilled Texas toast."
  },
  {
    name: "Ham & Cheese Omelet Platter (Omelet, Hashbrowns & Toast)",
    category: "Omelets & Eggs",
    protein: 45,
    calories: 860,
    sodium: 2140,
    price: "$9.65",
    fat: "49g",
    carbs: "58g",
    desc: "Classic Southern breakfast featuring city ham, double melted cheese, hashbrowns, and toast."
  },
  {
    name: "Texas Bacon Cheesesteak Melt (Sandwich Only)",
    category: "Burgers & Sandwiches",
    protein: 43,
    calories: 910,
    sodium: 2130,
    price: "$8.85",
    fat: "52g",
    carbs: "68g",
    desc: "Thinly sliced steak, melted cheese, and crisp hickory-smoked bacon on grilled Texas toast."
  },
  {
    name: "Texas Bacon Patty Melt",
    category: "Burgers & Sandwiches",
    protein: 42,
    calories: 830,
    sodium: 1980,
    price: "$8.45",
    fat: "51g",
    carbs: "52g",
    desc: "Angus beef patty topped with grilled onions, bacon, and American cheese on Texas toast."
  },
  {
    name: "Sausage & Cheese Omelet Platter (Omelet, Hashbrowns & Toast)",
    category: "Omelets & Eggs",
    protein: 42,
    calories: 940,
    sodium: 1960,
    price: "$9.65",
    fat: "58g",
    carbs: "59g",
    desc: "Savory Jimmy Dean® country sausage crumbles folded into a 3-egg cheese omelet."
  },
  {
    name: "USDA Choice Sirloin Steak (4 oz portion)",
    category: "Steaks & Dinners",
    protein: 41,
    calories: 300,
    sodium: 260,
    price: "$7.95",
    fat: "14g",
    carbs: "0g",
    desc: "Lean 4 oz sirloin steak cooked to order with minimal fat and high protein density."
  },
  {
    name: "Grilled Chicken & 2 Eggs Breakfast (Plate Only)",
    category: "Breakfast Classics",
    protein: 41,
    calories: 310,
    sodium: 1106,
    price: "$10.95",
    fat: "15g",
    carbs: "4g",
    desc: "One whole grilled chicken breast plus 2 whole farm eggs for a compact 41g protein meal."
  },
  {
    name: "Texas Angus Burger Melt",
    category: "Burgers & Sandwiches",
    protein: 40,
    calories: 780,
    sodium: 1720,
    price: "$7.95",
    fat: "46g",
    carbs: "52g",
    desc: "Quarter-pound pure Angus patty grilled with onions and American cheese on buttered Texas toast."
  },
  {
    name: "Texas Grilled Chicken Melt",
    category: "Burgers & Sandwiches",
    protein: 40,
    calories: 445,
    sodium: 1810,
    price: "$8.45",
    fat: "12g",
    carbs: "45g",
    desc: "Tender grilled chicken breast fillet with melted cheese on toasted Texas toast."
  },
  {
    name: "Fiesta Omelet Platter (Ham, Cheese, Jalapeños, Hashbrowns & Toast)",
    category: "Omelets & Eggs",
    protein: 40,
    calories: 890,
    sodium: 2260,
    price: "$9.95",
    fat: "51g",
    carbs: "62g",
    desc: "Spicy diner omelet packed with diced city ham, melted cheese, spicy jalapeños, and sides."
  },
  {
    name: "8 oz USDA Choice Sirloin Steak Dinner",
    category: "Steaks & Dinners",
    protein: 39,
    calories: 780,
    sodium: 980,
    price: "$13.95",
    fat: "38g",
    carbs: "57g",
    desc: "8 oz sirloin steak grilled on the flat-top with hashbrowns and grilled Texas toast."
  },
  {
    name: "Texas Cheesesteak Melt (Sandwich Only)",
    category: "Burgers & Sandwiches",
    protein: 38,
    calories: 760,
    sodium: 1840,
    price: "$7.95",
    fat: "42g",
    carbs: "66g",
    desc: "Savory grilled sirloin steak ribbons smothered in melted cheese and grilled sweet onions."
  },
  {
    name: "8 oz USDA Choice Sirloin Steak (Steak Only)",
    category: "Steaks & Dinners",
    protein: 37,
    calories: 370,
    sodium: 320,
    price: "$10.50",
    fat: "23g",
    carbs: "3g",
    desc: "Lean 8 oz cut seasoned with Waffle House grill salt and seared medium-rare to well-done."
  },
  {
    name: "Chicken Melt Hashbrown Bowl (Large)",
    category: "Hashbrown Bowls",
    protein: 36,
    calories: 780,
    sodium: 1680,
    price: "$9.95",
    fat: "38g",
    carbs: "74g",
    desc: "Crispy double hashbrowns topped with melted cheese, 2 eggs, and tender grilled chicken breast."
  },
  {
    name: "Chicken Melt Hashbrown Bowl (Regular)",
    category: "Hashbrown Bowls",
    protein: 35,
    calories: 635,
    sodium: 1420,
    price: "$8.95",
    fat: "30g",
    carbs: "58g",
    desc: "Golden hashbrowns topped with diced grilled chicken, melted American cheese, and a fried egg."
  },
  {
    name: "The All-Star Special™ Combo Plate",
    category: "Breakfast Classics",
    protein: 34,
    calories: 1050,
    sodium: 1890,
    price: "$12.35",
    fat: "50g",
    carbs: "114g",
    desc: "The legendary 5-item platter: 2 eggs, bacon or sausage, waffle, hashbrowns or grits, and toast."
  },
  {
    name: "Cheesesteak Melt Hashbrown Bowl (Regular)",
    category: "Hashbrown Bowls",
    protein: 33,
    calories: 625,
    sodium: 1390,
    price: "$8.95",
    fat: "30g",
    carbs: "57g",
    desc: "Thin-sliced cheesesteak steak strips, grilled onions, melted cheese over crispy hashbrowns."
  },
  {
    name: "Texas Sausage Melt",
    category: "Burgers & Sandwiches",
    protein: 32,
    calories: 820,
    sodium: 1820,
    price: "$7.45",
    fat: "54g",
    carbs: "52g",
    desc: "Country sausage patties with melted cheese and grilled onions on toasted Texas toast."
  },
  {
    name: "Sausage Egg & Cheese Hashbrown Bowl",
    category: "Hashbrown Bowls",
    protein: 31,
    calories: 780,
    sodium: 1540,
    price: "$8.75",
    fat: "46g",
    carbs: "62g",
    desc: "Hashbrowns base topped with 2 slices of melted cheese, 2 scrambled eggs, and 2 sausage patties."
  },
  {
    name: "Country Ham (Thick Center Slice Only)",
    category: "Breakfast Classics",
    protein: 30,
    calories: 230,
    sodium: 2110,
    price: "$4.95",
    fat: "12g",
    carbs: "0g",
    desc: "Authentic Southern salt-cured country ham delivering 30 grams of protein in a single cut."
  },
  {
    name: "Grilled Chicken Breast (Single 4 oz Fillet)",
    category: "Breakfast Classics",
    protein: 29,
    calories: 130,
    sodium: 470,
    price: "$4.25",
    fat: "2g",
    carbs: "0g",
    desc: "100% whole muscle chicken breast, tenderized and grilled with only 2g fat and 130 cal."
  },
  {
    name: "Cheese 'N Eggs Breakfast (2 Eggs with Melted Cheese, Grits & Toast)",
    category: "Breakfast Classics",
    protein: 29,
    calories: 620,
    sodium: 980,
    price: "$8.45",
    fat: "32g",
    carbs: "54g",
    desc: "Two farm eggs scrambled with two slices of melted American cheese, served with toast and grits."
  },
  {
    name: "Bacon Egg & Cheese Hashbrown Bowl",
    category: "Hashbrown Bowls",
    protein: 27,
    calories: 670,
    sodium: 1460,
    price: "$8.75",
    fat: "37g",
    carbs: "61g",
    desc: "Crispy hashbrowns layered with melted American cheese, two eggs, and 3 strips of crumbled bacon."
  },
  {
    name: "Quarter-Pound Angus Cheeseburger",
    category: "Burgers & Sandwiches",
    protein: 27,
    calories: 560,
    sodium: 1220,
    price: "$5.75",
    fat: "34g",
    carbs: "35g",
    desc: "Fresh 100% Angus patty seared on the grill, topped with melted American cheese on a toasted bun."
  },
  {
    name: "City Ham & Cheese Omelet (Omelet Only)",
    category: "Omelets & Eggs",
    protein: 26,
    calories: 410,
    sodium: 1480,
    price: "$7.25",
    fat: "30g",
    carbs: "4g",
    desc: "Three fluffy whipped eggs loaded with diced sweet city ham and melted cheese."
  },
  {
    name: "Two Eggs with Jimmy Dean® Country Sausage (Plate Only)",
    category: "Breakfast Classics",
    protein: 26,
    calories: 460,
    sodium: 1040,
    price: "$7.45",
    fat: "38g",
    carbs: "3g",
    desc: "Two fresh eggs cooked to order with two seasoned pork sausage patties."
  },
  {
    name: "Two Eggs with Smithfield® Bacon (Plate Only)",
    category: "Breakfast Classics",
    protein: 22,
    calories: 320,
    sodium: 680,
    price: "$7.45",
    fat: "25g",
    carbs: "2g",
    desc: "Two farm eggs served with three crispy hickory-smoked bacon strips."
  },
  {
    name: "Quarter-Pound Angus Hamburger",
    category: "Burgers & Sandwiches",
    protein: 22,
    calories: 460,
    sodium: 980,
    price: "$5.25",
    fat: "26g",
    carbs: "34g",
    desc: "Single pure beef Angus patty with lettuce, tomato, pickles, and grilled bun."
  }
];

// Sort descending by protein
highProteinItems.sort((a, b) => b.protein - a.protein);

const totalDishes = highProteinItems.length;
const avgCalories = Math.round(highProteinItems.reduce((acc, it) => acc + it.calories, 0) / totalDishes);
const avgProtein = Math.round(highProteinItems.reduce((acc, it) => acc + it.protein, 0) / totalDishes);
const avgSodium = Math.round(highProteinItems.reduce((acc, it) => acc + it.sodium, 0) / totalDishes);

// Category counts
const catCounts = {};
highProteinItems.forEach(it => {
  catCounts[it.category] = (catCounts[it.category] || 0) + 1;
});

// Top 8 protein leaders
const leaders = highProteinItems.slice(0, 8);

function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waffle House High-Protein Menu: ${totalDishes} Dishes Ranked by Protein (2026)</title>
  <meta name="description" content="Discover ${totalDishes} high-protein Waffle House meals ranked highest protein first (up to 76g protein). Full calorie, sodium, fat, and bulking nutrition profiles.">
  <link rel="canonical" href="https://www.wafflehouse-menu.com/diet/high-protein/">
  <meta name="robots" content="index, follow, max-image-preview:large">

  <!-- Open Graph -->
  <meta property="og:title" content="Waffle House High-Protein Menu: ${totalDishes} Dishes Ranked by Protein (2026)">
  <meta property="og:description" content="Ranked highest protein first: every Waffle House meal with 20g–76g protein, with exact calories and sodium counts.">
  <meta property="og:url" content="https://www.wafflehouse-menu.com/diet/high-protein/">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://www.wafflehouse-menu.com/assets/nutrition/chicken-eggs.jpg">

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
        "@id": "https://www.wafflehouse-menu.com/diet/high-protein/#webpage",
        "url": "https://www.wafflehouse-menu.com/diet/high-protein/",
        "name": "Waffle House High-Protein Menu: ${totalDishes} Dishes Ranked by Protein (2026)",
        "description": "Ranked protein leaderboard for Waffle House diner dishes with 20g–76g protein.",
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
              "name": "High-Protein",
              "item": "https://www.wafflehouse-menu.com/diet/high-protein/"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the single highest-protein dish at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Meat Lover's Chicken & Eggs Platter is the highest-protein meal at Waffle House, delivering an incredible 76 grams of protein (850 calories) when ordered with two chicken breasts, two eggs, hashbrowns, and toast. Ordering the plate only (just the 2 grilled chicken breasts and 2 eggs) yields 70 grams of pure protein for only 440 calories."
            }
          },
          {
            "@type": "Question",
            "name": "Can you order a high-protein, low-calorie meal at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! The single 4 oz grilled chicken breast provides 29g protein for just 130 calories (2g fat, 0g carbs). Pairing two grilled chicken breasts with two scrambled eggs gives 70g protein for 440 calories, making it one of the cleanest high-protein keto meals in casual dining."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best high-calorie bulking meal at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For bodybuilders and strength athletes in a caloric surplus, the Texas Melt & Large Hashbrowns Combo packs 1,290 calories, 51g protein, and 119g carbs. Alternatively, the Triple Angus Cheeseburger Platter delivers 1,210 calories and 68g protein."
            }
          },
          {
            "@type": "Question",
            "name": "How much protein is in the Waffle House All-Star Special™?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The standard All-Star Special™ combo plate delivers 34 grams of protein, 1,050 calories, and 114g carbs with 2 eggs, bacon or sausage, waffle, hashbrowns or grits, and toast."
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
                <a href="/diet/low-calorie/" class="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-900 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  <span>Low-Calorie Menu</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">Under 600</span>
                </a>
                <a href="/diet/high-protein/" class="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-900 bg-amber-100/70 hover:bg-[#FFC72C]/30 transition-colors">
                  <span>High-Protein Menu</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">30g+ Pro</span>
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
          <a title="Locations" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/locations">
            Locations
          </a>
          <a title="About" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors whitespace-nowrap" href="/about">
            About
          </a>
        </nav>

        <!-- Mobile Header Row -->
        <div class="lg:hidden flex items-center justify-between py-2.5">
          <span class="text-xs font-black uppercase tracking-wider text-[#0B0B0E]">
            High-Protein Menu 2026
          </span>
          <button 
            id="mobile-menu-btn"
            type="button" 
            class="p-1.5 rounded-lg text-[#0B0B0E] hover:bg-black/10 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <div id="mobile-menu-drawer" class="hidden lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 space-y-2 shadow-lg">
      <a href="/menu" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Full Menu &amp; Prices</a>
      <a href="/menu/pdf" class="block px-3 py-2 text-base font-bold text-amber-900 bg-amber-50 rounded-md">Printable Menu (PDF) 2026</a>
      <a href="/diet/high-protein/" class="block px-3 py-2 text-base font-bold text-gray-900 bg-[#FFC72C]/20 rounded-md">High-Protein Menu (20g–76g)</a>
      <a href="/diet/low-calorie/" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Low-Calorie Menu (Under 600 Cal)</a>
      <a href="/nutrition" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Nutrition Facts Overview</a>
      <a href="/waffle-house-calories-allergies/" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Calories &amp; Allergies</a>
      <a href="/coupons" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Deals &amp; Coupons</a>
      <a href="/blog/" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Blog &amp; Secret Menu</a>
      <a href="/locations" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">Locations</a>
      <a href="/about" class="block px-3 py-2 text-base font-bold text-gray-900 rounded-md hover:bg-[#FFC72C]/20">About Us</a>
    </div>
  </header>

  <!-- ================= MAIN CONTENT ================= -->
  <main id="main-content" class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
    
    <!-- Breadcrumbs -->
    <nav class="flex items-center text-xs sm:text-sm text-gray-600 mb-6 space-x-2" aria-label="Breadcrumb">
      <a href="/nutrition" class="text-amber-800 hover:text-black font-semibold flex items-center gap-1">
        <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Diet &amp; Nutrition
      </a>
      <span class="text-gray-400">/</span>
      <a href="/" class="hover:text-amber-700">Home</a>
      <span class="text-gray-400">/</span>
      <a href="/nutrition" class="hover:text-amber-700">Diet guides</a>
      <span class="text-gray-400">/</span>
      <span class="text-gray-900 font-bold">High-Protein</span>
    </nav>

    <!-- Page Header (Cheesecake Factory layout exact) -->
    <div class="mb-8 border-b border-gray-200 pb-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider rounded-md mb-3">
        <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
        Ranked Highest-Protein First
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0B0E] tracking-tight leading-tight mb-3">
        Waffle House Dishes with High Protein (20g–76g)
      </h1>
      <p class="text-xs sm:text-sm text-gray-500 mb-4">
        By <a href="/about" class="text-[#0B0B0E] font-bold hover:underline">Editorial Staff</a> · Last updated November 2026 · Verified Corporate Nutrition Tables
      </p>
      <p class="text-base sm:text-lg text-gray-700 max-w-4xl leading-relaxed">
        This page filters the official Waffle House menu to dishes delivering substantial, high-quality protein per serving (up to 76 grams). Ranked highest protein first, fitness enthusiasts, bodybuilders, and keto diners can instantly compare protein density against calories, sodium, and fat across breakfast platters, sirloin steaks, grilled chicken, and loaded hashbrown bowls.
      </p>
    </div>

    <!-- 4 Key Stat Metric Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-xs text-center">
        <span class="block text-xs uppercase tracking-wider font-extrabold text-gray-500 mb-1">Qualifying Dishes</span>
        <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E]">${totalDishes}</span>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-xs text-center">
        <span class="block text-xs uppercase tracking-wider font-extrabold text-gray-500 mb-1">Avg. Calories</span>
        <span class="text-3xl sm:text-4xl font-black text-amber-600">${avgCalories}</span>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-xs text-center">
        <span class="block text-xs uppercase tracking-wider font-extrabold text-gray-500 mb-1">Avg. Protein</span>
        <span class="text-3xl sm:text-4xl font-black text-emerald-600">${avgProtein} g</span>
      </div>
      <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-xs text-center">
        <span class="block text-xs uppercase tracking-wider font-extrabold text-gray-500 mb-1">Avg. Sodium</span>
        <span class="text-3xl sm:text-4xl font-black text-blue-600">${avgSodium} mg</span>
      </div>
    </div>

    <!-- What to Watch For & How Built Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <h2 class="text-xl font-black text-[#0B0B0E] mb-2 flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 012 0v2a1 1 0 11-2 0v-2zm0-6a1 1 0 012 0v4a1 1 0 11-2 0V5z"/></svg>
          What to watch for on the high-protein menu
        </h2>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
          High-protein diner entrees frequently come accompanied by high-sodium cured meats and carb-heavy sides (buttered Texas toast, hashbrowns, or grits).
        </p>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
          The table below lets you compare protein alongside calorie and sodium counts. To keep meals lean, you can ask for eggs cooked in a pan with cooking spray or swap regular sides for sliced tomatoes (10 cal, 0mg sodium).
        </p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <h2 class="text-xl font-black text-[#0B0B0E] mb-2 flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          How this list is built
        </h2>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
          A dish qualifies with <strong>20 grams of protein or more per serving</strong>. Every single data point is derived directly from Waffle House's official published nutrition disclosure.
        </p>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
          Combinations include both the full signature platter (with sides) and the "Plate Only" ordering option so gym-goers can accurately count macros.
        </p>
      </div>
    </div>

    <!-- At a Glance Callout Box -->
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7 mb-12">
      <h3 class="text-lg font-black text-[#0B0B0E] mb-3 uppercase tracking-wide">
        At a glance
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-semibold text-gray-800">
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-600"></span>
          <span>${totalDishes} qualifying dishes across 5 menu sections</span>
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Lowest calorie on this list: 130 cal (Grilled Chicken Fillet)</span>
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Highest protein on this list: 76 g</span>
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-600"></span>
          <span>Price range: $4.25 – $15.95</span>
        </li>
      </ul>
    </div>

    <!-- Where These Dishes Live On The Menu -->
    <div class="mb-12">
      <h2 class="text-2xl font-black text-[#0B0B0E] mb-2 font-heading">
        Where these dishes live on the menu
      </h2>
      <p class="text-sm text-gray-600 mb-4">By category breakdown</p>
      <div class="flex flex-wrap gap-2.5">
        <span class="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-2xs">
          Breakfast Classics: <strong class="text-amber-600">${catCounts['Breakfast Classics'] || 0}</strong>
        </span>
        <span class="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-2xs">
          Burgers &amp; Sandwiches: <strong class="text-amber-600">${catCounts['Burgers & Sandwiches'] || 0}</strong>
        </span>
        <span class="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-2xs">
          Steaks &amp; Dinners: <strong class="text-amber-600">${catCounts['Steaks & Dinners'] || 0}</strong>
        </span>
        <span class="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-2xs">
          Hashbrown Bowls: <strong class="text-amber-600">${catCounts['Hashbrown Bowls'] || 0}</strong>
        </span>
        <span class="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-2xs">
          Omelets &amp; Eggs: <strong class="text-amber-600">${catCounts['Omelets & Eggs'] || 0}</strong>
        </span>
      </div>
    </div>

    <!-- Protein Leaders Grid -->
    <div class="mb-14">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <span class="text-xs font-black uppercase tracking-wider text-amber-700">Top of the list, by protein</span>
          <h2 class="text-2xl sm:text-3xl font-black text-[#0B0B0E] font-heading">Protein leaders</h2>
        </div>
        <p class="text-xs text-gray-500 mt-1 sm:mt-0">The 8 highest protein dishes at Waffle House</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${leaders.map((dish, i) => `
        <div class="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-colors">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-extrabold text-gray-400">#${i + 1} · ${dish.category}</span>
              <span class="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-black text-xs">${dish.protein}g protein</span>
            </div>
            <h3 class="font-bold text-base text-[#0B0B0E] mb-2 line-clamp-2">${dish.name}</h3>
          </div>
          <div class="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span><strong>${dish.calories}</strong> cal</span>
            <span><strong>${dish.sodium}mg</strong> sod</span>
            <span class="font-black text-gray-900">${dish.price}</span>
          </div>
        </div>
        `).join('')}
      </div>
    </div>

    <!-- The Complete List Table Section -->
    <div class="mb-14">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-[#0B0B0E] font-heading">The complete list</h2>
          <p class="text-sm text-gray-500">All ${totalDishes} high-protein dishes ranked from highest protein to lowest</p>
        </div>
        
        <!-- Live Search Input -->
        <div class="relative w-full md:w-72">
          <input 
            type="text" 
            id="dishSearch" 
            placeholder="Search dish or category..." 
            class="w-full px-4 py-2.5 pl-10 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
          >
          <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 mb-6" id="filterPills">
        <button class="filter-btn active px-4 py-2 rounded-xl text-xs font-bold bg-[#FFC72C] text-[#0B0B0E] border border-amber-300" data-filter="all">All (${totalDishes})</button>
        <button class="filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50" data-filter="Breakfast Classics">Breakfast Classics (${catCounts['Breakfast Classics'] || 0})</button>
        <button class="filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50" data-filter="Burgers & Sandwiches">Burgers &amp; Melts (${catCounts['Burgers & Sandwiches'] || 0})</button>
        <button class="filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50" data-filter="Steaks & Dinners">Steaks &amp; Dinners (${catCounts['Steaks & Dinners'] || 0})</button>
        <button class="filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50" data-filter="Hashbrown Bowls">Hashbrown Bowls (${catCounts['Hashbrown Bowls'] || 0})</button>
        <button class="filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50" data-filter="Omelets & Eggs">Omelets &amp; Eggs (${catCounts['Omelets & Eggs'] || 0})</button>
      </div>

      <div class="text-xs text-gray-500 mb-3 flex items-center justify-between">
        <span id="counterText">Showing ${totalDishes} of ${totalDishes} dishes</span>
        <span class="italic text-gray-400">Click headers to view exact official amounts</span>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-xs">
        <table class="w-full text-left border-collapse" id="dishesTable">
          <thead>
            <tr class="bg-gray-100 text-gray-700 uppercase font-black text-xs tracking-wider border-b border-gray-200">
              <th scope="col" class="py-4 px-4 sm:px-6">Dish Name &amp; Description</th>
              <th scope="col" class="py-4 px-4 sm:px-6">Category</th>
              <th scope="col" class="py-4 px-4 sm:px-6 text-center">Protein</th>
              <th scope="col" class="py-4 px-4 sm:px-6 text-center">Calories</th>
              <th scope="col" class="py-4 px-4 sm:px-6 text-center">Sodium</th>
              <th scope="col" class="py-4 px-4 sm:px-6 text-right">Price</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            ${highProteinItems.map((dish, idx) => `
            <tr class="dish-row" data-category="${dish.category}">
              <td class="py-4 px-4 sm:px-6">
                <div class="font-bold text-gray-900 text-base mb-0.5">#${idx + 1} · ${dish.name}</div>
                <div class="text-xs text-gray-500 leading-relaxed max-w-lg">${dish.desc}</div>
              </td>
              <td class="py-4 px-4 sm:px-6 whitespace-nowrap">
                <span class="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-700">
                  ${dish.category}
                </span>
              </td>
              <td class="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                <span class="inline-block px-2.5 py-1 text-xs font-black rounded-md bg-emerald-100 text-emerald-900">
                  ${dish.protein} g
                </span>
              </td>
              <td class="py-4 px-4 sm:px-6 text-center whitespace-nowrap font-bold text-gray-900">
                ${dish.calories} cal
              </td>
              <td class="py-4 px-4 sm:px-6 text-center whitespace-nowrap text-gray-600">
                ${dish.sodium.toLocaleString()} mg
              </td>
              <td class="py-4 px-4 sm:px-6 text-right whitespace-nowrap font-black text-gray-900">
                ${dish.price}
              </td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div id="noResults" class="hidden text-center py-12 bg-white rounded-2xl border border-gray-200 mt-2">
        <p class="text-gray-500 font-medium">No high-protein dishes match your search or filter.</p>
      </div>
    </div>

    <!-- High-Calorie & Bulking Feature Box -->
    <div class="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-3xl p-6 sm:p-8 text-black mb-14 shadow-md">
      <div class="max-w-3xl">
        <span class="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider rounded-lg mb-3">
          Bulking &amp; Calorie Surplus Guide
        </span>
        <h2 class="text-2xl sm:text-3xl font-black text-black font-heading mb-3">
          Looking for High-Calorie Meals for Weight Gain &amp; Hard Training?
        </h2>
        <p class="text-sm sm:text-base text-black/90 font-medium leading-relaxed mb-4">
          Waffle House is famous in the bodybuilding and powerlifting community for clean calorie density. When you need 1,000 to 1,500+ clean calories in a single sitting, pair a <strong>Texas Bacon Cheesesteak Melt (910 cal)</strong> with <strong>Large Hashbrowns Triple 'All The Way' (580 cal)</strong> for over 1,490 calories and 50g+ protein, or order the classic <strong>All-Star Special™ with Double Hashbrowns (1,240 cal)</strong>.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="/menu" class="px-5 py-2.5 bg-black text-white font-bold rounded-xl text-sm hover:bg-black/80 transition-colors">
            View Full Diner Menu
          </a>
          <a href="/diet/low-calorie/" class="px-5 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors">
            Explore Low-Calorie Menu (Under 600 Cal)
          </a>
        </div>
      </div>
    </div>

    <!-- FAQ Section (Exact Homepage #FAF7F0 Container with #FFC72C border) -->
    <div class="bg-[#FAF7F0] border-2 border-[#FFC72C] rounded-3xl p-6 sm:p-10 mb-14">
      <div class="text-center mb-8">
        <span class="text-xs font-black uppercase tracking-wider text-amber-800">FAQ</span>
        <h2 class="text-2xl sm:text-3xl font-black text-[#0B0B0E] font-heading mt-1">
          Common Questions About High-Protein Diner Meals
        </h2>
      </div>

      <div class="max-w-3xl mx-auto space-y-4">
        
        <!-- FAQ 1 -->
        <details class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs group" open>
          <summary class="flex items-center justify-between p-5 font-bold text-gray-900 cursor-pointer list-none select-none hover:bg-amber-50/50">
            <span class="text-base sm:text-lg">What is the highest-protein dish at Waffle House?</span>
            <span class="transition-transform duration-200 group-open:rotate-180 text-amber-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </summary>
          <div class="p-5 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
            The <strong>Meat Lover's Chicken &amp; Eggs Platter</strong> delivers an astonishing <strong>76 grams of protein</strong> (850 calories) when ordered with two marinated grilled chicken breasts, two eggs, regular hashbrowns, and toast. If ordered "Plate Only" (without toast and potatoes), you get <strong>70 grams of pure protein for only 440 calories</strong>!
          </div>
        </details>

        <!-- FAQ 2 -->
        <details class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs group">
          <summary class="flex items-center justify-between p-5 font-bold text-gray-900 cursor-pointer list-none select-none hover:bg-amber-50/50">
            <span class="text-base sm:text-lg">Can you eat low-carb or keto high-protein at Waffle House?</span>
            <span class="transition-transform duration-200 group-open:rotate-180 text-amber-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </summary>
          <div class="p-5 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
            Absolutely. You can order any breakfast combo "Plate Only" (holding the hashbrowns and toast) and replace them with sliced tomatoes or extra eggs. Two grilled pork chops and two eggs deliver 64g of protein with only 2g net carbs.
          </div>
        </details>

        <!-- FAQ 3 -->
        <details class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs group">
          <summary class="flex items-center justify-between p-5 font-bold text-gray-900 cursor-pointer list-none select-none hover:bg-amber-50/50">
            <span class="text-base sm:text-lg">How much protein is in the signature All-Star Special™?</span>
            <span class="transition-transform duration-200 group-open:rotate-180 text-amber-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </summary>
          <div class="p-5 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
            The full 5-item All-Star Special™ combo provides <strong>34 grams of protein</strong> alongside 1,050 calories. You can increase the protein to 44g by requesting an extra egg and adding a side of bacon or city ham.
          </div>
        </details>

        <!-- FAQ 4 -->
        <details class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs group">
          <summary class="flex items-center justify-between p-5 font-bold text-gray-900 cursor-pointer list-none select-none hover:bg-amber-50/50">
            <span class="text-base sm:text-lg">Why are some high-protein diner meals also high in sodium?</span>
            <span class="transition-transform duration-200 group-open:rotate-180 text-amber-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </summary>
          <div class="p-5 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
            Cured meats like country ham (2,110 mg sodium) and pre-seasoned sausage contain salt cures for preservation and flavor. To minimize sodium while maintaining 40g+ protein, order fresh USDA Choice Sirloin Steaks (260 mg sodium) or fresh eggs (176 mg sodium).
          </div>
        </details>

      </div>
    </div>

    <!-- Dietary & Reference Hub (Cheesecake Factory 3-Column Architecture) -->
    <div class="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs mb-14">
      <div class="text-center mb-8">
        <span class="text-xs font-black uppercase tracking-wider text-amber-700">Dietary &amp; Reference Hub</span>
        <h2 class="text-2xl sm:text-3xl font-black text-[#0B0B0E] font-heading mt-1">
          Explore All Dietary Views &amp; Diner Guides
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        <!-- Col 1: All Dietary Guides -->
        <div>
          <h3 class="font-black text-[#0B0B0E] text-base uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
            All Dietary Guides
          </h3>
          <ul class="space-y-2.5 font-semibold text-gray-700">
            <li><a href="/diet/high-protein/" class="text-amber-700 font-bold hover:underline">High-Protein Guide (20g–76g) →</a></li>
            <li><a href="/diet/low-calorie/" class="hover:text-black transition-colors">Low-Calorie Menu (Under 600 Cal)</a></li>
            <li><a href="/waffle-house-dietary-guide/" class="hover:text-black transition-colors">Complete Dietary &amp; Nutritional Guide</a></li>
            <li><a href="/waffle-house-calories-allergies/" class="hover:text-black transition-colors">Calories &amp; Allergies Master List</a></li>
          </ul>
        </div>

        <!-- Col 2: Nutritional & Allergens -->
        <div>
          <h3 class="font-black text-[#0B0B0E] text-base uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
            Nutritional &amp; Allergens
          </h3>
          <ul class="space-y-2.5 font-semibold text-gray-700">
            <li><a href="/nutrition" class="hover:text-black transition-colors">Full Nutrition Table &amp; Calorie Guide →</a></li>
            <li><a href="/menu/pdf" class="hover:text-black transition-colors">Printable 10-Page Official Menu PDF</a></li>
            <li><a href="/waffle-house-all-star-special-price/" class="hover:text-black transition-colors">All-Star Special™ Complete Price Breakdown</a></li>
            <li><a href="/blog/waffle-house-secret-menu/" class="hover:text-black transition-colors">Secret Menu Hacks &amp; Custom Orders</a></li>
          </ul>
        </div>

        <!-- Col 3: Full Menu & Locations -->
        <div>
          <h3 class="font-black text-[#0B0B0E] text-base uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
            Full Menu &amp; Locations
          </h3>
          <ul class="space-y-2.5 font-semibold text-gray-700">
            <li><a href="/menu" class="hover:text-black transition-colors">Browse Full Diner Menu &amp; Prices →</a></li>
            <li><a href="/prices-by-state" class="hover:text-black transition-colors">Waffle House Prices by State</a></li>
            <li><a href="/coupons" class="hover:text-black transition-colors">Deals, Coupons &amp; Regular Specials</a></li>
            <li><a href="/locations" class="hover:text-black transition-colors">Find Nearest Open 24/7 Location</a></li>
          </ul>
        </div>

      </div>
    </div>

  </main>

  <!-- ================= OFFICIAL FOOTER ================= -->
  <footer class="bg-[#0B0B0E] text-white pt-12 pb-8 border-t border-yellow-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800 text-sm">
        
        <!-- Brand Info -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-xl font-black text-white font-heading">WaffleHouse</span>
            <span class="bg-[#FFC72C] text-[#0B0B0E] rounded px-1.5 py-0.5 text-xs font-black uppercase">Menu</span>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            Your independent informational reference guide to Waffle House menus, prices, high-protein options, nutrition facts, and 24-hour diner locations nationwide.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-3 font-heading">Menu &amp; Nutrition</h4>
          <ul class="space-y-2 text-xs text-gray-400">
            <li><a href="/menu" class="hover:text-[#FFC72C]">Full Menu &amp; Prices</a></li>
            <li><a href="/diet/high-protein/" class="hover:text-[#FFC72C] text-[#FFC72C]">High-Protein Menu</a></li>
            <li><a href="/diet/low-calorie/" class="hover:text-[#FFC72C]">Low-Calorie Menu</a></li>
            <li><a href="/nutrition" class="hover:text-[#FFC72C]">Nutrition Overview</a></li>
            <li><a href="/menu/pdf" class="hover:text-[#FFC72C]">Printable Menu (PDF)</a></li>
          </ul>
        </div>

        <!-- Plan Visit -->
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-3 font-heading">Plan A Visit</h4>
          <ul class="space-y-2 text-xs text-gray-400">
            <li><a href="/locations" class="hover:text-[#FFC72C]">All Locations</a></li>
            <li><a href="/prices-by-state" class="hover:text-[#FFC72C]">Prices by State</a></li>
            <li><a href="/waffle-house-catering/" class="hover:text-[#FFC72C]">Catering Guide</a></li>
            <li><a href="/coupons" class="hover:text-[#FFC72C]">Deals &amp; Coupons</a></li>
            <li><a href="/blog/" class="hover:text-[#FFC72C]">Diner Blog &amp; Stories</a></li>
          </ul>
        </div>

        <!-- Legal & About -->
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-3 font-heading">About &amp; Legal</h4>
          <ul class="space-y-2 text-xs text-gray-400">
            <li><a href="/about" class="hover:text-[#FFC72C]">About Us</a></li>
            <li><a href="/privacy" class="hover:text-[#FFC72C]">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:text-[#FFC72C]">Terms &amp; Conditions</a></li>
            <li><a href="/disclaimer" class="hover:text-[#FFC72C]">Disclaimer</a></li>
            <li><a href="/contact" class="hover:text-[#FFC72C]">Contact Us</a></li>
          </ul>
        </div>

      </div>

      <!-- Legal Disclaimer -->
      <div class="pt-6 text-center text-xs text-gray-500 leading-relaxed">
        <p class="mb-2">
          <strong>Disclaimer:</strong> Waffle House Menu Guide is an independent enthusiast resource and is not affiliated with, endorsed by, or sponsored by Waffle House, Inc. or WH Capital, L.L.C. All trademarks, logos, and brand names are the property of their respective owners. Menu prices and nutritional metrics may vary by state and franchise location.
        </p>
        <p>© 2026 Waffle House Menu Guide. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <!-- ================= CLIENT SCRIPTS ================= -->
  <script>
    // Mobile Drawer Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
      });
    }

    // Live Search and Category Filter
    const searchInput = document.getElementById('dishSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dishRows = document.querySelectorAll('.dish-row');
    const counterText = document.getElementById('counterText');
    const noResults = document.getElementById('noResults');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterDishes() {
      let visibleCount = 0;
      dishRows.forEach(row => {
        const dishCategory = row.getAttribute('data-category');
        const textContent = row.textContent.toLowerCase();
        
        const matchesCat = (currentFilter === 'all' || dishCategory === currentFilter);
        const matchesSearch = (!searchQuery || textContent.includes(searchQuery));

        if (matchesCat && matchesSearch) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      counterText.textContent = \`Showing \${visibleCount} of \${dishRows.length} dishes\`;
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterDishes();
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterDishes();
      });
    });
  </script>
</body>
</html>
`;
}

const html = generateHtml();

// Targets
const targets = [
  'diet/high-protein/index.html',
  'diet-high-protein.html',
  'waffle-house-high-protein-menu/index.html',
  'diet/high-calorie/index.html',
  'diet-high-calorie.html',
  'waffle-house-high-calorie-menu/index.html'
];

targets.forEach(t => {
  const fullPath = path.resolve(__dirname, '..', t);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, html, 'utf8');
  console.log(`Successfully wrote ${t} (${(html.length / 1024).toFixed(1)} KB)`);
});
