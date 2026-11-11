// Waffle House Texas melts compared: what is in each, calories, protein, sodium, price, add-ons and breakfast melts.
module.exports = (h) => {
  const { byName: B, components: C, money, fmt, p, h3, ul, ol, note, table, a } = h;
  const names = ['Texas Cheesesteak Melt', 'Texas Bacon Cheesesteak Melt', 'Texas Angus Patty Melt', 'Texas Grilled Chicken Melt', 'Texas Sausage Melt'];
  const melts = names.map((n) => B[n]);
  const byP = [...melts].sort((x, y) => y.protein - x.protein);
  const byCal = [...melts].sort((x, y) => x.cal - y.cal);
  const priced = melts.filter((m) => m.price != null).sort((x, y) => x.price - y.price);
  const bfast = ['Texas Sausage Egg & Cheese Melt', 'Texas Bacon Egg & Cheese Melt'].map((n) => B[n]);
  const addons = [['Jalape&ntilde;os', 'PEPPERED'], ['Grilled mushrooms', 'MUSHROOM'], ['Grilled tomatoes', 'DICED'], ['Extra slice of cheese', 'COVERED'], ['Bacon', 'ADDBACON'], ['Bert&rsquo;s Chili', 'TOPPED']];
  const hb = B['Hashbrowns (Regular)'];

  return {
    file: 'blog/waffle-house-texas-melts/index.html',
    url: '/blog/waffle-house-texas-melts/',
    crumb: 'Texas Melts',
    title: `Waffle House Texas Melts ${h.monthYear()}: Calories & Price`,
    h1: 'Waffle House Texas Melts Compared: Which One Should You Order?',
    description: 'All five Waffle House Texas melts side by side: what is in each, calories, protein, sodium and typical 2026 prices, plus add-ons and the breakfast melts.',
    eyebrow: 'Menu Guide',
    published: '2026-11-05',
    modified: '2026-11-05',
    readMin: 6,
    image: '/assets/blog/waffle-house-texas-melts-compared.webp',
    imageAlt: 'A beef Texas melt on grilled Texas toast with melted American cheese and grilled onions, served with hashbrowns',
    imageTitle: '5 Texas Melts Compared',
    caption: 'Every Texas melt is built on two slices of grilled Texas toast with two slices of cheese.',
    lead: 'The Texas melts are the lunch and dinner side of Waffle House: thick grilled Texas toast, two slices of melted American cheese, grilled onions and a hot filling. There are five to choose from, and they differ more than you might expect in protein, calories and price. Here they are side by side.',
    quick: {
      html: `For the most protein, order the <strong>${byP[0].name}</strong> (${byP[0].protein}g of protein, ${byP[0].cal} calories). For the fewest calories, the <strong>${byCal[0].name}</strong> (${byCal[0].cal}). Most melts typically cost about ${money(B['Texas Cheesesteak Melt'].price)}&ndash;${money(B['Texas Angus Patty Melt'].price)}. The bacon cheesesteak is the priciest at about ${money(B['Texas Bacon Cheesesteak Melt'].price)}.`,
      stats: [['Melts', '5', 'Plus 2 breakfast melts'], ['Most protein', `${byP[0].protein}g`, byP[0].name.replace('Texas ', '')], ['Calories', `${byCal[0].cal}&ndash;${byCal[byCal.length - 1].cal}`, 'Per melt'], ['Typical price', `${money(priced[0].price)}&ndash;${money(priced[priced.length - 1].price)}`, 'Varies by location']],
    },
    sections: [
      { id: 'the-melts', title: 'The five Texas melts', html: melts.map((m) => `
        ${h3(m.name)}
        ${p(m.desc)}
        ${ul([`About <strong>${m.cal} calories</strong>, ${m.protein}g of protein, ${m.carbs}g of carbs and ${fmt(m.sodium)}mg of sodium.`, `Typically about ${money(m.price)}${m.range ? ` (${money(m.range[0])}&ndash;${money(m.range[1])} seen)` : ''}.`])}`).join('') },
      { id: 'compare', title: 'Side by side', html: `
        ${table(['Melt', 'Calories', 'Protein', 'Sodium', 'Typical price'], melts.map((m) => [m.name.replace('Texas ', ''), m.cal, m.protein + 'g', fmt(m.sodium) + 'mg', money(m.price)]))}
        ${ul([
          `<strong>Most protein:</strong> ${byP[0].name} (${byP[0].protein}g), with ${(byP[0].protein / byP[byP.length - 1].protein).toFixed(1)} times the protein of the ${byP[byP.length - 1].name}.`,
          `<strong>Fewest calories:</strong> ${byCal[0].name} (${byCal[0].cal}).`,
          `<strong>Most sodium:</strong> ${[...melts].sort((x, y) => y.sodium - x.sodium)[0].name} (${fmt([...melts].sort((x, y) => y.sodium - x.sodium)[0].sodium)}mg).`,
        ])}
        ${p('All five list milk, wheat and soy, from the cheese and the Texas toast. See every item in the ' + a('/waffle-house-calories-allergies/', 'allergen chart') + '.')}` },
      { id: 'add-ons', title: 'Add-ons and what they change', html: `
        ${p('Melts take the same toppings as hashbrowns and bowls. Add-ons usually cost extra. Here is what each one adds:')}
        ${table(['Add-on', 'Calories', 'Protein', 'Sodium'], addons.map(([n, id]) => [n, '+' + C[id].cal, '+' + C[id].protein + 'g', '+' + fmt(C[id].sodium) + 'mg']))}
        ${p('Jalape&ntilde;os and grilled tomatoes add flavour for almost no calories, though jalape&ntilde;os bring a surprising amount of sodium.')}` },
      { id: 'make-it-a-meal', title: 'Make it a meal', html: `
        ${p(`A melt on its own is a sandwich. Most people add hashbrowns: a regular order adds about ${hb.cal} calories and typically ${money(hb.price)}, so a cheesesteak melt with hashbrowns comes to about ${B['Texas Cheesesteak Melt'].cal + hb.cal} calories and ${money(B['Texas Cheesesteak Melt'].price + hb.price)}.`)}
        ${p(`If you want the melt filling without the toast, the ${a('/menu#cat-lunch-dinner-bowls', 'cheesesteak and chicken melt hashbrown bowls')} put it on a large order of hashbrowns instead (${B['Cheesesteak Melt Hashbrown Bowl'].cal} and ${B['Chicken Melt Hashbrown Bowl'].cal} calories).`)}` },
      { id: 'breakfast-melts', title: 'The breakfast melts', html: `
        ${p('At breakfast, two Texas melts swap the grilled filling for eggs and breakfast meat:')}
        ${table(['Breakfast melt', 'Calories', 'Protein', 'Typical price'], bfast.map((m) => [m.name, m.cal, m.protein + 'g', money(m.price)]))}
        ${p(`Each has one egg, two slices of cheese and either two sausage patties or three slices of bacon on Texas toast. See more on the ${a('/menu#cat-breakfast-sandwiches', 'breakfast sandwiches menu')}.`)}` },
    ],
    faqs: [
      ['What Texas melts does Waffle House have?', 'Five: the Texas Cheesesteak Melt, Texas Bacon Cheesesteak Melt, Texas Angus Patty Melt, Texas Grilled Chicken Melt and Texas Sausage Melt. Breakfast also has Texas sausage and bacon egg and cheese melts.'],
      ['Which Waffle House melt has the most protein?', `The ${byP[0].name}, with about ${byP[0].protein}g of protein and ${byP[0].cal} calories.`],
      ['How many calories are in a Waffle House Texas melt?', `Between about ${byCal[0].cal} (${byCal[0].name}) and ${byCal[byCal.length - 1].cal} (${byCal[byCal.length - 1].name}), before hashbrowns or toppings.`],
      ['How much is a Texas melt at Waffle House?', `Most melts typically cost about ${money(B['Texas Cheesesteak Melt'].price)} to ${money(B['Texas Angus Patty Melt'].price)}. The Texas Bacon Cheesesteak Melt is about ${money(B['Texas Bacon Cheesesteak Melt'].price)}. Prices vary by location.`],
      ['What comes on a Waffle House Texas melt?', 'Every Texas melt has two slices of grilled Texas toast, two slices of melted American cheese and grilled onions, plus its filling: cheesesteak, an Angus patty, grilled chicken or a sausage patty.'],
    ],
    related: [
      ['/menu#cat-texas-melts', 'Texas melts on the menu', 'Prices and full nutrition'],
      ['/blog/waffle-house-hash-browns/', 'Hashbrowns guide', 'Sizes, toppings and lingo'],
      ['/diet/high-protein/', 'High-protein menu', 'Every dish with 20g of protein or more'],
      ['/blog/waffle-house-secret-menu-items/', 'Secret menu orders', 'Custom orders to ask for'],
    ],
  };
};
