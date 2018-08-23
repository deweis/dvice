/* https://developers.google.com/web/fundamentals/primers/service-workers/ */

// if ('serviceWorker' in navigator) {
//
//   // delay registration until after the load event fires on window
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/sw.js').then(function (registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function (err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

const quotes = [// Thank you freeCodeCamp.org for most of the quotes in here!
  { author: 'Jonathan Swift',
    quote: 'May you live every day of your life.', },
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
    quote: 'Of all the sad words of tongue or pen, the saddest are these: \'It might have been.\'', },
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
    quote: 'Nothing is impossible, the word itself says "I\'m possible\"!', },
  { author: 'George Bernard Shaw',
    quote: 'A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.', },
  { author: 'Dr. Seuss',
    quote: 'If things start happening, don\'t worry, don\'t stew, just go right along and you\'ll start happening too.', },
  { author: 'Gordon B. Hinckley',
    quote: 'Without hard work, nothing grows but weeds.', },
  { author: 'William Shakespeare',
    quote: 'Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them.', },
  { author: 'Alan Watts',
    quote: 'You\'re under no obligation to be the same person you were 5 minutes ago.', },
  { author: 'Alan Kay',
    quote: 'The best way to predict the future is to invent it.', },
  { author: 'JJ Watts',
    quote: 'Success isn\'t owned. It is leased, and rent is due everyday.', },
  { author: 'Anaïs Nin',
    quote: 'Life shrinks or expands in proportion with one\'s courage.', },
  { author: 'Theodore Roosevelt',
    quote: 'Believe you can and you\'re halfway there.', },
  { author: 'Chinese Proverb',
    quote: 'All things are difficult before they are easy.', },
  { author: 'Albert Einstein',
    quote: 'Your imagination is your preview of life\'s coming attractions.', },
  { author: 'Charles R. Swindoll',
    quote: 'Life is 10% what happens to you and 90% how you react to it.', },
  { author: 'Juliette Gordon Low',
    quote: 'The work of today is the history of tomorrow, and we are its makers.', },
  { author: 'Albert Einstein',
    quote: 'Creativity is intelligence having fun.', },
  { author: 'Confucius',
    quote: 'The man who asks a question is a fool for a minute, the man who does not ask is a fool for life.', },
  { author: 'Stephen King',
    quote: 'You can, you should, and if you\'re brave enough to start, you will.', },
  { author: 'Steve Jobs',
    quote: 'If you are working on something that you really care about, you don\'t have to be pushed. The vision pulls you.', },
  { author: 'Albert Einstein',
    quote: 'I have no special talents. I am only passionately curious.', },
  { author: 'C.S. Lewis',
    quote: 'You are never too old to set another goal, or to dream a new dream.', },
  { author: 'Nelson Mandela',
    quote: 'A winner is a dreamer who never gives up.', },
  { author: 'Erica Jong',
    quote: 'If you don\'t risk anything, you risk even more.', },
  { author: 'Chinese Proverb',
    quote: 'The best time to plant a tree was 20 years ago. The second best time is now.', },
  { author: 'Mahatma Gandhi',
    quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', },
  { author: 'Aldous Huxley',
    quote: 'There is only one corner of the universe you can be certain of improving, and that\'s your own self.', },
  { author: 'Denise Brennan-Nelson',
    quote: 'Someday is not a day of the week.', },
];

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * Thanks to: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomQuote() {
  const index = getRandomInt(0, quotes.length - 1);
  const quote = `
    <blockquote>&bdquo;${quotes[index].quote}&ldquo;
      <footer><em>– ${quotes[index].author}</em></footer>
    </blockquote>
  `;
  return quote;
};

function setQuote() {
  document.getElementById('quote').innerHTML = getRandomQuote();
};

setQuote();

let quoteInterval = setInterval(setQuote, 10000);

/* Get a new quote upon user click and restart the interval */
document.getElementById('quote').addEventListener('click', function () {
  clearInterval(quoteInterval);
  setQuote();
  quoteInterval = setInterval(setQuote, 10000);
});
