// What a meal at Waffle House costs in 2026: meal budgets, category price ranges, cheapest and priciest items.
module.exports = (h) => {
  const { byName: B, categories, items, money, fmt, p, h3, ul, note, table, a } = h;
  const priced = items.filter((i) => i.price != null);
  const coffee = B.Coffee.price;
  const meal = (names) => names.reduce((s, n) => s + B[n].price, 0);
  const budgets = [
    ['Quick breakfast', ['Two Egg Breakfast', 'Coffee']],
    ['Full breakfast', ['All-Star Special with Bacon', 'Coffee']],
    ['Lunch melt and hashbrowns', ['Texas Cheesesteak Melt', 'Hashbrowns (Regular)', "Alice's Iced Tea (Sweet)"]],
    ['Hashbrown bowl and a drink', ['Sausage Egg & Cheese Hashbrown Bowl', 'Coca-Cola']],
    ['Steak dinner', ['T-Bone Dinner', "Alice's Iced Tea (Sweet)"]],
    ['Late-night waffle', ['Classic Waffle', 'Coffee']],
  ].map(([n, list]) => [n, list.join(' + ').replace(/ \(Regular\)| \(Sweet\)/g, ''), money(meal(list))]);
  const family = meal(['All-Star Special with Bacon', 'All-Star Special with Sausage', 'Two Egg Breakfast', 'Two Egg Breakfast']) + 2 * coffee + 2 * B['Milk (9-oz)'].price;
  const catRows = categories.filter((c) => c.items.some((i) => i.price != null)).map((c) => {
    const ps = c.items.filter((i) => i.price != null).map((i) => i.price);
    return [c.title, ps.length > 1 ? `${money(Math.min(...ps))} &ndash; ${money(Math.max(...ps))}` : money(ps[0])];
  });
  const cheap = [...priced].filter((i) => i.category !== 'cat-beverages').sort((a, b) => a.price - b.price).slice(0, 6);
  const dear = [...priced].sort((a, b) => b.price - a.price).slice(0, 5);
  const allstar = B['All-Star Special with Bacon'];

  return {
    file: 'blog/waffle-house-menu-with-prices/index.html',
    url: '/blog/waffle-house-menu-with-prices/',
    crumb: 'What a Meal Costs',
    title: `Waffle House Meal Prices ${h.monthYear()}: What a Meal Costs`,
    h1: 'Waffle House Menu Prices: What a Meal Costs in 2026',
    description: `What a meal at Waffle House costs in 2026: breakfast, lunch, dinner and late-night budgets, a family bill, price ranges and the cheapest orders.`,
    eyebrow: 'Menu & Prices',
    published: '2026-10-06',
    modified: '2026-10-30',
    readMin: 6,
    image: '/assets/blog/waffle-house-menu-prices-meal-cost.webp',
    imageAlt: 'A diner table with a Texas melt, hashbrowns, a waffle and coffee next to a guest check and cash',
    imageTitle: 'What a Meal Costs',
    caption: 'Most Waffle House meals land between about $8 and $20 a person, before tax and tip.',
    lead: `The full menu tells you what each item costs. This guide answers the question most people have: how much will I spend? Using typical 2026 prices, here is what a breakfast, lunch, dinner or late-night stop usually comes to, what a family of four pays, and where the best value is.`,
    quick: {
      html: `Expect to pay about <strong>${budgets[0][2]}</strong> for a two egg breakfast with coffee and about <strong>${budgets[1][2]}</strong> for the All-Star Special with coffee. Lunch with a Texas melt runs about ${budgets[2][2]}, and a T-bone dinner with a drink about ${budgets[4][2]}. Tax and tip are extra, and prices vary by location.`,
      stats: [['Breakfast for one', budgets[0][2], 'Two eggs + coffee'], ['All-Star + coffee', budgets[1][2], 'Typical price'], ['Family of four', `~${money(family)}`, 'Before tax and tip'], ['Lowest-priced item', money(cheap[0].price), cheap[0].name]],
    },
    sections: [
      { id: 'meal-budgets', title: 'What a meal costs, by occasion', html: `
        ${p('These budgets use typical prices for each item. Your restaurant charges a little more or less.')}
        ${table(['Meal', 'What you order', 'Typical total'], budgets, { minw: 'min-w-[560px]' })}
        ${p(`The All-Star Special is the best-value full breakfast: ordered separately, the same eggs, bacon, toast, side and waffle cost about ${money(B['Two Egg Breakfast with Bacon'].price + B['Classic Waffle'].price)}, against about ${money(allstar.price)} for the combo. More in our ${a('/blog/waffle-house-all-star-special/', 'All-Star Special guide')}.`)}` },
      { id: 'family', title: 'What a family of four pays', html: `
        ${p(`Two adults ordering the All-Star Special (one with bacon, one with sausage), two children sharing two egg breakfasts, two coffees and two milks come to about <strong>${money(family)}</strong> before tax and tip. Swapping the All-Stars for two egg breakfasts would bring it down to about ${money(meal(['Two Egg Breakfast', 'Two Egg Breakfast', 'Two Egg Breakfast', 'Two Egg Breakfast']) + 2 * coffee + 2 * B['Milk (9-oz)'].price)}.`)}
        ${note('Waffle House does not list a separate kids&rsquo; menu on its nutrition pages, so this example uses regular menu items.')}` },
      { id: 'price-ranges', title: 'Typical prices by menu section', html: `
        ${p('Within each section, these are the lowest and highest typical prices:')}
        ${table(['Menu section', 'Typical price range'], catRows)}
        ${p(`For every item, see the ${a('/menu', 'full menu with prices')}, and for how prices change from place to place, see ${a('/prices-by-state', 'prices by state')}.`)}` },
      { id: 'cheapest', title: 'The cheapest things to order', html: `
        ${table(['Item', 'Typical price', 'Calories'], cheap.map((i) => [i.name, money(i.price), i.cal]))}
        ${p(`For a full plate, the two egg breakfast at about ${money(B['Two Egg Breakfast'].price)} is the lowest-priced option, and the biscuits give the most calories for the money. See more ways to save on the ${a('/coupons', 'coupons and deals')} page.`)}` },
      { id: 'priciest', title: 'The most expensive items', html: `
        ${table(['Item', 'Typical price'], dear.map((i) => [i.name, money(i.price)]))}
        ${p('Steak dinners and the All-Star Special top the menu, but even the most expensive plate stays under $20 at typical prices.')}` },
      { id: 'tax-and-tip', title: 'Tax, tips and why your bill differs', html: `
        ${ul([
          'Menu prices do not include sales tax, which is added at the register and differs by state and city.',
          'Waffle House is a table-service restaurant, so leaving a tip for your server is customary in the US.',
          'Restaurants near highways, airports and in bigger cities often charge a little more than the typical prices shown here.',
          'Toppings, extra eggs, cheese and upgraded waffles all add to the bill. Each hashbrown topping usually adds about ' + money(h.toppingPrice) + '.',
        ])}` },
    ],
    faqs: [
      ['How much does it cost to eat at Waffle House?', `Most meals cost about $8 to $20 per person before tax and tip. A two egg breakfast with coffee is about ${budgets[0][2]}, and the All-Star Special with coffee about ${budgets[1][2]}.`],
      ['What is the cheapest meal at Waffle House?', `The two egg breakfast, at about ${money(B['Two Egg Breakfast'].price)}, is the lowest-priced full plate. For a snack, a grilled biscuit or a side of toast is about ${money(B['Grilled Biscuit'].price)}.`],
      ['What is the most expensive item at Waffle House?', `The T-Bone Dinner, at about ${money(B['T-Bone Dinner'].price)}, is the highest-priced item at typical prices.`],
      ['How much is coffee at Waffle House?', `A cup of coffee is typically about ${money(coffee)}.`],
      ['Do Waffle House prices include tax?', 'No. Sales tax is added at the register, and the rate depends on the state and city.'],
    ],
    related: [
      ['/menu', 'Full menu with prices', 'Every item, typical prices and nutrition'],
      ['/prices-by-state', 'Prices by state', 'Typical prices and price ranges'],
      ['/blog/waffle-house-all-star-special/', 'All-Star Special', 'Price, what you get and calories'],
      ['/coupons', 'Ways to save', 'Regulars Club and money-saving orders'],
    ],
  };
};
