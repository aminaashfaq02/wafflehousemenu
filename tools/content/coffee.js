// Waffle House coffee: who roasts it, the three blends, price, calories and ordering.
module.exports = (h) => {
  const { byName: B, components: C, money, fmt, p, h3, ul, ol, note, table, a } = h;
  const coffee = B.Coffee;
  const pairs = [['Classic Waffle', 'Classic waffle'], ['Two Egg Breakfast', 'Two egg breakfast'], ['Grilled Biscuit', 'Grilled biscuit'], ['Southern Pecan Pie', 'Slice of pecan pie']].map(([n, l]) => [l, money(B[n].price + coffee.price), fmt(B[n].cal + coffee.cal)]);
  const drinks = ['Coffee', "Alice's Iced Tea (Unsweet)", "Alice's Iced Tea (Sweet)", 'Coca-Cola', 'Orange Juice (9-oz)', 'Milk (9-oz)'].map((n) => [n, money(B[n].price), B[n].cal]);

  return {
    file: 'blog/waffle-house-coffee/index.html',
    url: '/blog/waffle-house-coffee/',
    crumb: 'Waffle House Coffee',
    title: 'What Coffee Does Waffle House Use? Brand, Blends & Price',
    h1: 'What Coffee Does Waffle House Use? The Brand, the Blends and the Price',
    description: 'Waffle House coffee is roasted by Royal Cup in Birmingham, Alabama. The three blends, what a cup costs in 2026, calories and how it compares with other drinks.',
    eyebrow: 'Drinks',
    published: '2026-11-05',
    modified: '2026-11-05',
    readMin: 5,
    image: '/assets/blog/waffle-house-coffee-diner-mug.webp',
    imageAlt: 'A steaming white diner mug of black coffee on a saucer with roasted coffee beans on a wooden counter',
    imageTitle: 'The Coffee Behind the Cup',
    caption: 'A cup of coffee is one of the lowest-priced things on the menu.',
    lead: 'Coffee is the quiet constant at Waffle House: it is on the table at breakfast, at lunch and at three in the morning. If you have ever wondered who makes it, which blends there are and what a cup costs, here is everything worth knowing.',
    quick: {
      heading: 'The short answer',
      html: `Waffle House coffee is roasted by <strong>Royal Cup Coffee &amp; Tea</strong> of Birmingham, Alabama, which has supplied the chain since the 1970s. It is made from 100% Arabica beans grown in Central and South America and comes in three versions: <strong>Classic Blend</strong>, <strong>Specialty Dark Roast</strong> and <strong>Premium Decaf</strong>. A cup typically costs about <strong>${money(coffee.price)}</strong>.`,
      stats: [['Roaster', 'Royal Cup', 'Birmingham, Alabama'], ['Beans', '100% Arabica', 'Central & South America'], ['Typical price', money(coffee.price), `${money(coffee.range[0])}&ndash;${money(coffee.range[1])} seen`], ['Black coffee', `${coffee.cal} cal`, 'Before cream and sugar']],
    },
    sections: [
      { id: 'who-makes-it', title: 'Who makes Waffle House coffee', html: `
        ${p('Waffle House coffee comes from Royal Cup Coffee &amp; Tea, a family-owned roaster founded in 1896 and based in Birmingham, Alabama. The two companies have worked together since the 1970s, and Royal Cup roasts the beans before they are shipped to restaurants and brewed on site.')}
        ${p('The beans are 100% Arabica, grown on farms in Central and South America. Arabica is the species most specialty coffee is made from, generally smoother and less bitter than the Robusta used in many cheaper blends.')}` },
      { id: 'blends', title: 'The three blends', html: `
        ${table(['Blend', 'What to expect'], [
          ['Classic Blend', 'The standard cup most restaurants pour: a medium roast meant to go with everything from waffles to steak.'],
          ['Specialty Dark Roast', 'A darker roast with a stronger, roastier flavour for people who like their coffee bold.'],
          ['Premium Decaf', 'Decaffeinated coffee for late-night visits.'],
        ], { minw: 'min-w-[480px]' })}
        ${p('Ask your server which blends are brewing. Hot tea is also on the menu if you would rather skip the coffee.')}` },
      { id: 'price', title: 'How much a cup costs', html: `
        ${p(`A cup of coffee typically costs about <strong>${money(coffee.price)}</strong>, and published 2026 price lists show it from ${money(coffee.range[0])} to ${money(coffee.range[1])} depending on the restaurant. Waffle House does not publish a refill policy, so ask your server how refills work at your restaurant.`)}
        ${p('Here is how it compares with the other drinks on the menu:')}
        ${table(['Drink', 'Typical price', 'Calories'], drinks)}
        ${p(`Prices vary by location; see ${a('/prices-by-state', 'prices by state')} for the ranges.`)}` },
      { id: 'calories', title: 'Calories and caffeine', html: `
        ${p(`A cup of black coffee has about ${coffee.cal} calories. Cream, half-and-half and sugar add to that, depending on how much you use. Waffle House does not publish the caffeine content of its coffee, but as a general guide, an 8-ounce cup of brewed coffee has around 95 milligrams of caffeine, and decaf has very little.`)}
        ${note('If you are watching calories, black coffee and unsweet iced tea are the two drinks with next to none.')}` },
      { id: 'pairings', title: 'Coffee and a bite: what it costs', html: `
        ${p('A coffee with something small makes one of the cheapest stops on the menu:')}
        ${table(['Coffee plus', 'Typical total', 'Calories'], pairs)}
        ${p(`For a full meal, the ${a('/blog/waffle-house-all-star-special/', 'All-Star Special')} with coffee comes to about ${money(B['All-Star Special with Bacon'].price + coffee.price)}. See more budgets in ${a('/blog/waffle-house-menu-with-prices/', 'what a meal costs')}.`)}` },
      { id: 'take-home', title: 'Can you buy Waffle House coffee?', html: `
        ${p('The merchandise section of the official Waffle House website is the place to check for take-home items. In summer 2025, a canned cold brew made from the Classic Blend was sold for a limited time at selected restaurants in Atlanta.')}` },
    ],
    faqs: [
      ['What brand of coffee does Waffle House use?', 'Waffle House coffee is roasted by Royal Cup Coffee &amp; Tea, a family-owned company in Birmingham, Alabama, which has supplied the chain since the 1970s.'],
      ['Is Waffle House coffee 100% Arabica?', 'Yes. It is made from 100% Arabica beans grown in Central and South America.'],
      ['How much is a cup of coffee at Waffle House?', `A cup typically costs about ${money(coffee.price)}, and published price lists show it from ${money(coffee.range[0])} to ${money(coffee.range[1])}.`],
      ['Does Waffle House have decaf coffee?', 'Yes. Premium Decaf is one of the three versions on the menu, alongside the Classic Blend and the Specialty Dark Roast.'],
      ['How many calories are in Waffle House coffee?', `A cup of black coffee has about ${coffee.cal} calories, before cream and sugar.`],
    ],
    related: [
      ['/menu#cat-beverages', 'Drinks on the menu', 'Every drink with typical prices and calories'],
      ['/blog/waffle-house-menu-with-prices/', 'What a meal costs', 'Breakfast, lunch and dinner budgets'],
      ['/blog/waffle-house-all-star-special/', 'All-Star Special', 'Price, what you get and calories'],
      ['/nutrition', 'Nutrition facts', 'Calories and macros by category'],
    ],
  };
};
