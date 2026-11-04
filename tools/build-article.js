// Build an article page's <main>, title/meta and JSON-LD from a content module in tools/content/.
// Usage: node tools/build-article.js <name> [<name> ...]   (tools/content/<name>.js)
// Content modules export a function (helpers) => ({ file, url, crumb, title, h1, description, eyebrow, published,
// modified, readMin, image, imageAlt, caption, lead, quick, sections, faqs, related }).
const fs = require('fs');
const path = require('path');
const data = require('./menu-data');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.wafflehouse-menu.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘').replace(/&ldquo;|&rdquo;/g, '"').replace(/&middot;/g, '·').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const longDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// ---- helpers for content modules
const h = {
  ...data,
  fmt: (n) => n.toLocaleString('en-US'),
  p: (t) => `<p class="text-base sm:text-[17px] text-gray-800 leading-relaxed mb-5">${t}</p>`,
  h3: (t) => `<h3 class="font-heading font-black text-xl text-[#1C1410] mt-8 mb-3">${t}</h3>`,
  ul: (rows) => `<ul class="list-disc pl-6 space-y-2 text-base sm:text-[17px] text-gray-800 leading-relaxed mb-5">${rows.map((r) => `<li>${r}</li>`).join('')}</ul>`,
  ol: (rows) => `<ol class="list-decimal pl-6 space-y-2 text-base sm:text-[17px] text-gray-800 leading-relaxed mb-5">${rows.map((r) => `<li>${r}</li>`).join('')}</ol>`,
  note: (t) => `<div class="rounded-2xl bg-[#FFFBEB] border border-amber-200 p-4 sm:p-5 text-sm sm:text-base text-amber-950 leading-relaxed mb-6">${t}</div>`,
  table: (head, rows, opts = {}) => `
          <div class="w-full overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-xs mb-6">
            <table class="w-full text-left border-collapse ${opts.minw || 'min-w-[520px]'} text-sm">
              <thead><tr class="bg-[#1C1410] text-[#F59E0B] uppercase font-heading font-black text-[11px] tracking-wider">${head.map((c, i) => `<th class="py-3 ${i ? 'px-3 text-center' : 'px-4'}">${c}</th>`).join('')}</tr></thead>
              <tbody class="divide-y divide-gray-100">${rows.map((r, n) => `
                <tr class="${n % 2 ? 'bg-gray-50/60' : 'bg-white'}">${r.map((c, i) => `<td class="py-2.5 ${i ? 'px-3 text-center text-gray-800' : 'px-4 font-bold text-[#1C1410]'}">${c}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>${opts.caption ? `<p class="text-xs text-gray-600 -mt-4 mb-6">${opts.caption}</p>` : ''}`,
  a: (href, text) => `<a class="font-bold text-[#1C1410] underline decoration-[#F59E0B] decoration-2 underline-offset-2 hover:text-amber-800" href="${href}">${text}</a>`,
  ext: (href, text) => `<a class="font-bold text-[#1C1410] underline decoration-[#F59E0B] decoration-2 underline-offset-2 hover:text-amber-800" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`,
};

function render(c) {
  const toc = c.sections.map((s) => `<li><a class="hover:underline" href="#${s.id}">${s.title}</a></li>`).join('');
  const quick = c.quick ? `
      <div id="quick-answer" class="mb-10 rounded-3xl bg-white border-2 border-[#F59E0B] p-6 sm:p-8 shadow-sm">
        <h2 class="font-heading font-black text-lg sm:text-xl text-[#1C1410] mb-3">${c.quick.heading}</h2>
        <p class="text-base sm:text-[17px] text-gray-800 leading-relaxed ${c.quick.stats ? 'mb-6' : ''}">${c.quick.html}</p>${c.quick.stats ? `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">${c.quick.stats.map(([l, v, s]) => `
          <div class="p-4 rounded-2xl bg-[#FAF7F0] border border-amber-200"><span class="text-[11px] font-bold uppercase text-gray-600 block mb-1">${l}</span><span class="font-heading font-black text-xl sm:text-2xl text-[#1C1410]">${v}</span>${s ? `<span class="text-[11px] text-gray-600 block mt-0.5">${s}</span>` : ''}</div>`).join('')}
        </div>` : ''}
      </div>` : '';
  const faq = c.faqs && c.faqs.length ? `
      <section id="faq" class="mb-12 scroll-mt-28">
        <h2 class="font-heading font-black text-2xl sm:text-3xl text-[#1C1410] tracking-tight mb-5">Frequently Asked Questions</h2>
        <div class="space-y-3">${c.faqs.map(([q, a]) => `
          <div class="faq-item bg-white border-2 border-[#F59E0B] rounded-2xl overflow-hidden shadow-2xs">
            <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#1C1410] flex items-center justify-between gap-4 cursor-pointer" aria-expanded="false"><span>${q}</span><span class="faq-icon text-[#1C1410] font-black text-base shrink-0">&darr;</span></button>
            <div class="faq-content hidden px-5 pb-5 text-gray-700 text-base leading-relaxed border-t border-amber-100 pt-3">${a}</div>
          </div>`).join('')}
        </div>
      </section>` : '';
  const related = c.related && c.related.length ? `
      <section class="mb-10 rounded-3xl bg-[#FAF7F0] border-2 border-gray-200 p-6 sm:p-8">
        <h2 class="font-heading font-black text-xl text-[#1C1410] mb-4">Keep reading</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${c.related.map(([href, t, d]) => `
          <a href="${href}" class="block bg-white rounded-2xl border-2 border-gray-200 hover:border-[#F59E0B] p-4 transition-colors"><span class="block font-heading font-black text-[#1C1410]">${t} &rarr;</span><span class="block text-sm text-gray-600 mt-1">${d}</span></a>`).join('')}
        </div>
      </section>` : '';
  return `<main id="main-content" tabindex="-1" class="py-10 sm:py-14 bg-white font-sans">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex flex-wrap items-center gap-2 text-sm font-bold text-gray-600 mb-6" aria-label="Breadcrumb">
        <a href="/" class="hover:text-[#1C1410]">Home</a><span aria-hidden="true">&rsaquo;</span><a href="${c.crumbParent ? c.crumbParent[0] : '/blog/'}" class="hover:text-[#1C1410]">${c.crumbParent ? c.crumbParent[1] : 'Blog'}</a><span aria-hidden="true">&rsaquo;</span><span class="text-[#1C1410]" aria-current="page">${c.crumb}</span>
      </nav>
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span class="px-3 py-1 rounded-full bg-[#F59E0B] text-[#1C1410] font-heading font-black text-xs uppercase tracking-wider">${c.eyebrow}</span>
        <span class="text-sm text-gray-600 font-medium">Published ${longDate(c.published)} &bull; ${c.readMin} min read</span>
      </div>
      <h1 class="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1410] tracking-tight leading-tight mb-5">${c.h1}</h1>
      <p class="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">${c.lead}</p>
      <div class="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF7F0] border border-amber-200 mb-8">
        <div class="w-11 h-11 rounded-xl bg-[#1C1410] text-[#F59E0B] flex items-center justify-center font-black text-lg shrink-0" aria-hidden="true">WG</div>
        <div><div class="font-heading font-black text-sm text-[#1C1410]">By <a href="/about" class="hover:underline">Editorial Team</a></div><div class="text-xs text-gray-600">Waffle Guide</div></div>
      </div>
      <figure class="rounded-3xl overflow-hidden border-2 border-gray-200 shadow-md mb-10">
        <img src="${c.image}" alt="${esc(c.imageAlt)}" class="w-full h-auto object-cover max-h-[480px]" loading="eager" fetchpriority="high" width="1200" height="675" />
        <figcaption class="p-3 bg-white border-t border-gray-100 text-sm text-gray-600 text-center">${c.caption}</figcaption>
      </figure>
${quick}
      <nav aria-label="In this article" class="mb-10 p-6 rounded-3xl bg-[#FAF7F0] border-2 border-[#F59E0B]">
        <h2 class="font-heading font-black text-sm uppercase tracking-wider text-[#1C1410] mb-3">In this article</h2>
        <ol class="list-decimal pl-5 space-y-1.5 text-sm sm:text-base text-gray-800 font-medium">${toc}</ol>
      </nav>
${c.sections.map((s) => `
      <section id="${s.id}" class="mb-12 scroll-mt-28">
        <h2 class="font-heading font-black text-2xl sm:text-3xl text-[#1C1410] tracking-tight mb-5">${s.title}</h2>
        ${s.html}
      </section>`).join('')}
${faq}
${related}
      <p class="text-sm text-gray-600 border-t border-gray-200 pt-6">Prices are typical 2026 prices compiled by Waffle Guide and vary by location; nutrition figures are estimates for each item as normally served. Waffle Guide is an independent guide and is not affiliated with Waffle House, Inc. For allergies, confirm with the restaurant.</p>
    </article>
  </main>`;
}

function build(name) {
  const c = require(path.join(__dirname, 'content', name + '.js'))(h);
  const file = path.join(ROOT, c.file);
  let html = fs.readFileSync(file, 'utf8');
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  html = html.replace(/\r\n/g, '\n');
  // remove a breadcrumb block that sits just before <main> (the new article has its own)
  html = html.replace(/\n[ \t]*<!-- =+ \d*\.? ?BREADCRUMBS? =+ -->\n[ \t]*<nav\b[^>]*aria-label="Breadcrumb"[^>]*>[\s\S]*?<\/nav>\n/i, '\n');
  const s = html.search(/<main\b[^>]*>/), e = html.indexOf('</main>') + '</main>'.length;
  if (s < 0 || e < s) throw new Error('no <main> in ' + c.file);
  html = html.slice(0, s) + render(c) + html.slice(e);
  // head
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(c.title)}</title>`);
  html = html.replace(/(<meta\s+(?:property="og:title"|name="twitter:title"|name="title")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(c.title) + b);
  html = html.replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(c.description) + b);
  html = html.replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*(")/g, (m, a, b) => a + SITE + c.image + b);
  html = html.replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/, (m, a, b) => a + esc(c.imageAlt) + b);
  html = html.replace(/(<meta\s+property="article:published_time"\s+content=")[^"]*(")/, (m, a, b) => a + c.published + 'T09:00:00Z' + b);
  html = html.replace(/(<meta\s+property="article:modified_time"\s+content=")[^"]*(")/, (m, a, b) => a + c.modified + 'T09:00:00Z' + b);
  html = html.replace(/(<meta\s+property="article:section"\s+content=")[^"]*(")/, (m, a, b) => a + esc(c.eyebrow) + b);
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, (m, a, b) => a + SITE + c.url + b);
  html = html.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, (m, a, b) => a + SITE + c.url + b);
  const org = { '@type': 'Organization', name: 'Waffle Guide', url: SITE + '/', logo: { '@type': 'ImageObject', url: SITE + '/assets/logo-icon.png' } };
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': c.schemaType || 'Article', '@id': SITE + c.url + '#article', headline: plain(c.h1), description: c.description, image: SITE + c.image,
      datePublished: c.published + 'T09:00:00Z', dateModified: c.modified + 'T09:00:00Z',
      author: { '@type': 'Organization', name: 'Waffle Guide Editorial Team', url: SITE + '/about' }, publisher: org,
      mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + c.url } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: c.crumbParent ? plain(c.crumbParent[1]) : 'Blog', item: SITE + (c.crumbParent ? c.crumbParent[0] : '/blog/') },
      { '@type': 'ListItem', position: 3, name: plain(c.crumb), item: SITE + c.url } ] },
    ...(c.faqs && c.faqs.length ? [{ '@type': 'FAQPage', mainEntity: c.faqs.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) }] : []),
  ] };
  const a = html.indexOf('<script type="application/ld+json">'), b = html.indexOf('</script>', a) + 9;
  html = html.slice(0, a) + '<script type="application/ld+json">\n' + JSON.stringify(ld, null, 2) + '\n  </script>' + html.slice(b);
  fs.writeFileSync(file, html.replace(/\n/g, nl));
  const words = plain(render(c)).split(' ').length;
  console.log(`${c.file}: ${c.sections.length} sections, ${c.faqs ? c.faqs.length : 0} FAQs, ~${words} words`);
}

for (const n of process.argv.slice(2)) build(n);
