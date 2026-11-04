// Healthiest breakfast for weight loss at Waffle House: lighter plates, swaps and traps, all from the menu data.
module.exports = (h) => {
  const { byName: B, components: C, money, fmt, p, h3, ul, ol, note, table, a } = h;
  const plate = (ids) => ids.reduce((t, id) => ({ cal: t.cal + C[id].cal, protein: t.protein + C[id].protein, carbs: t.carbs + C[id].carbs, sodium: t.sodium + C[id].sodium }), { cal: 0, protein: 0, carbs: 0, sodium: 0 });
  const plates = [
    ['Two scrambled eggs, sliced tomatoes and wheat toast', ['EGG_TWO', 'TOMATOINSTEAD', 'WHEAT']],
    ['Grilled chicken, two scrambled eggs and sliced tomatoes', ['CHICKEN', 'EGG_TWO', 'TOMATOINSTEAD']],
    ['Two scrambled eggs, city ham and grits', ['EGG_TWO', 'HAM', 'GRITS']],
    ['Classic waffle with a side of city ham', ['WAFFLE', 'HAM']],
  ].map(([n, ids]) => ({ n, ...plate(ids) }));
  const fiesta = B['Chicken Fiesta Protein Bowl'];
  const lightAS = plate(['WAFFLE', 'EGG_TWO', 'WHEAT', 'HAM', 'TOMATOINSTEAD']);
  const heavyAS = B['All-Star Special with Sausage'];
  const traps = ['All-Star Special with Sausage', 'Country Ham Biscuits (2)', 'Triple Chocolate Pie', 'Texas Sausage Egg & Cheese Melt', 'Hashbrowns All The Way'].map((n) => B[n]);
  const per100 = (id) => (100 * C[id].protein / C[id].cal).toFixed(1);

  return {
    file: 'blog/healthiest-breakfast-for-weight-loss/index.html',
    url: '/blog/healthiest-breakfast-for-weight-loss/',
    crumb: 'Healthiest Breakfast',
    title: 'Healthiest Breakfast for Weight Loss at Waffle House (2026)',
    h1: 'The Healthiest Breakfast at Waffle House for Weight Loss',
    description: 'Lighter Waffle House breakfasts with calories and protein for each, the swaps that save the most, a lighter All-Star Special and the orders that quietly add up.',
    eyebrow: 'Nutrition',
    published: '2026-10-20',
    modified: '2026-10-30',
    readMin: 7,
    image: '/assets/blog/Egg_breakfast_plate_with_toast_202608101154.jpeg',
    imageAlt: 'Scrambled eggs with toast and hashbrowns on a diner plate',
    caption: 'Eggs, a light side and the right toast make a filling plate for a few hundred calories.',
    lead: 'Waffle House is not a diet restaurant, but almost everything is cooked to order, which makes it easy to build a breakfast that fits a calorie target. The trick is knowing where the calories are. Here are the lighter plates that still fill you up, the swaps that save the most, and the orders that add up faster than you would think.',
    quick: {
      heading: 'The short answer',
      html: `For the fewest calories with real staying power, order <strong>two scrambled eggs with sliced tomatoes and wheat toast</strong> (about ${plates[0].cal} calories and ${plates[0].protein}g of protein). For more protein, <strong>grilled chicken and two eggs with sliced tomatoes</strong> comes to about ${plates[1].cal} calories and ${plates[1].protein}g of protein, and the <strong>Chicken Fiesta Protein Bowl</strong> is about ${fiesta.cal} calories with ${fiesta.protein}g.`,
      stats: [['Lightest full plate', `${plates[0].cal} cal`, 'Eggs, tomatoes, wheat toast'], ['Most protein per calorie', 'Grilled chicken', `${per100('CHICKEN')}g per 100 cal`], ['Biggest single swap', `&minus;${C.WHITE.cal} cal`, 'Leave off the toast'], ['Lighter All-Star', `${fmt(lightAS.cal)} cal`, `vs ${fmt(heavyAS.cal)} with sausage`]],
    },
    sections: [
      { id: 'lighter-plates', title: 'Four lighter breakfasts that still fill you up', html: `
        ${p('Each of these is built from regular menu items, so any Waffle House can make it. Calories and protein are for the plate exactly as listed.')}
        ${table(['Plate', 'Calories', 'Protein', 'Carbs'], plates.map((x) => [x.n, x.cal, x.protein + 'g', x.carbs + 'g']))}
        ${p(`If you want something already on the menu, the ${a('/menu#cat-hashbrown-bowls', 'Chicken Fiesta Protein Bowl')} (grilled chicken, three scrambled eggs, cheese, onions, tomatoes and jalape&ntilde;os) is about ${fiesta.cal} calories with ${fiesta.protein}g of protein and only ${fiesta.carbs}g of carbs.`)}` },
      { id: 'swaps', title: 'The swaps that save the most', html: `
        ${p('Most of the calories in a Waffle House breakfast come from the bread, the side and the meat. These changes make the biggest difference:')}
        ${table(['Swap', 'Calories saved'], [
          ['Leave off the toast', C.WHITE.cal],
          ['Sliced tomatoes instead of hashbrowns', C.HASH.cal - C.TOMATOINSTEAD.cal],
          ['City ham instead of sausage', C.SAUSAGE.cal - C.HAM.cal],
          ['Bacon instead of sausage', C.SAUSAGE.cal - C.BACON.cal],
          ['Grits instead of hashbrowns', C.HASH.cal - C.GRITS.cal],
          ['Wheat toast instead of raisin toast', C.RAISIN.cal - C.WHEAT.cal],
          ['Hold the cheese (per slice)', C.COVERED.cal],
        ])}
        ${p(`Wheat toast also has twice the protein of white toast (${C.WHEAT.protein}g against ${C.WHITE.protein}g) for ${C.WHITE.cal - C.WHEAT.cal} fewer calories. Hashbrowns can be ordered cooked dry, without the usual oil, if you ask; the figures here are for a standard order.`)}` },
      { id: 'lighter-all-star', title: 'How to order a lighter All-Star Special', html: `
        ${p(`The All-Star Special does not have to be the heaviest thing on the table. Choose city ham, sliced tomatoes and wheat toast and it comes to about <strong>${fmt(lightAS.cal)} calories</strong>, compared with ${fmt(heavyAS.cal)} for the version with sausage, hashbrowns and white toast. That is ${fmt(heavyAS.cal - lightAS.cal)} calories less for the same price.`)}
        ${p(`The waffle on its own is ${C.WAFFLE.cal} calories before butter and syrup, so sharing it or taking half home is the next easiest cut. More in our ${a('/blog/waffle-house-all-star-special/', 'All-Star Special guide')}.`)}` },
      { id: 'protein', title: 'Get more protein for your calories', html: `
        ${p('Protein helps a breakfast keep you full. Per 100 calories, these are the most efficient choices:')}
        ${table(['Choice', 'Protein', 'Calories', 'Protein per 100 cal'], [['Grilled chicken', 'CHICKEN'], ['Country ham', 'COHAM'], ['City ham', 'HAM'], ['Pork chops (two)', 'CHOP'], ['T-bone steak', 'TBONE'], ['Two scrambled eggs', 'EGG_TWO']].map(([n, id]) => [n, C[id].protein + 'g', C[id].cal, per100(id) + 'g']))}
        ${p(`Country ham is high in protein but also very salty, at about ${fmt(C.COHAM.sodium)}mg of sodium a slice. See every dish with 20g of protein or more on the ${a('/diet/high-protein/', 'high-protein menu')}.`)}` },
      { id: 'traps', title: 'Orders that add up faster than you think', html: `
        ${p('None of these are off limits, but it helps to know what you are ordering:')}
        ${table(['Item', 'Calories', 'Sodium'], traps.map((t) => [t.name, fmt(t.cal), fmt(t.sodium) + 'mg']))}
        ${ul([
          `Drinks count too: lemonade is about ${C.MMLEMON.cal} calories and sweet tea ${C.TEA.cal}, while unsweet tea, Diet Coke and black coffee are close to zero.`,
          `Toppings add up: sausage gravy adds ${C.COUNTRY.cal} calories to hashbrowns and chili ${C.TOPPED.cal}, while onions (${C.SMOTHERED.cal}) and tomatoes (${C.DICED.cal}) barely register.`,
        ])}` },
    ],
    faqs: [
      ['What is the healthiest breakfast at Waffle House?', `Two scrambled eggs with sliced tomatoes and wheat toast is one of the lightest full plates, at about ${plates[0].cal} calories and ${plates[0].protein}g of protein. Grilled chicken with two eggs and sliced tomatoes gives more protein (${plates[1].protein}g) for about ${plates[1].cal} calories.`],
      ['How many calories are in two scrambled eggs at Waffle House?', `About ${C.EGG_TWO.cal} calories, with ${C.EGG_TWO.protein}g of protein and ${C.EGG_TWO.carbs}g of carbohydrate.`],
      ['Are grits or hashbrowns lower in calories?', `Grits. A regular bowl of grits is about ${C.GRITS.cal} calories and a regular order of hashbrowns about ${C.HASH.cal}. Sliced tomatoes are lighter still, at ${C.TOMATOINSTEAD.cal}.`],
      ['Can you eat low-carb at Waffle House?', `Yes. Eggs, bacon, sausage, steaks, pork chops and grilled chicken have little or no carbohydrate. Two scrambled eggs with bacon and sliced tomatoes come to about ${C.EGG_TWO.carbs + C.BACON.carbs + C.TOMATOINSTEAD.carbs}g of carbs.`],
      ['What should I avoid at Waffle House if I am trying to lose weight?', `Watch the All-Star Special with sausage (about ${fmt(heavyAS.cal)} calories), Texas melts (${B['Texas Sausage Melt'].cal}&ndash;${B['Texas Bacon Cheesesteak Melt'].cal}), country ham biscuits (${B['Country Ham Biscuits (2)'].cal}) and a slice of Triple Chocolate Pie (${B['Triple Chocolate Pie'].cal}).`],
    ],
    related: [
      ['/diet/low-calorie/', 'Low-calorie menu', 'Every dish under 600 calories'],
      ['/diet/high-protein/', 'High-protein menu', 'Every dish with 20g of protein or more'],
      ['/nutrition', 'Nutrition facts', 'Calories, carbs, protein and sodium'],
      ['/waffle-house-dietary-guide/', 'Dietary guide', 'Low-carb, low-sodium and allergy-aware orders'],
    ],
  };
};
