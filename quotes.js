// ─────────────────────────────────────────────────────────────────────────────
// quotes.js — Sky quote registry for Clear Skies PWA.
// One quote is picked at random each time the app loads.
// To add more: append to the array below. Nothing else changes.
// ─────────────────────────────────────────────────────────────────────────────

window.SKY_QUOTES = [

  { q: "Space is big. Really big. You just won't believe how vastly, hugely, mind-bogglingly big it is.",
    a: "Douglas Adams" },

  { q: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
    a: "Carl Sagan" },

  { q: "Look up at the stars and not down at your feet.",
    a: "Stephen Hawking" },

  { q: "The most beautiful thing we can experience is the mysterious.",
    a: "Albert Einstein" },

  { q: "Somewhere, something incredible is waiting to be known.",
    a: "Sharon Begley" },

  { q: "That's here. That's home. That's us.",
    a: "Carl Sagan, on the Pale Blue Dot" },

  { q: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood were forged in the hearts of collapsing stars.",
    a: "Carl Sagan" },

  { q: "We are all connected — to each other biologically, to the earth chemically, to the rest of the universe atomically.",
    a: "Neil deGrasse Tyson" },

  { q: "The universe is under no obligation to make sense to you.",
    a: "Neil deGrasse Tyson" },

  { q: "Not only is the universe stranger than we think, it is stranger than we can think.",
    a: "Werner Heisenberg" },

  { q: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    a: "Albert Einstein" },

  { q: "Equipped with his five senses, man explores the universe around him and calls the adventure Science.",
    a: "Edwin Hubble" },

  { q: "The universe is not required to be in perfect harmony with human ambition.",
    a: "Carl Sagan" },

  { q: "In the sky there are always answers and inspirations.",
    a: "Lao Tzu" },

  { q: "There is geometry in the humming of the strings. There is music in the spacing of the spheres.",
    a: "Pythagoras" },

  { q: "To know the mighty works of God; to comprehend His wisdom and majesty and power — surely all this must be a pleasing and acceptable mode of worship.",
    a: "Nicolaus Copernicus" },

  { q: "Dare to look up at the stars.",
    a: "Seneca" },

  { q: "النجوم تضيء في الظلام — The stars shine in the darkness.",
    a: "Arab proverb" },

  { q: "The Milky Way is the backbone of the night.",
    a: "San people of the Kalahari" },

  { q: "Without darkness, stars lose their poetry.",
    a: "Amit Kalantri" },

  { q: "For my part I know nothing with any certainty, but the sight of the stars makes me dream.",
    a: "Vincent van Gogh" },

  { q: "The sky calls to us. If we do not destroy ourselves, we will one day venture to the stars.",
    a: "Carl Sagan" },

  { q: "Knowing that we are kin to the stars is more than enough to make this brief life worth living.",
    a: "Rebecca Elson" },

  { q: "The universe is a pretty big place. If it's just us, it seems like an awful waste of space.",
    a: "Carl Sagan" },

  { q: "Man must rise above the earth — to the top of the atmosphere and beyond — for only thus will he fully understand the world in which he lives.",
    a: "Socrates" },

  { q: "तारा ही आशा है — The star itself is hope.",
    a: "Sanskrit saying" },

  { q: "The sky is the same colour wherever you go.",
    a: "Haruki Murakami" },

  { q: "An unexamined night sky is a night sky wasted.",
    a: "after Socrates" },

  { q: "Life on earth is at ever-increasing risk. I think the human race has no future if it doesn't go into space.",
    a: "Stephen Hawking" },

  { q: "We named the stars before we had words for what we felt beneath them.",
    a: "Arab astronomical tradition" },

  { q: "I would rather live in a world where my life is surrounded by mystery than live in a world so small that my mind could comprehend it.",
    a: "Harry Emerson Fosdick" },

  { q: "The cosmos is also within us — we are a way for the universe to know itself.",
    a: "Carl Sagan" },

];

// Pick one at random each load — stable for the session
window.SKY_QUOTE = window.SKY_QUOTES[
  Math.floor(Math.random() * window.SKY_QUOTES.length)
];
