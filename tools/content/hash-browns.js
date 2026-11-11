// Waffle House hashbrowns: sizes, the eight toppings and their calls, ways to cook them, prices and nutrition.
module.exports = (h) => {
  const { byName: B, components: C, money, fmt, p, h3, ul, ol, note, table, a, toppingPrice } = h;
  const reg = B['Hashbrowns (Regular)'], lg = B['Large Hashbrowns'], tri = B['Triple Hashbrowns'];
  const sc = B['Hashbrowns Scattered, Smothered & Covered'], atw = B['Hashbrowns All The Way'];
  const tops = [['Smothered', 'Grilled onions', 'SMOTHERED'], ['Covered', 'Slice of American cheese', 'COVERED'], ['Chunked', 'Hickory smoked ham', 'CHUNKED'], ['Diced', 'Grilled tomatoes', 'DICED'], ['Peppered', 'Jalape&ntilde;o peppers', 'PEPPERED'], ['Capped', 'Grilled mushrooms', 'MUSHROOM'], ['Topped', 'Bert&rsquo;s Chili', 'TOPPED'], ['Country', 'Sausage gravy', 'COUNTRY']];
  const bowls = ['Sausage Egg & Cheese Hashbrown Bowl', 'Bacon Egg & Cheese Hashbrown Bowl', 'Ham Egg & Cheese Hashbrown Bowl', 'Cheesesteak Melt Hashbrown Bowl', 'Chicken Melt Hashbrown Bowl'].map((n) => B[n]);

  return {
    file: 'blog/waffle-house-hash-browns/index.html',
    url: '/blog/waffle-house-hash-browns/',
    crumb: 'Hashbrowns',
    title: 'Waffle House Hashbrowns: Toppings, Lingo, Prices & Calories',
    h1: 'Waffle House Hashbrowns: Every Topping, the Lingo, Prices &amp; Calories',
    description: 'How to order Waffle House hashbrowns: the three sizes, all eight toppings and what to call them, ways to cook them, typical 2026 prices and calories.',
    eyebrow: 'Ordering Tips',
    published: '2026-10-19',
    modified: '2026-10-29',
    readMin: 7,
    image: '/assets/blog/waffle-house-hashbrowns-smothered-covered-toppings.webp',
    imageAlt: 'Crispy hashbrowns smothered in grilled onions and covered with melted cheese on an oval diner plate',
    imageTitle: '8 Ways to Order Hashbrowns',
    caption: 'Scattered, smothered and covered: hashbrowns with grilled onions and a slice of cheese.',
    lead: 'Hashbrowns are the side most people build their Waffle House order around, and they come with their own vocabulary. Scattered, smothered, covered, chunked: each word adds something specific. Here is what every term means, what the sizes and toppings cost, and how the calories change as you add them.',
    quick: {
      html: `Waffle House hashbrowns come regular, large or triple. A regular order is typically about <strong>${money(reg.price)}</strong> and ${reg.cal} calories. Each topping usually adds about ${money(toppingPrice)}: <strong>smothered</strong> (onions), <strong>covered</strong> (cheese), <strong>chunked</strong> (ham), <strong>diced</strong> (tomatoes), <strong>peppered</strong> (jalape&ntilde;os), <strong>capped</strong> (mushrooms), <strong>topped</strong> (chili) and <strong>country</strong> (sausage gravy). Order them all and they are &ldquo;all the way&rdquo;.`,
      stats: [['Regular order', money(reg.price), `${reg.cal} cal`], ['Large order', money(lg.price), `${lg.cal} cal`], ['Each topping', `~${money(toppingPrice)}`, `${C.DICED.cal}&ndash;${C.COUNTRY.cal} cal`], ['All the way', money(atw.price), `${atw.cal} cal`]],
    },
    sections: [
      { id: 'sizes', title: 'The three sizes', html: `
        ${table(['Size', 'Typical price', 'Calories', 'Carbs'], [[ 'Regular', money(reg.price), reg.cal, reg.carbs + 'g'], ['Large (a double order)', money(lg.price), lg.cal, lg.carbs + 'g'], ['Triple', money(tri.price), tri.cal, tri.carbs + 'g']])}
        ${p(`A regular order comes with breakfast plates such as the ${a('/blog/waffle-house-all-star-special/', 'All-Star Special')}, and the breakfast hashbrown bowls are built on a large order. Plain hashbrowns list soy as their only major allergen.`)}` },
      { id: 'lingo', title: 'The eight toppings and what to call them', html: `
        ${p('Hashbrowns are cooked &ldquo;scattered&rdquo;, spread thin across the grill so more of them crisps. After that, each topping has its own word:')}
        ${table(['Say', 'You get', 'Calories added', 'Sodium added'], tops.map(([w, t, id]) => [w, t, '+' + C[id].cal, '+' + fmt(C[id].sodium) + 'mg']))}
        ${p(`Stack the words in any order: &ldquo;scattered, smothered and covered&rdquo; (onions and cheese) is about ${sc.cal} calories on a regular order. &ldquo;All the way&rdquo; means every topping on the list, about ${atw.cal} calories and ${fmt(atw.sodium)}mg of sodium.`)}` },
      { id: 'cooking', title: 'Other ways to have them cooked', html: `
        ${ul([
          '<strong>Well-done:</strong> left on the grill longer for a darker, crunchier finish.',
          '<strong>Cooked dry:</strong> made without the usual oil on the grill.',
          '<strong>Steamed:</strong> covered and cooked with a little ice so they steam rather than fry. Not every cook offers it, so ask.',
        ])}
        ${note('These are cooking requests rather than menu items, so how they turn out depends on the cook. The nutrition figures on this page are for a standard order.')}` },
      { id: 'prices-calories', title: 'Typical prices and calories', html: `
        ${table(['Order', 'Typical price', 'Calories', 'Sodium'], [reg, lg, tri, sc, atw].map((i) => [i.name.replace('Hashbrowns ', '').replace('(Regular)', 'Regular').replace(/^Large Hashbrowns$/, 'Large').replace(/^Triple Hashbrowns$/, 'Triple'), money(i.price), i.cal, fmt(i.sodium) + 'mg']))}
        ${p(`Prices vary by location; see ${a('/prices-by-state', 'prices by state')} for the ranges. Calories for every topping combination are easy to add up from the table above, or use the ${a('/nutrition#calculator', 'hashbrown bowl calculator')}.`)}` },
      { id: 'bowls', title: 'Hashbrown bowls', html: `
        ${p('If you want hashbrowns as the meal rather than the side, the bowls start with a large order and add cheese and a filling:')}
        ${table(['Bowl', 'Typical price', 'Calories', 'Protein'], bowls.map((b) => [b.name, money(b.price), b.cal, b.protein + 'g']))}
        ${p(`See every bowl on the ${a('/menu#cat-hashbrown-bowls', 'menu')}.`)}` },
      { id: 'lighter', title: 'Lighter ways to order them', html: `
        ${ul([
          `Grilled onions (${C.SMOTHERED.cal} calories) and diced tomatoes (${C.DICED.cal}) add flavour for almost nothing.`,
          `Sausage gravy (${C.COUNTRY.cal} calories, ${fmt(C.COUNTRY.sodium)}mg sodium) and chili (${C.TOPPED.cal} calories) add the most.`,
          `Ask for them cooked dry to skip the usual grill oil.`,
          `Swap them for grits (${C.GRITS.cal} calories) or sliced tomatoes (${C.TOMATOINSTEAD.cal}) on a breakfast plate.`,
        ])}
        ${p(`More ideas in our ${a('/blog/healthiest-breakfast-for-weight-loss/', 'lighter breakfast guide')}.`)}` },
    ],
    faqs: [
      ['What does scattered, smothered and covered mean at Waffle House?', 'Scattered means the hashbrowns are spread across the grill to crisp, smothered adds grilled onions, and covered adds a slice of melted American cheese.'],
      ['What does all the way mean for Waffle House hashbrowns?', `All the way means every topping: onions, cheese, ham, tomatoes, jalapeños, mushrooms, chili and sausage gravy. On a regular order it is about ${atw.cal} calories.`],
      ['How much are hashbrowns at Waffle House?', `A regular order is typically about ${money(reg.price)}, a large ${money(lg.price)} and a triple ${money(tri.price)}. Each topping usually adds about ${money(toppingPrice)}.`],
      ['How many calories are in Waffle House hashbrowns?', `About ${reg.cal} calories in a regular order, ${lg.cal} in a large and ${tri.cal} in a triple, before toppings.`],
      ['Can you get Waffle House hashbrowns without oil?', 'You can ask for them cooked dry, without the usual oil on the grill. Some cooks will also steam them if you ask.'],
    ],
    related: [
      ['/blog/waffle-house-all-star-special/', 'All-Star Special', 'Price, what you get and calories'],
      ['/blog/waffle-house-secret-menu-items/', 'Secret menu orders', 'Off-menu combinations to ask for'],
      ['/menu#cat-hashbrowns-toppings', 'Hashbrowns on the menu', 'Every size and topping with nutrition'],
      ['/nutrition#calculator', 'Hashbrown bowl calculator', 'Add up your own bowl'],
    ],
  };
};
