// Waffle House All-Star Special: price, what comes with it, calories and how to order (merged guide).
module.exports = (h) => {
  const { byName: B, components: C, money, fmt, p, h3, ul, ol, note, table, a } = h;
  const bacon = B['All-Star Special with Bacon'], sausage = B['All-Star Special with Sausage'], ham = B['All-Star Special with City Ham'];
  const egg = B['Two Egg Breakfast with Bacon'], plain2 = B['Two Egg Breakfast'], waffle = B['Classic Waffle'], pecan = B['Pecan Waffle'];
  const separate = egg.price + waffle.price;
  const save = separate - bacon.price;
  const sides = [['HASH', 'Hashbrowns'], ['GRITS', 'Grits'], ['TOMATOINSTEAD', 'Sliced tomatoes']];
  const meats = [['BACON', 'Bacon (3 slices)'], ['SAUSAGE', 'Sausage (2 patties)'], ['HAM', 'City ham']];
  const base = C.WAFFLE.cal + C.EGG_TWO.cal + C.WHITE.cal;
  const calRows = meats.map(([m, mn]) => [mn, ...sides.map(([s]) => fmt(base + C[m].cal + C[s].cal))]);
  const lightest = base - C.WHITE.cal + C.WHEAT.cal + C.HAM.cal + C.TOMATOINSTEAD.cal;
  const heaviest = C.WAFFLE.cal + C.PECAN.cal + C.EGG_TWO.cal + C.COVERED.cal * 2 + C.RAISIN.cal + C.SAUSAGE.cal + C.HASH.cal + C.SMOTHERED.cal + C.COVERED.cal;

  return {
    file: 'blog/waffle-house-all-star-special/index.html',
    url: '/blog/waffle-house-all-star-special/',
    crumb: 'All-Star Special',
    title: 'Waffle House All-Star Special 2026: Price, Calories & Sides',
    h1: 'Waffle House All-Star Special: Price, What&rsquo;s Included &amp; Calories',
    description: `The Waffle House All-Star Special costs about ${money(bacon.price)} in 2026. What comes on the plate, how much it saves, calories for each meat and side, and how to order it.`,
    eyebrow: 'Menu Guide',
    published: '2026-09-29',
    modified: '2026-10-29',
    readMin: 8,
    image: '/assets/blog/waffle-house-all-star-special-breakfast-plate.webp',
    imageAlt: 'An All-Star Special style breakfast plate with a waffle, scrambled eggs, bacon, hashbrowns and buttered toast, with a mug of coffee on a diner table',
    imageTitle: 'All-Star Special: Worth It?',
    caption: 'The All-Star Special: a waffle, two eggs, toast, a side and a breakfast meat.',
    lead: `The All-Star Special is the order most people picture when they think of Waffle House: a sweet cream waffle, two eggs, toast, hashbrowns or grits and a breakfast meat, all for one price. Here is what it costs in 2026, what you actually get, how many calories it adds up to, and how to order it the way you like it.`,
    quick: {
      heading: 'The short answer',
      html: `The All-Star Special typically costs about <strong>${money(bacon.price)}</strong>, and published price lists show it from <strong>${money(bacon.range[0])} to ${money(bacon.range[1])}</strong> depending on the restaurant. It comes with two scrambled eggs, toast and jelly, a choice of hashbrowns, grits or sliced tomatoes, a waffle, and bacon, sausage or city ham. With hashbrowns and white toast it is about <strong>${fmt(ham.cal)}&ndash;${fmt(sausage.cal)} calories</strong>.`,
      stats: [['Typical price', money(bacon.price), `${money(bacon.range[0])}&ndash;${money(bacon.range[1])} seen`], ['On the plate', '5 items', 'Waffle, eggs, toast, side, meat'], ['Calories', `${fmt(ham.cal)}&ndash;${fmt(sausage.cal)}`, 'With hashbrowns'], ['Combo saving', `~${money(save)}`, 'vs ordering separately']],
    },
    sections: [
      { id: 'whats-included', title: 'What comes with the All-Star Special', html: `
        ${p('The All-Star Special comes with two scrambled eggs with toast and jelly, a choice of grits, hashbrowns or sliced tomatoes, a waffle, and a choice of bacon, sausage or city ham. That is five things on the table, and you get to pick three of them.')}
        ${table(['Part of the meal', 'Choices', 'Calories'], [
          ['Waffle', 'Classic sweet cream waffle', fmt(C.WAFFLE.cal)],
          ['Eggs', 'Two eggs, scrambled as standard', fmt(C.EGG_TWO.cal)],
          ['Toast', 'White, wheat or raisin', `${C.WHEAT.cal}&ndash;${C.RAISIN.cal}`],
          ['Side', 'Hashbrowns, grits or sliced tomatoes', `${C.TOMATOINSTEAD.cal}&ndash;${C.HASH.cal}`],
          ['Meat', 'Bacon (3 slices), sausage (2 patties) or city ham', `${C.HAM.cal}&ndash;${C.SAUSAGE.cal}`],
        ])}
        ${p('Eggs can be cooked the way you like them. Scrambled is the default in the menu description, and the nutrition figures on this page assume scrambled eggs, white toast and regular hashbrowns unless noted.')}
        ${note('Drinks are not part of the All-Star Special. A cup of coffee typically adds about ' + money(B.Coffee.price) + '.')}` },
      { id: 'price', title: 'How much the All-Star Special costs in 2026', html: `
        ${p(`Waffle House does not publish one national price, so the All-Star Special costs more in some restaurants than others. Across published 2026 price lists it runs from ${money(bacon.range[0])} to ${money(bacon.range[1])}, and the middle of that range is about <strong>${money(bacon.price)}</strong>. The price is the same whichever meat you choose.`)}
        ${p(`Restaurants beside highways, near airports and in bigger cities tend to sit at the top of the range. Sales tax is added on top. Compare typical prices for the rest of the menu on the ${a('/prices-by-state', 'prices by state')} page.`)}` },
      { id: 'value', title: 'Is the All-Star Special a good deal?', html: `
        ${p(`Yes, if you want the waffle. Ordered on their own, a two egg breakfast with bacon (about ${money(egg.price)}) and a classic waffle (about ${money(waffle.price)}) come to roughly ${money(separate)}. The All-Star Special puts the same food on one plate for about ${money(bacon.price)}, which saves around <strong>${money(save)}</strong>.`)}
        ${table(['Ordered separately', 'Typical price'], [
          ['Two egg breakfast with bacon', money(egg.price)],
          ['Classic waffle', money(waffle.price)],
          ['<strong>Total</strong>', `<strong>${money(separate)}</strong>`],
          ['<strong>All-Star Special</strong>', `<strong>${money(bacon.price)}</strong>`],
        ], { caption: 'Typical prices; your restaurant may differ.' })}
        ${p(`If you do not want the waffle, the plain two egg breakfast (about ${money(plain2.price)}) is the cheaper plate. If you would rather have a bigger waffle, a pecan waffle on its own is about ${money(pecan.price)}, so ask what your restaurant charges to swap it into the All-Star.`)}` },
      { id: 'calories', title: 'All-Star Special calories', html: `
        ${p('The meat and the side change the total the most. These totals include the waffle, two scrambled eggs and white toast:')}
        ${table(['Meat', 'With hashbrowns', 'With grits', 'With sliced tomatoes'], calRows)}
        ${p(`With hashbrowns, the All-Star Special has about ${bacon.protein}&ndash;${ham.protein}g of protein, ${bacon.carbs}&ndash;${ham.carbs}g of carbohydrates and ${fmt(ham.sodium)}&ndash;${fmt(sausage.sodium)}mg of sodium. The lightest version, with city ham, sliced tomatoes and wheat toast, is about ${fmt(lightest)} calories. Push it the other way, with a pecan waffle, cheese on the eggs, raisin toast, sausage and hashbrowns smothered and covered, and it passes ${fmt(Math.floor(heaviest / 100) * 100)} calories.`)}
        ${p(`Butter and syrup are not included in these figures. For every item on the menu, see the ${a('/nutrition', 'nutrition facts')} page.`)}` },
      { id: 'allergens', title: 'Allergens in the All-Star Special', html: `
        ${p(`With hashbrowns and white toast, the All-Star Special lists milk, egg, wheat, soy and tree nuts. The tree nuts come from the waffle: they are listed for the plain waffle, not just the pecan one. Bacon, sausage and city ham list no major allergens of their own, but everything is cooked on shared grills and waffle irons.`)}
        ${p(`Check every item in the ${a('/waffle-house-calories-allergies/', 'allergen chart')}, and confirm with the restaurant if you have a serious allergy.`)}` },
      { id: 'how-to-order', title: 'How to order it your way', html: `
        ${ol([
          '<strong>Pick your side.</strong> Hashbrowns, grits or sliced tomatoes. Sliced tomatoes are the lightest choice.',
          '<strong>Dress the hashbrowns.</strong> Each topping has a one-word call: smothered (onions), covered (cheese), chunked (ham), diced (tomatoes), peppered (jalape&ntilde;os), capped (mushrooms), topped (chili) and country (sausage gravy). Toppings usually cost extra.',
          '<strong>Say how you want the eggs.</strong> Scrambled, over easy, over medium and so on.',
          '<strong>Choose the meat.</strong> Bacon, sausage or city ham.',
          '<strong>Choose the toast.</strong> White, wheat or raisin.',
        ])}
        ${p(`Learn the full hashbrown vocabulary in our ${a('/blog/waffle-house-hash-browns/', 'hashbrowns guide')}, and see the rest of the menu on the ${a('/menu', 'full menu with prices')}.`)}` },
    ],
    faqs: [
      ['How much is the All-Star Special at Waffle House?', `The All-Star Special typically costs about ${money(bacon.price)} in 2026, and published price lists show it from ${money(bacon.range[0])} to ${money(bacon.range[1])} depending on the restaurant.`],
      ['What comes in the Waffle House All-Star Special?', 'Two scrambled eggs with toast and jelly, a choice of hashbrowns, grits or sliced tomatoes, a waffle, and a choice of bacon, sausage or city ham.'],
      ['How many calories are in the All-Star Special?', `With hashbrowns and white toast, about ${fmt(bacon.cal)} calories with bacon, ${fmt(sausage.cal)} with sausage and ${fmt(ham.cal)} with city ham. Choosing sliced tomatoes instead of hashbrowns takes off about ${C.HASH.cal - C.TOMATOINSTEAD.cal} calories.`],
      ['Does the All-Star Special come with a drink?', `No. Drinks are ordered separately; a cup of coffee is typically about ${money(B.Coffee.price)}.`],
      ['Can I get grits instead of hashbrowns in the All-Star Special?', 'Yes. The side is your choice of hashbrowns, grits or sliced tomatoes.'],
    ],
    related: [
      ['/blog/waffle-house-hash-browns/', 'Waffle House hashbrowns', 'Sizes, toppings and how to order them'],
      ['/menu#cat-all-star-specials', 'Full menu with prices', 'Every item, with typical prices and nutrition'],
      ['/blog/healthiest-breakfast-for-weight-loss/', 'Lighter breakfast orders', 'Healthier ways to order at Waffle House'],
      ['/prices-by-state', 'Prices by state', 'Typical prices and price ranges'],
    ],
  };
};
