// The Waffle House Index: what it is, the three levels, where it came from and what it means for diners.
module.exports = (h) => {
  const { byName: B, money, p, h3, ul, ol, note, table, a } = h;
  return {
    file: 'blog/waffle-house-index/index.html',
    url: '/blog/waffle-house-index/',
    crumb: 'Waffle House Index',
    title: 'The Waffle House Index Explained: Green, Yellow & Red',
    h1: 'The Waffle House Index Explained: What Green, Yellow and Red Mean',
    description: 'The Waffle House Index judges storm damage by whether Waffle House is open. What green, yellow and red mean, where it came from and what it means for you.',
    eyebrow: 'Diner Culture',
    published: '2026-11-05',
    modified: '2026-11-05',
    readMin: 5,
    image: '/assets/blog/waffle-house-index-green-yellow-red-storm.webp',
    imageAlt: 'A roadside diner with its lights on during a hurricane at night, with green, yellow and red lights for the three index levels',
    imageTitle: 'Green, Yellow, Red',
    caption: 'The index rests on one simple fact: these restaurants are almost always open.',
    lead: 'Most restaurants close when a hurricane is on the way. Waffle House is famous for doing the opposite, and the habit turned into one of the more unusual tools in American disaster response. Here is what the Waffle House Index is, what its three colors mean, where it came from and why it works.',
    quick: {
      html: 'The Waffle House Index is an <strong>informal measure of how hard a storm has hit an area</strong>, based on whether the local Waffle House is open. <strong>Green</strong> means a full menu, <strong>yellow</strong> a limited menu, and <strong>red</strong> means the restaurant is closed, which signals serious damage. It was coined in 2004 by Craig Fugate, then Florida&rsquo;s emergency management director and later head of FEMA.',
      stats: [['Green', 'Full menu', 'Little or no damage'], ['Yellow', 'Limited menu', 'Power or supplies short'], ['Red', 'Closed', 'Severe damage'], ['Coined', '2004', 'After Hurricane Charley']],
    },
    sections: [
      { id: 'what-it-is', title: 'What the Waffle House Index is', html: `
        ${p('Waffle House restaurants are open 24 hours a day, seven days a week, and the chain has a reputation for staying open through bad weather or reopening quickly afterwards. So the state of the local restaurant works as shorthand for the state of the area around it.')}
        ${p('If the Waffle House is serving its full menu, the neighbourhood likely has power and came through well. If it is open with a short menu, things are strained. If it is closed, something is badly wrong. Emergency managers have used this logic as a quick, informal check alongside their formal data.')}` },
      { id: 'levels', title: 'The three levels', html: `
        ${table(['Level', 'At the restaurant', 'What it suggests'], [
          ['<span class="text-emerald-800">Green</span>', 'Open with the full menu', 'Power is on and damage is light or absent.'],
          ['<span class="text-amber-800">Yellow</span>', 'Open with a limited menu', 'Power is off or on a generator, or food supplies are running low.'],
          ['<span class="text-rose-800">Red</span>', 'Closed', 'Severe damage, flooding or other destruction in the area.'],
        ], { minw: 'min-w-[560px]' })}
        ${p('Because restaurants keep a cut-down menu for when the power is out or deliveries cannot get through, a red reading is rare, which is exactly why it is taken seriously when it happens.')}` },
      { id: 'history', title: 'Where it came from', html: `
        ${p('The index was coined in August 2004, after Hurricane Charley hit Florida. Craig Fugate, who was leading the Florida Division of Emergency Management, and members of his team noticed the status of Waffle House restaurants lined up closely with how badly an area had been hit.')}
        ${p('Fugate went on to lead the Federal Emergency Management Agency, and the idea went with him. After the Joplin, Missouri, tornado in 2011, the two Waffle House restaurants in Joplin stayed open, a moment which helped make the index widely known. Journalists had noticed the same pattern after Hurricane Katrina in 2005, when Waffle House restaurants served as rough markers of how far the destruction reached.')}` },
      { id: 'why-it-works', title: 'Why it works', html: `
        ${ul([
          '<strong>The restaurants are almost always open</strong>, so a closure stands out.',
          '<strong>They are everywhere in storm country.</strong> Most of the chain&rsquo;s more than 2,000 restaurants are in the South, where hurricanes and tornadoes hit most often.',
          '<strong>The chain plans for storms.</strong> Restaurants keep a limited menu for when there is no power or few supplies, and teams are sent in after a disaster to reopen restaurants quickly.',
          '<strong>It is simple.</strong> Anyone understands green, yellow and red, which makes it a useful shorthand when formal reports are still coming in.',
        ])}
        ${note('The index is informal. It is not an official government scale, and it sits alongside formal measures such as wind speed, rainfall and damage surveys rather than replacing them.')}` },
      { id: 'for-diners', title: 'What it means if you are eating out during a storm', html: `
        ${ol([
          'Call ahead or check the ' + a('/locations', 'locations page') + ' before driving to a restaurant in bad weather.',
          'Expect a shorter menu if the power is out or deliveries have not arrived.',
          'Bring cash in case card machines are down, and be patient with a crew working long shifts.',
          'Follow official emergency instructions first: no meal is worth driving through a storm warning.',
        ])}
        ${p(`On a normal day, a classic waffle is about ${money(B['Classic Waffle'].price)} and a cup of coffee about ${money(B.Coffee.price)}. See the ${a('/menu', 'full menu')} for more.`)}` },
    ],
    faqs: [
      ['What is the Waffle House Index?', 'An informal way of judging how badly a storm has hit an area, based on whether the local Waffle House is open with a full menu (green), open with a limited menu (yellow) or closed (red).'],
      ['Who created the Waffle House Index?', 'Craig Fugate coined it in 2004, after Hurricane Charley, while he was leading the Florida Division of Emergency Management. He later led FEMA.'],
      ['Does FEMA use the Waffle House Index?', 'Yes, informally. It is not an official FEMA scale, but it has been used as a quick check on conditions after storms, alongside formal data.'],
      ['What does a red Waffle House Index mean?', 'Red means the restaurant is closed, which suggests severe damage, flooding or destruction in the area.'],
      ['Why does Waffle House stay open during hurricanes?', 'Its restaurants are open 24 hours a day, and the chain plans for storms with a limited menu for when power or supplies run short and teams who help restaurants reopen quickly.'],
    ],
    related: [
      ['/locations', 'Waffle House locations', 'The 25 states and how to find a restaurant'],
      ['/blog/waffle-house-thanksgiving-hours/', 'Holiday hours', 'Open on Thanksgiving, Christmas and more'],
      ['/blog/waffle-house-coffee/', 'Waffle House coffee', 'Who roasts it and what a cup costs'],
      ['/about', 'About Waffle Guide', 'Who we are and how we work'],
    ],
  };
};
