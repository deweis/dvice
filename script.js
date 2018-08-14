const quotes = [// Thank you freeCodeCamp.org for most of the quotes in here!
  { author: 'Jonathan Swift',
    quote: 'May you live every day of your life', },
  { author: 'George Bernard Shaw',
    quote: 'Life isn\'t about finding yourself. Life is about creating yourself.', },
  { author: 'Ernest Hemingway',
    quote: 'There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self.', },
  { author: 'C. S. Lewis',
    quote: 'We are what we believe we are.', },
  { author: 'Thomas A. Edison',
    quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.', },
  { author: 'Franklin D. Roosevelt',
    quote: 'The only limit to our realization of tomorrow, will be our doubts of today.', },
  { author: 'Confucius',
    quote: 'We have two lives, and the second begins when we realize we only have one.', },
  { author: 'Mario Quintana',
    quote: 'Don\'t waste your time chasing butterflies. Mend your garden, and the butterflies will come.', },
  { author: 'Edith Wharton',
    quote: 'There are two ways of spreading light: to be the candle or the mirror that reflects it.', },
  { author: 'Charles Darwin',
    quote: 'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.', },
  { author: 'Leonardo da Vinci',
    quote: 'Learning never exhausts the mind.', },
  { author: 'Rob Siltanen',
    quote: 'People who are crazy enough to think they can change the world, are the ones who actually do.', },
  { author: 'Ghandi',
    quote: 'Be the change you wish to see in the world.', },
  { author: 'Jacque Fresco',
    quote: 'If you think we can\'t change the world, it just means you\'re not one of those that will.', },
  { author: 'Rumi',
    quote: 'Forget safety. Live where you fear to live. Destroy your reputation. Be notorious.', },
  { author: 'Arthur Ashe',
    quote: 'Start where you are. Use what you have. Do what you can.', },
  { author: 'Bruce Lee',
    quote: 'Be happy, but never satisfied.', },
  { author: 'Nelson Mandela',
    quote: 'A good head and a good heart are always a formidable combination.', },
  { author: 'Susan B. Anthony',
    quote: 'Independence is happiness.', },
  { author: 'John Greenleaf Whittier',
    quote: 'Of all the sad words of tongue or pen, the saddest are these: "It might have been."', },
  { author: 'John C. Maxwell',
    quote: 'A leader is one who knows the way, goes the way, and shows the way.', },
  { author: 'Salvador Dalí',
    quote: 'Have no fear of perfection - you\'ll never reach it.', },
  { author: 'Will Rodgers',
    quote: 'Don\'t let yesterday take up too much of today.', },
  { author: 'W. Clement Stone',
    quote: 'Aim for the moon. If you miss, you may hit a star.', },
  { author: 'Henry Ford',
    quote: 'Failure is simply the opportunity to begin again, this time more intelligently.', },
  { author: 'APJ Abdul Kalam',
    quote: 'Let us sacrifice our today so that our children can have a better tomorrow.', },
  { author: 'Paulo Coelho',
    quote: 'There is only one thing that makes a dream impossible to achieve: the fear of failure.', },
  { author: 'Jim Kwik',
    quote: 'If an egg is broken by an outside force, life ends. If broken by an inside force, life begins. Great things always begin from the inside.', },
  { author: 'Audrey Hepburn',
    quote: 'Nothing is impossible, the word itself says "I\'m possible"!', },
];

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * Thanks to: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let index = getRandomInt(0, quotes.length - 1);

document.getElementById('quote').innerHTML = `
  <blockquote>&bdquo;${quotes[index].quote}&ldquo;
    <footer><em>- ${quotes[index].author}</em></footer>
  </blockquote>
`;
