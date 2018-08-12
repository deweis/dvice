const quotes = [
  { author: 'Jonathan Swift',
    quote: 'May you live every day of your life', },
  { author: 'George Bernard Shaw',
    quote: 'Life isn\'t about finding yourself. Life is about creating yourself.', },
  { author: 'Ernest Hemingway',
    quote: 'There is nothing noble in being superior to your fellow person; true nobility is being superior to your former self.', },
  { author: 'C. S. Lewis',
    quote: 'We are what we believe we are.', },
  { author: 'Thomas A. Edison',
    quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.', },
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
