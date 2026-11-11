// Is Waffle House open on Thanksgiving? Hours, menu, pie and holiday plate ideas.
module.exports = (h) => {
  const { byName: B, money, fmt, p, h3, ul, ol, note, table, a, ext } = h;
  const plates = [
    ['Country Ham Dinner', 'Country ham, large hashbrowns and Texas toast'],
    ['T-Bone Dinner', 'A 10-oz T-bone, large hashbrowns and Texas toast'],
    ['Chicken Dinner', 'Grilled chicken, large hashbrowns and Texas toast'],
    ['Pork Chop Dinner', 'Two pork chops, large hashbrowns and Texas toast'],
    ['Southern Pecan Pie', 'A slice of pecan pie'],
  ].map(([n, d]) => [n, d, money(B[n].price), fmt(B[n].cal)]);
  const pie = B['Southern Pecan Pie'], choc = B['Triple Chocolate Pie'];

  return {
    file: 'blog/waffle-house-thanksgiving-hours/index.html',
    url: '/blog/waffle-house-thanksgiving-hours/',
    crumb: 'Thanksgiving Hours',
    title: 'Is Waffle House Open on Thanksgiving 2026? Hours & Menu',
    h1: 'Is Waffle House Open on Thanksgiving? Hours, Menu &amp; Pie',
    description: 'Waffle House is open 24 hours a day, seven days a week, including Thanksgiving. What to expect on the day, what is on the menu and how to plan a visit.',
    eyebrow: 'Hours & Holidays',
    published: '2026-09-30',
    modified: '2026-10-29',
    readMin: 5,
    image: '/assets/blog/waffle-house-thanksgiving-hours-pecan-pie.webp',
    imageAlt: 'A slice of pecan pie and a steaming mug of coffee in a diner booth by a window with autumn trees outside',
    imageTitle: 'Open on Thanksgiving?',
    caption: 'Waffle House stays open around the clock, holidays included.',
    lead: 'If the oven is full, the plans fell through or you are on the road, Waffle House is one of the few places reliably open on Thanksgiving. Here is what to expect on the day, what you can order, and how to make sure your local restaurant is open before you go.',
    quick: {
      html: 'Yes. All of Waffle House&rsquo;s more than 2,000 restaurants are <strong>open 24 hours a day, seven days a week</strong>, and that includes Thanksgiving. The regular menu is served all day. A restaurant can still close for local reasons such as staffing or severe weather, so check the official locator or call ahead if you are driving a long way.',
      stats: [['Thanksgiving', 'Open', 'Regular 24-hour hours'], ['Menu', 'Full menu', 'No special holiday menu'], ['Pie by the slice', money(pie.price), 'Pecan or chocolate'], ['Restaurants', '2,000+', 'In 25 states']],
    },
    sections: [
      { id: 'hours', title: 'Waffle House hours on Thanksgiving', html: `
        ${p('Waffle House restaurants are open 24 hours a day, seven days a week. There are no separate holiday hours: a restaurant that is open at 3 a.m. on a Tuesday is normally open at 3 a.m. on Thanksgiving too.')}
        ${p('The exceptions are local. A restaurant may close for a short time because of staffing, repairs or a storm, which is rare but does happen. If you are planning a special trip, look up the restaurant on the ' + ext('https://locations.wafflehouse.com/', 'official Waffle House locator') + ' and call it.')}
        ${note('Expect it to be busier than a normal weekday, especially around breakfast. Waffle House does not publish wait times, so there is no reliable way to predict how long you will wait.')}` },
      { id: 'menu', title: 'What is on the menu', html: `
        ${p(`The regular menu, all day: waffles, hashbrowns, egg breakfasts, the All-Star Special, Texas melts, burgers and dinners. There is no turkey dinner or special Thanksgiving menu, so plan on the usual favourites. See everything with typical prices on the ${a('/menu', 'full menu')}.`)}
        ${p('If you want something that feels like a holiday plate, the dinners come closest:')}
        ${table(['Order', 'What you get', 'Typical price', 'Calories'], plates, { minw: 'min-w-[600px]' })}` },
      { id: 'pie', title: 'Pie on Thanksgiving', html: `
        ${p(`Waffle House serves two pies by the slice: Southern Pecan Pie (about ${money(pie.price)}, ${pie.cal} calories) and Triple Chocolate Pie (about ${money(choc.price)}, ${choc.cal} calories). Whether a restaurant will sell a whole pie is up to the restaurant, so ask in advance if you want one for the table at home.`)}
        ${p('Both pies list milk, wheat and soy, and the pecan pie also lists egg and tree nuts. See the ' + a('/waffle-house-calories-allergies/', 'allergen chart') + ' for details.')}` },
      { id: 'other-holidays', title: 'Christmas, New Year and other holidays', html: `
        ${p('The same applies to other holidays. Because Waffle House restaurants are open 24 hours a day, seven days a week, they are normally open on Christmas Eve, Christmas Day, New Year&rsquo;s Eve and New Year&rsquo;s Day, with the same local exceptions.')}
        ${p('This round-the-clock reputation is also behind the informal &ldquo;Waffle House Index&rdquo;, which emergency managers have used to judge how hard a storm has hit an area. Read more on the ' + a('/locations', 'locations page') + '.')}` },
      { id: 'plan', title: 'How to plan your visit', html: `
        ${ol([
          'Find the restaurant on the official locator and check it is open.',
          'Go early or late in the day if you want to avoid the busiest stretch.',
          'Order a to-go meal by phone if you would rather eat at home; ask the restaurant about any to-go charges.',
          'Bring your patience and tip your server: holidays are among the busiest days of the year for the crew.',
        ])}` },
    ],
    faqs: [
      ['Is Waffle House open on Thanksgiving Day?', 'Yes. Waffle House restaurants are open 24 hours a day, seven days a week, which includes Thanksgiving. Individual restaurants can occasionally close for local reasons, so check the official locator or call ahead.'],
      ['Are Waffle House hours different on Thanksgiving?', 'No. There are no special holiday hours; restaurants keep their normal 24-hour schedule.'],
      ['Does Waffle House serve turkey on Thanksgiving?', 'There is no turkey dinner or special Thanksgiving menu. The regular menu, including steak, ham, chicken and pork chop dinners, is served all day.'],
      ['Can I get pie at Waffle House on Thanksgiving?', `Yes. Southern Pecan Pie and Triple Chocolate Pie are served by the slice, typically about ${money(pie.price)} each. Ask your restaurant if you want a whole pie.`],
      ['Is Waffle House open on Christmas?', 'Waffle House restaurants are open 24 hours a day, seven days a week, so they are normally open on Christmas Day as well.'],
    ],
    related: [
      ['/locations', 'Waffle House locations', 'The 25 states and how to find your restaurant'],
      ['/menu', 'Full menu with prices', 'Every item with typical prices'],
      ['/blog/waffle-house-all-star-special/', 'All-Star Special', 'Price, what you get and calories'],
      ['/waffle-house-catering/', 'Catering guide', 'Holiday parties and events'],
    ],
  };
};
