const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'blog', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update All Guides badge count to 2 and Menu & Prices badge to 1
content = content.replace(
  /(<button[^>]*data-category="All Guides"[^>]*>[\s\S]*?<span class="cat-badge[^>]*>)\d+(<\/span>)/,
  '$12$2'
);

content = content.replace(
  /(<button[^>]*data-category="Menu &amp; Prices"[^>]*>[\s\S]*?<span class="cat-badge[^>]*>)\d+(<\/span>)/,
  '$11$2'
);

// Add Hours & Holidays button if not present
if (!content.includes('data-category="Hours &amp; Holidays"')) {
  const hoursBtn = `
          <button 
            type="button" 
            data-category="Hours &amp; Holidays" 
            class="cat-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span>Hours &amp; Holidays</span>
            <span class="cat-badge px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-500">1</span>
          </button>`;

  content = content.replace(
    /(<button[^>]*data-category="Menu &amp; Prices"[\s\S]*?<\/button>)/,
    `$1${hoursBtn}`
  );
}

// 2. Update article count display
content = content.replace(
  /<span id="article-count-display"[^>]*>.*?<\/span>/,
  '<span id="article-count-display" class="text-xs text-gray-500 font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg">2 Articles Published</span>'
);

// 3. Add Thanksgiving Article Card if not already present
if (!content.includes('/blog/waffle-house-thanksgiving-hours/')) {
  const thanksgivingCard = `
        <!-- Article Card 2: Waffle House Thanksgiving Hours -->
        <article class="article-card group bg-white rounded-3xl border-2 border-[#FFC72C] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col" data-category="Hours &amp; Holidays">
          
          <!-- Image Container with Zoom Effect -->
          <div class="relative overflow-hidden aspect-video bg-gray-100 border-b border-gray-100">
            <a href="/blog/waffle-house-thanksgiving-hours/" class="block overflow-hidden w-full h-full">
              <img 
                src="/assets/blog/waffle-house-thanksgiving-hours.jpg" 
                alt="Waffle House diner illuminated warmly on Thanksgiving Day"
                width="600"
                height="338"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            <!-- Floating Category Pill -->
            <div class="absolute top-3.5 left-3.5">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#FFC72C] text-[#0B0B0E] shadow-sm">
                Hours &amp; Holidays
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6 sm:p-7 flex-1 flex flex-col">
            
            <!-- Date & Read Time Row -->
            <div class="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
              <time datetime="2026-09-30">Sep 30, 2026</time>
              <span class="text-gray-300">•</span>
              <span>6 min read</span>
            </div>

            <!-- Title -->
            <h2 class="font-heading font-black text-xl sm:text-2xl text-[#0B0B0E] leading-snug tracking-tight mb-3 group-hover:text-black">
              <a href="/blog/waffle-house-thanksgiving-hours/" class="hover:underline decoration-[#FFC72C] decoration-2 underline-offset-4">
                Waffle House Thanksgiving Hours 2026: Open or Closed? What to Expect
              </a>
            </h2>

            <!-- Excerpt -->
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal flex-1 line-clamp-3">
              Wondering if Waffle House is open on Thanksgiving Day? Discover 2026 holiday diner hours, why stores stay open 24/7, peak rush times, and tips for dining or takeout.
            </p>

            <!-- Card Bottom Row: Read More Button -->
            <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
              <a 
                href="/blog/waffle-house-thanksgiving-hours/" 
                class="inline-flex items-center gap-1.5 font-heading font-bold text-sm text-[#0B0B0E] group-hover:text-black transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Read Full Guide</span>
                <span class="text-[#0B0B0E] font-black text-base">&rarr;</span>
              </a>
              <span class="text-xs font-bold text-gray-400">Holiday Guide</span>
            </div>

          </div>

        </article>
`;

  content = content.replace(
    /(<\/article>[\s\r\n]*)(<\/div>[\s\r\n]*<!-- Empty State)/,
    `$1${thanksgivingCard}$2`
  );
}

// 4. Update the interactive category filtering logic so it really filters the cards!
const filterLogicReplacement = `    // 4. Category Filter Buttons Interaction
    const catButtons = document.querySelectorAll('.cat-btn');
    const activeCategoryDisplay = document.getElementById('active-category-display');
    const articleCards = document.querySelectorAll('.article-card');
    const noArticlesFound = document.getElementById('no-articles-found');
    const resetFilterBtn = document.getElementById('reset-filter-btn');
    const articleCountDisplay = document.getElementById('article-count-display');

    function applyCategoryFilter(categoryName) {
      let visibleCount = 0;
      articleCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (categoryName === 'All Guides' || cardCat === categoryName) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (noArticlesFound) {
        if (visibleCount === 0) {
          noArticlesFound.classList.remove('hidden');
        } else {
          noArticlesFound.classList.add('hidden');
        }
      }

      if (articleCountDisplay) {
        articleCountDisplay.textContent = visibleCount + (visibleCount === 1 ? ' Article Displayed' : ' Articles Displayed');
      }

      if (activeCategoryDisplay) {
        activeCategoryDisplay.textContent = categoryName;
      }
    }

    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(b => {
          b.classList.remove('bg-[#0B0B0E]', 'text-white', 'shadow-xs', 'active');
          b.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-700');
          const badge = b.querySelector('.cat-badge');
          if (badge) {
            badge.classList.remove('bg-[#FFC72C]', 'text-[#0B0B0E]', 'font-black');
            badge.classList.add('bg-gray-100', 'text-gray-500', 'font-bold');
          }
        });

        btn.classList.add('bg-[#0B0B0E]', 'text-white', 'shadow-xs', 'active');
        btn.classList.remove('bg-white', 'border-gray-200', 'text-gray-700');
        const activeBadge = btn.querySelector('.cat-badge');
        if (activeBadge) {
          activeBadge.classList.remove('bg-gray-100', 'text-gray-500', 'font-bold');
          activeBadge.classList.add('bg-[#FFC72C]', 'text-[#0B0B0E]', 'font-black');
        }

        const categoryName = btn.getAttribute('data-category');
        applyCategoryFilter(categoryName);
      });
    });

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        const allBtn = document.querySelector('.cat-btn[data-category="All Guides"]');
        if (allBtn) allBtn.click();
      });
    }`;

content = content.replace(
  /\/\/ 4\. Category Filter Buttons Interaction[\s\S]*?\/\/ 5\. FAQ Accordion/,
  `${filterLogicReplacement}\n\n    // 5. FAQ Accordion`
);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated blog/index.html!');
