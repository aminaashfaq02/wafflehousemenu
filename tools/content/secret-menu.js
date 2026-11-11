// Waffle House "secret menu": custom orders worth asking for, with nutrition built from the component data.
module.exports = (h) => {
  const { byName: B, components: C, money, fmt, p, h3, ul, ol, note, table, a } = h;
  const sum = (ids) => ids.reduce((t, [id, q = 1]) => ({ cal: t.cal + C[id].cal * q, protein: t.protein + C[id].protein * q, sodium: t.sodium + C[id].sodium * q }), { cal: 0, protein: 0, sodium: 0 });
  const orders = [
    ['Hashbrowns all the way', 'Every topping on a regular order: onions, cheese, ham, tomatoes, jalape&ntilde;os, mushrooms, chili and sausage gravy.', [['HASHATW']], `On the menu as &ldquo;all the way&rdquo;, about ${money(B['Hashbrowns All The Way'].price)}.`],
    ['Double-chip waffle', 'A classic waffle with both chocolate chips and peanut butter chips.', [['WAFFLE'], ['CHOCCHIP'], ['PBCHIP']], 'Ask for both toppings; expect to pay for each.'],
    ['Cheese eggs', 'Scrambled eggs with a slice of American cheese per egg, an option you can add to any breakfast.', [['EGG_TWO'], ['COVERED', 2]], 'Add to any egg breakfast.'],
    ['Biscuit, gravy and an egg', 'Biscuit and sausage gravy with a scrambled egg on top.', [['GRVYBISC'], ['EGG']], 'Ask to add an egg.'],
    ['Peppered patty melt', 'The Texas Angus Patty Melt with jalape&ntilde;os added.', [['TXPATTY'], ['PEPPERED']], 'Add jalape&ntilde;os to the melt.'],
    ['Bacon cheesesteak melt', 'The Texas Cheesesteak Melt with bacon added, which some restaurants list as its own item.', [['TXCSMLT'], ['ADDBACON']], `About ${money(B['Texas Bacon Cheesesteak Melt'].price)} where it is listed.`],
    ['Waffle &ldquo;burger&rdquo;', 'An Angus patty and cheese served with a waffle in place of the bun, a request that has done the rounds online.', [['WAFFLE'], ['PATTY'], ['COVERED']], 'Not a menu item; it is up to the cook.'],
    ['Triple hashbrowns, scattered, smothered and covered', 'A triple order with onions and cheese for sharing.', [['TRIPHASH'], ['SMOTHERED'], ['COVERED']], `A triple order is about ${money(B['Triple Hashbrowns'].price)} before toppings.`],
  ].map(([n, d, ids, how]) => ({ n, d, how, ...sum(ids) }));

  return {
    file: 'blog/waffle-house-secret-menu-items/index.html',
    url: '/blog/waffle-house-secret-menu-items/',
    crumb: 'Secret Menu',
    title: 'Waffle House Secret Menu: 8 Custom Orders to Ask For (2026)',
    h1: 'The Waffle House &ldquo;Secret Menu&rdquo;: 8 Custom Orders Worth Asking For',
    description: 'There is no official Waffle House secret menu, but most orders are cooked by hand. Eight custom orders to ask for, with calories and tips on asking.',
    eyebrow: 'Ordering Tips',
    published: '2026-10-21',
    modified: '2026-10-28',
    readMin: 6,
    image: '/assets/blog/waffle-house-secret-menu-chocolate-peanut-butter-chip-waffle.webp',
    imageAlt: 'A waffle topped with chocolate chips, peanut butter chips and a pat of butter on a diner plate',
    imageTitle: '8 Secret Menu Orders',
    caption: 'Most &ldquo;secret menu&rdquo; orders are regular menu items with a few changes, like a waffle with both chocolate and peanut butter chips.',
    lead: 'Waffle House does not have an official secret menu. What it has is a grill where almost everything is cooked to order, which means many changes are possible if you ask clearly and the cook is willing. These are eight custom orders built from regular menu items, with the calories for each and a few tips on how to ask.',
    quick: {
      html: 'There is no official secret menu. &ldquo;Secret menu&rdquo; orders are combinations of regular items, such as hashbrowns <strong>all the way</strong>, a waffle with <strong>both chocolate and peanut butter chips</strong>, or <strong>cheese eggs</strong>. Whether an off-menu request is made is up to the cook, and extras are usually charged.',
    },
    sections: [
      { id: 'how-it-works', title: 'How the &ldquo;secret menu&rdquo; really works', html: `
        ${p('Everything at Waffle House is cooked on the grill in front of you, from the eggs to the melts. Because the kitchen works from individual ingredients (the same eggs, cheese, meats and toppings go into dozens of dishes), it is often possible to add or swap something.')}
        ${p('If an item is not on the menu, though, the cook decides whether to make it. The best &ldquo;secret&rdquo; orders are simple changes to things that are already on the menu.')}` },
      { id: 'orders', title: '8 custom orders to ask for', html: orders.map((o, i) => `
        ${h3(`${i + 1}. ${o.n}`)}
        ${p(o.d)}
        ${ul([`About <strong>${fmt(o.cal)} calories</strong>, ${o.protein}g of protein and ${fmt(o.sodium)}mg of sodium.`, o.how])}`).join('') },
      { id: 'compare', title: 'All eight at a glance', html: `
        ${table(['Order', 'Calories', 'Protein', 'Sodium'], orders.map((o) => [o.n, fmt(o.cal), o.protein + 'g', fmt(o.sodium) + 'mg']))}
        ${p(`Calories are added up from the components of each order. For the regular menu with typical prices, see the ${a('/menu', 'full menu')}.`)}` },
      { id: 'how-to-ask', title: 'How to ask for an off-menu order', html: `
        ${ol([
          'Order it as changes to a menu item (&ldquo;a patty melt with jalape&ntilde;os&rdquo;) rather than by a name you saw online.',
          'Keep it simple during busy times; one or two changes are easier than a whole new dish.',
          'Expect to pay for extras such as cheese, toppings and added meat.',
          'If the cook says no, take it gracefully: it is their grill.',
        ])}
        ${p(`Start with the hashbrown calls, which are part of the regular menu. Our ${a('/blog/waffle-house-hash-browns/', 'hashbrowns guide')} explains every word.`)}` },
    ],
    faqs: [
      ['Does Waffle House have a secret menu?', 'No. Waffle House does not have an official secret menu. &ldquo;Secret menu&rdquo; orders are custom combinations of regular menu items, and the cook decides whether to make an off-menu request.'],
      ['What is the most popular Waffle House secret menu order?', 'Hashbrowns ordered &ldquo;all the way&rdquo;, with every topping, is the best-known example. It is actually on the menu; it just takes knowing the words to order it.'],
      ['How many calories are in Waffle House hashbrowns all the way?', `About ${B['Hashbrowns All The Way'].cal} calories on a regular order, with ${fmt(B['Hashbrowns All The Way'].sodium)}mg of sodium.`],
      ['Can you get a waffle with chocolate chips and peanut butter chips?', `You can ask for both. A classic waffle with both toppings comes to about ${fmt(C.WAFFLE.cal + C.CHOCCHIP.cal + C.PBCHIP.cal)} calories, and each topping is usually charged.`],
      ['Will Waffle House make a waffle burger?', 'It is not a menu item, so it depends on the cook. If they will make it, expect to pay for the waffle and the patty separately.'],
    ],
    related: [
      ['/blog/waffle-house-hash-browns/', 'Hashbrowns guide', 'Every topping and what to call it'],
      ['/blog/waffle-house-all-star-special/', 'All-Star Special', 'Price, what you get and calories'],
      ['/menu', 'Full menu with prices', 'Every item with typical prices'],
      ['/nutrition', 'Nutrition facts', 'Calories and macros by category'],
    ],
  };
};
