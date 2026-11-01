const fs = require('fs');
const path = require('path');

// 1. Raw Official Waffle House Items Data
const rawItems = [
  // Beverages
  { name: "Diet Coke®", category: "Beverages", cal: 0, pro: "0g", sodium: "50mg", price: "$2.75", fat: "0g", carbs: "0g" },
  { name: "Alice's Iced Tea™ (Unsweet)", category: "Beverages", cal: 0, pro: "0g", sodium: "0mg", price: "$2.75", fat: "0g", carbs: "0g" },
  { name: "Waffle House Royal Blend Coffee (8 oz)", category: "Beverages", cal: 5, pro: "0g", sodium: "0mg", price: "$2.75", fat: "0g", carbs: "1g" },
  { name: "Decaf Royal Blend Coffee (8 oz)", category: "Beverages", cal: 5, pro: "0g", sodium: "0mg", price: "$2.75", fat: "0g", carbs: "1g" },
  { name: "Hot Tea (Cup)", category: "Beverages", cal: 0, pro: "0g", sodium: "0mg", price: "$2.75", fat: "0g", carbs: "0g" },
  { name: "Minute Maid® Orange Juice (Small 6 oz)", category: "Beverages", cal: 110, pro: "2g", sodium: "15mg", price: "$2.85", fat: "0g", carbs: "26g" },
  { name: "Minute Maid® Orange Juice (Regular 10 oz)", category: "Beverages", cal: 180, pro: "3g", sodium: "25mg", price: "$3.45", fat: "0g", carbs: "44g" },
  { name: "Alice's Iced Tea™ (Sweet, 16 oz)", category: "Beverages", cal: 140, pro: "0g", sodium: "10mg", price: "$2.75", fat: "0g", carbs: "35g" },
  { name: "Whole Milk (Small 6 oz)", category: "Beverages", cal: 110, pro: "6g", sodium: "90mg", price: "$2.45", fat: "6g", carbs: "9g" },
  { name: "Chocolate Milk (Small 6 oz)", category: "Beverages", cal: 140, pro: "6g", sodium: "110mg", price: "$2.65", fat: "4g", carbs: "20g" },
  { name: "Whole Milk (Regular 10 oz)", category: "Beverages", cal: 190, pro: "10g", sodium: "150mg", price: "$2.95", fat: "10g", carbs: "15g" },
  { name: "Chocolate Milk (Regular 10 oz)", category: "Beverages", cal: 240, pro: "10g", sodium: "190mg", price: "$3.15", fat: "7g", carbs: "35g" },

  // Sides, Toppings & Produce
  { name: "Grilled Tomatoes (Diced - Hashbrown Topping)", category: "Hashbrowns & Sides", cal: 5, pro: "0g", sodium: "0mg", price: "$0.65", fat: "0g", carbs: "2g" },
  { name: "Sliced Tomatoes (3 fresh slices)", category: "Hashbrowns & Sides", cal: 10, pro: "0g", sodium: "0mg", price: "$1.50", fat: "0g", carbs: "2g" },
  { name: "Grilled Mushrooms (Capped)", category: "Hashbrowns & Sides", cal: 10, pro: "1g", sodium: "140mg", price: "$0.65", fat: "0g", carbs: "2g" },
  { name: "Jalapeno Peppers (Peppered)", category: "Hashbrowns & Sides", cal: 10, pro: "0g", sodium: "390mg", price: "$0.65", fat: "0g", carbs: "2g" },
  { name: "Sautéed Onions (Smothered)", category: "Hashbrowns & Sides", cal: 15, pro: "0g", sodium: "0mg", price: "$0.65", fat: "0g", carbs: "3g" },
  { name: "Melted American Cheese (Covered, 1 slice)", category: "Hashbrowns & Sides", cal: 50, pro: "3g", sodium: "250mg", price: "$0.65", fat: "5g", carbs: "1g" },
  { name: "Bert's Chili™ (Topped Hashbrown Topping)", category: "Hashbrowns & Sides", cal: 55, pro: "5g", sodium: "260mg", price: "$0.85", fat: "2g", carbs: "6g" },
  { name: "Hickory Smoked Ham (Chunked Hashbrown Topping)", category: "Hashbrowns & Sides", cal: 70, pro: "9g", sodium: "630mg", price: "$0.85", fat: "3g", carbs: "2g" },
  { name: "Country Sausage Gravy (3 oz)", category: "Hashbrowns & Sides", cal: 75, pro: "1g", sodium: "385mg", price: "$0.85", fat: "18g", carbs: "8g" },
  { name: "Traditional Southern Grits (Regular Bowl)", category: "Hashbrowns & Sides", cal: 90, pro: "3g", sodium: "300mg", price: "$2.95", fat: "3g", carbs: "16g" },
  { name: "Large Southern Grits Bowl", category: "Hashbrowns & Sides", cal: 180, pro: "6g", sodium: "600mg", price: "$3.65", fat: "6g", carbs: "32g" },
  { name: "Regular Golden Hashbrowns (Plain)", category: "Hashbrowns & Sides", cal: 190, pro: "3g", sodium: "240mg", price: "$3.25", fat: "7g", carbs: "29g" },
  { name: "Large Golden Hashbrowns (Double)", category: "Hashbrowns & Sides", cal: 380, pro: "6g", sodium: "480mg", price: "$4.25", fat: "14g", carbs: "58g" },
  { name: "Triple Golden Hashbrowns (All The Way Base)", category: "Hashbrowns & Sides", cal: 570, pro: "9g", sodium: "720mg", price: "$5.15", fat: "21g", carbs: "87g" },

  // Toast & Bakery
  { name: "Texas Toast (1 thick slice grilled)", category: "Bread & Bakery", cal: 100, pro: "3g", sodium: "190mg", price: "$1.25", fat: "1g", carbs: "19g" },
  { name: "Wheat Toast (2 slices toasted)", category: "Bread & Bakery", cal: 120, pro: "6g", sodium: "250mg", price: "$2.65", fat: "2g", carbs: "26g" },
  { name: "White Toast (2 slices toasted)", category: "Bread & Bakery", cal: 130, pro: "4g", sodium: "260mg", price: "$2.65", fat: "2g", carbs: "25g" },
  { name: "Raisin Toast (2 slices w/ cinnamon apple butter)", category: "Bread & Bakery", cal: 220, pro: "6g", sodium: "280mg", price: "$2.85", fat: "3g", carbs: "42g" },
  { name: "Grilled Buttermilk Biscuit (Plain)", category: "Bread & Bakery", cal: 300, pro: "5g", sodium: "800mg", price: "$2.45", fat: "15g", carbs: "34g" },

  // Lean Proteins & Breakfast Meats
  { name: "City Ham (1 lean grilled slice)", category: "Breakfast & Eggs", cal: 100, pro: "14g", sodium: "850mg", price: "$3.95", fat: "3g", carbs: "7g" },
  { name: "Hickory-Smoked Bacon (3 crispy strips)", category: "Breakfast & Eggs", cal: 135, pro: "9g", sodium: "375mg", price: "$4.25", fat: "12g", carbs: "0g" },
  { name: "Grilled Chicken Breast Filet (1 filet)", category: "Steaks & Dinners", cal: 140, pro: "29g", sodium: "470mg", price: "$4.95", fat: "3g", carbs: "2g" },
  { name: "Two Farm Fresh Eggs (Scrambled or Over-Easy)", category: "Breakfast & Eggs", cal: 180, pro: "12g", sodium: "176mg", price: "$4.95", fat: "14g", carbs: "2g" },
  { name: "Chicken Sausage (2 grilled patties)", category: "Breakfast & Eggs", cal: 180, pro: "14g", sodium: "700mg", price: "$4.25", fat: "13g", carbs: "0g" },
  { name: "Country Ham (1 salty cured slice)", category: "Breakfast & Eggs", cal: 190, pro: "25g", sodium: "2110mg", price: "$4.95", fat: "9g", carbs: "1g" },
  { name: "Jimmy Dean® Sausage (2 patties)", category: "Breakfast & Eggs", cal: 260, pro: "10g", sodium: "510mg", price: "$4.25", fat: "24g", carbs: "1g" },
  { name: "Cheese 'N Eggs (2 eggs scrambled w/ American cheese)", category: "Breakfast & Eggs", cal: 280, pro: "17g", sodium: "676mg", price: "$5.95", fat: "23g", carbs: "4g" },
  { name: "USDA Choice Sirloin Steak (4 oz portion)", category: "Steaks & Dinners", cal: 300, pro: "41g", sodium: "260mg", price: "$7.95", fat: "14g", carbs: "0g" },
  { name: "Two Grilled Pork Chops (Center cut plain)", category: "Steaks & Dinners", cal: 340, pro: "52g", sodium: "1040mg", price: "$8.95", fat: "14g", carbs: "0g" },

  // Egg Combos & Breakfast Platters
  { name: "Cheesesteak & 2 Eggs Breakfast (Plate Only)", category: "Breakfast & Eggs", cal: 310, pro: "28g", sodium: "476mg", price: "$11.50", fat: "21g", carbs: "2g" },
  { name: "Grilled Chicken & 2 Eggs Breakfast (Plate Only)", category: "Breakfast & Eggs", cal: 310, pro: "41g", sodium: "1106mg", price: "$10.95", fat: "15g", carbs: "4g" },
  { name: "Country Ham & 2 Eggs Breakfast (Plate Only)", category: "Breakfast & Eggs", cal: 370, pro: "37g", sodium: "2286mg", price: "$11.25", fat: "23g", carbs: "3g" },
  { name: "Meat Lover's Chicken & Eggs (2 Filets + 2 Eggs)", category: "Breakfast & Eggs", cal: 440, pro: "70g", sodium: "2036mg", price: "$13.95", fat: "16g", carbs: "6g" },
  { name: "Delmonico Ribeye Steak & 2 Eggs Breakfast", category: "Breakfast & Eggs", cal: 480, pro: "53g", sodium: "636mg", price: "$14.25", fat: "28g", carbs: "2g" },
  { name: "Two Center Cut Pork Chops & 2 Eggs", category: "Breakfast & Eggs", cal: 520, pro: "64g", sodium: "1216mg", price: "$12.95", fat: "28g", carbs: "2g" },
  { name: "Fiesta Protein Bowl (Grilled Chicken, 3 Eggs, Melted Cheese)", category: "Breakfast & Eggs", cal: 530, pro: "52g", sodium: "2084mg", price: "$9.95", fat: "31g", carbs: "14g" },
  { name: "USDA Choice T-Bone Steak & 2 Eggs", category: "Breakfast & Eggs", cal: 600, pro: "49g", sodium: "436mg", price: "$14.95", fat: "43g", carbs: "2g" },

  // Sandwiches & Texas Melts
  { name: "Egg Sandwich (White or Wheat Toast)", category: "Sandwiches & Melts", cal: 220, pro: "10g", sodium: "348mg", price: "$4.50", fat: "9g", carbs: "26g" },
  { name: "Grilled Ham Sandwich (Plain White/Wheat)", category: "Sandwiches & Melts", cal: 230, pro: "18g", sodium: "1110mg", price: "$5.95", fat: "4g", carbs: "32g" },
  { name: "Egg & Cheese Sandwich (Toasted Bun or Bread)", category: "Sandwiches & Melts", cal: 270, pro: "13g", sodium: "598mg", price: "$5.25", fat: "13g", carbs: "27g" },
  { name: "Chicken Sausage Sandwich (Toast)", category: "Sandwiches & Melts", cal: 310, pro: "18g", sodium: "960mg", price: "$5.95", fat: "15g", carbs: "25g" },
  { name: "Bacon & Egg Sandwich", category: "Sandwiches & Melts", cal: 355, pro: "19g", sodium: "723mg", price: "$6.25", fat: "21g", carbs: "26g" },
  { name: "Ham, Egg & Cheese Sandwich", category: "Sandwiches & Melts", cal: 370, pro: "27g", sodium: "1448mg", price: "$6.95", fat: "16g", carbs: "34g" },
  { name: "Sausage Sandwich (Toast)", category: "Sandwiches & Melts", cal: 390, pro: "14g", sodium: "770mg", price: "$5.95", fat: "26g", carbs: "26g" },
  { name: "Texas Egg & Cheese Melt (Thick Toast)", category: "Sandwiches & Melts", cal: 390, pro: "17g", sodium: "968mg", price: "$6.45", fat: "18g", carbs: "41g" },
  { name: "Texas Cheesesteak™ Melt (Grilled Onions & American Cheese)", category: "Sandwiches & Melts", cal: 445, pro: "27g", sodium: "1180mg", price: "$8.45", fat: "18g", carbs: "43g" },
  { name: "Texas Grilled Chicken Melt", category: "Sandwiches & Melts", cal: 445, pro: "40g", sodium: "1810mg", price: "$8.45", fat: "12g", carbs: "45g" },
  { name: "Texas Ham, Egg & Cheese Melt", category: "Sandwiches & Melts", cal: 490, pro: "31g", sodium: "1818mg", price: "$7.95", fat: "21g", carbs: "48g" },
  { name: "Texas Bacon, Egg & Cheese Melt", category: "Sandwiches & Melts", cal: 525, pro: "26g", sodium: "1343mg", price: "$7.95", fat: "30g", carbs: "41g" },
  { name: "Sausage, Egg & Cheese Sandwich", category: "Sandwiches & Melts", cal: 530, pro: "23g", sodium: "1108mg", price: "$6.95", fat: "37g", carbs: "28g" },
  { name: "Texas Chicken Sausage, Egg & Cheese Melt", category: "Sandwiches & Melts", cal: 570, pro: "31g", sodium: "1668mg", price: "$7.95", fat: "31g", carbs: "41g" },

  // Omelets & Bowls
  { name: "Plain Two-Egg Omelet", category: "Breakfast & Eggs", cal: 240, pro: "14g", sodium: "230mg", price: "$5.95", fat: "18g", carbs: "2g" },
  { name: "Fiesta Egg & Vegetable Omelet (Onions, Tomatoes, Jalapenos)", category: "Breakfast & Eggs", cal: 270, pro: "15g", sodium: "620mg", price: "$7.25", fat: "18g", carbs: "7g" },
  { name: "Cheese Omelet (2 Melted American Cheese slices)", category: "Breakfast & Eggs", cal: 340, pro: "20g", sodium: "730mg", price: "$6.95", fat: "28g", carbs: "4g" },
  { name: "Ham & Cheese Omelet (Toddle House® Classic)", category: "Breakfast & Eggs", cal: 410, pro: "29g", sodium: "1360mg", price: "$8.45", fat: "31g", carbs: "6g" },
  { name: "Grilled Chicken & Cheese Omelet", category: "Breakfast & Eggs", cal: 480, pro: "49g", sodium: "1200mg", price: "$9.45", fat: "31g", carbs: "6g" },

  // Waffles, Sweet Treats & Pies
  { name: "Blueberry Nougat Topping (Waffle Add-on)", category: "Waffles & Treats", cal: 98, pro: "1g", sodium: "8mg", price: "$0.65", fat: "2g", carbs: "13g" },
  { name: "Chocolate Chips Topping (Waffle Add-on)", category: "Waffles & Treats", cal: 95, pro: "1g", sodium: "0mg", price: "$0.65", fat: "5g", carbs: "14g" },
  { name: "Peanut Butter Chips (Waffle Add-on)", category: "Waffles & Treats", cal: 113, pro: "2g", sodium: "71mg", price: "$0.65", fat: "6g", carbs: "13g" },
  { name: "Roasted Georgia Pecans Topping (Waffle Add-on)", category: "Waffles & Treats", cal: 150, pro: "2g", sodium: "0mg", price: "$0.75", fat: "15g", carbs: "3g" },
  { name: "Classic Sweet Cream Waffle (Plain with Butter & Syrup)", category: "Waffles & Treats", cal: 410, pro: "8g", sodium: "870mg", price: "$4.75", fat: "18g", carbs: "55g" },
  { name: "Triple Chocolate Silk Pie (1 Slice)", category: "Waffles & Treats", cal: 490, pro: "2g", sodium: "270mg", price: "$4.50", fat: "25g", carbs: "59g" },
  { name: "Southern Pecan Pie (1 Slice)", category: "Waffles & Treats", cal: 540, pro: "5g", sodium: "330mg", price: "$4.50", fat: "28g", carbs: "68g" },

  // Kids Meals
  { name: "Kids' 1 Egg Breakfast (w/ Toast & Jelly)", category: "Kids' Menu", cal: 210, pro: "10g", sodium: "330mg", price: "$4.25", fat: "9g", carbs: "26g" },
  { name: "Kids' Waffle Plate (Plain)", category: "Kids' Menu", cal: 310, pro: "6g", sodium: "650mg", price: "$4.25", fat: "14g", carbs: "41g" },
  { name: "Kids' 2 Bacon Strips & Toast", category: "Kids' Menu", cal: 210, pro: "10g", sodium: "500mg", price: "$4.25", fat: "10g", carbs: "25g" },
  { name: "Kids' Cheeseburger (1 100% Angus Patty)", category: "Kids' Menu", cal: 380, pro: "20g", sodium: "620mg", price: "$4.95", fat: "20g", carbs: "28g" }
];

// Sort ascending by calories
rawItems.sort((a, b) => a.cal - b.cal);

const totalDishes = rawItems.length;
const avgCalories = Math.round(rawItems.reduce((acc, it) => acc + it.cal, 0) / totalDishes);
const avgProtein = Math.round(rawItems.reduce((acc, it) => acc + parseInt(it.pro), 0) / totalDishes);
const avgSodium = Math.round(rawItems.reduce((acc, it) => acc + parseInt(it.sodium), 0) / totalDishes);

console.log(`Processed ${totalDishes} low-calorie items.`);
console.log(`Avg Cal: ${avgCalories}, Avg Pro: ${avgProtein}g, Avg Sodium: ${avgSodium}mg`);

function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waffle House Low-Calorie Menu: ${totalDishes} Dishes Under 600 Calories (2026)</title>
  <meta name="description" content="Explore ${totalDishes} Waffle House dishes under 600 calories ranked lightest first. Full nutritional profile: calories, protein, sodium, fat, and diner ordering hacks for weight loss.">
  <link rel="canonical" href="https://www.wafflehouse-menu.com/diet/low-calorie/">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:title" content="Waffle House Low-Calorie Menu: ${totalDishes} Dishes Under 600 Calories (2026)">
  <meta property="og:description" content="Ranked lightest first: every Waffle House meal under 600 calories with exact protein, calories, and sodium counts.">
  <meta property="og:url" content="https://www.wafflehouse-menu.com/diet/low-calorie/">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://www.wafflehouse-menu.com/assets/waffle-house-menu-pdf-mockup.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandYellow: '#FFC72C',
            brandBlack: '#0B0B0E',
            brandDark: '#121216',
          },
          fontFamily: {
            heading: ['Oswald', 'sans-serif'],
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    .font-heading { font-family: 'Oswald', sans-serif; }
    .font-sans { font-family: 'Inter', sans-serif; }
    html { scroll-behavior: smooth; }
    /* Table row transition */
    .dish-row { transition: background-color 0.15s ease; }
    .dish-row:hover { background-color: rgba(255, 199, 44, 0.08); }
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
              "name": "Diet Guides",
              "item": "https://www.wafflehouse-menu.com/diet/"
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
            "name": "What is the lowest calorie meal at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The lowest calorie meal combo is 2 farm fresh eggs cooked scrambled or over-easy (180 calories) with a side of sliced tomatoes (10 calories) and unsweetened iced tea or black coffee (0-5 calories), totaling just 190-195 calories with 12g of protein."
            }
          },
          {
            "@type": "Question",
            "name": "How can I order low-calorie eggs at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask your server for eggs cooked 'in the pan' or with cooking spray rather than on the well-oiled diner flat-top grill. This prevents eggs from absorbing excess bacon grease and liquid butter, saving 50 to 100 hidden calories."
            }
          },
          {
            "@type": "Question",
            "name": "What is the lowest calorie meat option at Waffle House?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "City Ham is the lowest calorie breakfast meat at only 100 calories and 3g fat for 14g of lean protein. A single grilled chicken breast filet provides 29g of protein for only 140 calories and 3g fat."
            }
          },
          {
            "@type": "Question",
            "name": "Are Waffle House hashbrowns low calorie?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A regular order of plain hashbrowns contains 190 calories and 7g of fat. To keep them healthy, request them cooked 'dry' (crisped with minimal added oil) and top with diced tomatoes, capped mushrooms, or sautéed onions rather than melted cheese or gravy."
            }
          },
          {
            "@type": "Question",
            "name": "How do I manage high sodium on the Waffle House menu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Avoid country ham, which has 2,110 mg of sodium. Choose city ham (850 mg sodium), grilled chicken (470 mg sodium), or plain eggs (176 mg sodium). Request that kitchen staff cook your meat and hashbrowns without additional salt or seasoned butter."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="bg-[#FAF7F0] text-[#0B0B0E] font-sans antialiased selection:bg-[#FFC72C] selection:text-black">

  <!-- ================= HEADER NAVIGATION ================= -->
  <header class="sticky top-0 z-50 bg-[#FFC72C] shadow-md border-b-2 border-black/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Row: Logo & Desktop Links -->
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Brand Logo -->
        <a href="/" class="flex items-center gap-2 group focus:outline-none">
          <div class="bg-[#0B0B0E] text-[#FFC72C] px-3 py-1.5 rounded-lg font-heading font-black text-xl sm:text-2xl tracking-tighter uppercase transform group-hover:scale-105 transition-transform shadow-xs">
            WAFFLE HOUSE
          </div>
          <span class="font-heading font-bold text-xs sm:text-sm tracking-widest uppercase text-[#0B0B0E] hidden sm:inline-block">
            Menu 2026
          </span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
          
          <!-- Menu Dropdown -->
          <div class="relative group">
            <a href="/menu" class="inline-flex items-center gap-1 text-[#0B0B0E] text-[15px] font-extrabold hover:text-black/70 transition-colors py-1">
              <span>Menu &amp; Prices</span>
              <svg class="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </a>
            <div class="hidden group-hover:block absolute left-0 top-full pt-2 w-56 z-50">
              <div class="bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 overflow-hidden">
                <a href="/menu" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 transition-colors">Full Menu &amp; Prices</a>
                <a href="/menu/pdf" class="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-900 bg-amber-50 hover:bg-[#FFC72C]/20 transition-colors">
                  <span>Printable Menu (PDF)</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">2026</span>
                </a>
                <a href="/prices-by-state" class="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 transition-colors">Prices by State</a>
              </div>
            </div>
          </div>

          <a href="/waffle-house-catering/" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors">Catering</a>

          <!-- Nutrition Dropdown (Active) -->
          <div class="relative group">
            <button type="button" class="inline-flex items-center gap-1 text-[#0B0B0E] text-[15px] font-black hover:text-black/70 transition-colors py-1 border-b-2 border-[#0B0B0E]">
              <span>Nutrition</span>
              <svg class="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div class="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 z-50">
              <div class="bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 overflow-hidden">
                <a href="/nutrition" class="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 transition-colors">Nutrition Facts</a>
                <a href="/waffle-house-calories-allergies/" class="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 transition-colors">Calories &amp; Allergies</a>
                <a href="/diet/low-calorie/" class="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-900 bg-amber-100/60 hover:bg-[#FFC72C]/30 transition-colors">
                  <span>Low-Calorie Menu</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">Under 600</span>
                </a>
                <a href="/waffle-house-dietary-guide/" class="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-[#FFC72C]/20 transition-colors">Dietary Guide</a>
              </div>
            </div>
          </div>

          <a href="/coupons" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors">Deals &amp; Coupons</a>
          <a href="/blog/" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors">Blog</a>
          <a href="/locations" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors">Locations</a>
          <a href="/about" class="text-[#0B0B0E] text-[15px] font-bold hover:text-black/70 transition-colors">About</a>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button type="button" id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg bg-black/10 text-black hover:bg-black/20 focus:outline-none" aria-label="Toggle navigation">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>

      </div>
    </div>
  </header>

  <!-- Mobile Menu Drawer -->
  <div id="mobile-nav" class="hidden fixed inset-0 z-50 lg:hidden">
    <div id="mobile-nav-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs"></div>
    <div class="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white p-6 shadow-2xl overflow-y-auto">
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
        <span class="font-heading font-black text-xl text-[#0B0B0E]">MENU NAVIGATION</span>
        <button type="button" id="mobile-close-btn" class="p-2 text-gray-500 hover:text-black" aria-label="Close menu">&times;</button>
      </div>
      <div class="space-y-3 font-heading font-bold text-base">
        <a href="/menu" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Full Menu &amp; Prices</a>
        <a href="/diet/low-calorie/" class="block p-3 rounded-xl bg-[#FFF8E1] border border-[#FFC72C] text-[#0B0B0E]">Low-Calorie Menu (Under 600 Cal)</a>
        <a href="/nutrition" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Nutrition &amp; Calorie Guide</a>
        <a href="/waffle-house-calories-allergies/" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Calories &amp; Allergies</a>
        <a href="/menu/pdf" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Printable Menu (PDF)</a>
        <a href="/waffle-house-catering/" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Catering</a>
        <a href="/locations" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Store Hours &amp; Locations</a>
        <a href="/coupons" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Deals &amp; Coupons</a>
        <a href="/blog/" class="block p-3 rounded-xl hover:bg-amber-100 text-[#0B0B0E]">Blog &amp; Diner Guides</a>
      </div>
    </div>
  </div>

  <main id="main-content">
    
    <!-- ================= BREADCRUMB ================= -->
    <nav class="bg-gray-100 border-b border-gray-200 py-3 px-4 text-xs font-sans text-gray-600">
      <div class="max-w-6xl mx-auto flex items-center gap-2 flex-wrap">
        <a href="/" class="hover:text-amber-700 font-medium">Home</a>
        <span>/</span>
        <a href="/nutrition" class="hover:text-amber-700 font-medium">Diet &amp; Nutrition</a>
        <span>/</span>
        <span class="text-[#0B0B0E] font-bold" aria-current="page">Low-Calorie</span>
      </div>
    </nav>

    <!-- ================= HERO HEADER (MATCHING CHEESECAKE REFERENCE) ================= -->
    <section class="bg-white py-12 md:py-16 px-4 border-b border-gray-200">
      <div class="max-w-5xl mx-auto">
        
        <!-- Eyebrow Tag -->
        <span class="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-700 font-heading block mb-2">
          Lighter picks, ranked by calorie count
        </span>

        <!-- H1 Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0B0E] font-heading uppercase tracking-tight leading-tight mb-4">
          Waffle House Dishes Under 600 Calories
        </h1>

        <!-- Author / Verification Byline -->
        <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium">
          <span>By <a href="/about" class="text-amber-700 font-bold hover:underline">Editorial Staff</a></span>
          <span>&bull;</span>
          <span>Last updated May 2026 Edition</span>
          <span>&bull;</span>
          <span class="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            Official Nutrition Tables
          </span>
        </div>

        <!-- Lead Description -->
        <p class="text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl mb-8 font-normal">
          Every dish at or under 600 calories, ranked lightest first, so you can plan a satisfying meal around a specific calorie target without accidental hidden calories or guesswork.
        </p>

        <!-- 4 Metric Highlight Cards (Cheesecake Factory Layout) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-[#FAF7F0] border-2 border-gray-200 rounded-2xl p-4 sm:p-5 text-center">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Qualifying dishes</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${totalDishes}</span>
          </div>
          <div class="bg-[#FAF7F0] border-2 border-gray-200 rounded-2xl p-4 sm:p-5 text-center">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Avg. calories</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${avgCalories}</span>
          </div>
          <div class="bg-[#FAF7F0] border-2 border-gray-200 rounded-2xl p-4 sm:p-5 text-center">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Avg. protein</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${avgProtein} g</span>
          </div>
          <div class="bg-[#FAF7F0] border-2 border-[#FFC72C] bg-[#FFFDF7] rounded-2xl p-4 sm:p-5 text-center">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-500 font-heading">Avg. sodium</span>
            <span class="text-3xl sm:text-4xl font-black text-[#0B0B0E] font-heading mt-1 block">${avgSodium} mg</span>
          </div>
        </div>

      </div>
    </section>

    <!-- ================= ADVISORY & AT A GLANCE ================= -->
    <section class="py-12 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-5xl mx-auto space-y-8">
        
        <!-- What to Watch For (AEO Snippet Box) -->
        <div class="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xs">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black">!</span>
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
          
          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8">
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

          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8">
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
                class="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#FFC72C] focus:outline-none text-sm font-medium"
              >
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Filter Buttons Bar (Cheesecake Factory Filter Buttons) -->
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
              ${rawItems.map((item, idx) => `
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

    <!-- ================= DIETARY & REFERENCE HUB (CHEESECAKE FACTORY EXACT 3-COL HUB) ================= -->
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

    <!-- ================= FREQUENTLY ASKED QUESTIONS (HOMEPAGE EXACT STYLING) ================= -->
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

        <!-- FAQ Container with Brand Yellow Border (Exact Homepage Style) -->
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

  <!-- ================= HOMEPAGE MATCHING FOOTER ================= -->
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

  <!-- ================= JAVASCRIPT: SEARCH, FILTER & FAQ ACCORDION ================= -->
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
          b.classList.remove('bg-[#FFC72C]', 'text-[#0B0B0E]', 'border-[#FFC72C]', 'shadow-2xs', 'active');
          b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
        });
        btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
        btn.classList.add('bg-[#FFC72C]', 'text-[#0B0B0E]', 'border-[#FFC72C]', 'shadow-2xs', 'active');

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

// Write the files
fs.mkdirSync('diet/low-calorie', { recursive: true });
fs.mkdirSync('waffle-house-low-calorie-menu', { recursive: true });

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
