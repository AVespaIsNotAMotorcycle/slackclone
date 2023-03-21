const NOUNS = [
  { text: 'Mann', gender: 'masc', domains: ['animate'] },
  { text: 'Frau', gender: 'fem', domains: ['animate'] },
  { text: 'Brot', gender: 'neuter', domains: ['food'] },
  { text: 'Katzen', gender: 'plural', domains: ['animate', 'animal'] },
  { text: 'Morgen', gender: 'masc', domains: ['time'] },
  { text: 'Wohnung', gender: 'fem', domains: ['location'] },
  { text: 'Wohnungen', gender: 'plural', domains: ['location'] },
  { text: 'Haus', gender: 'neuter', domains: ['location'] },
  { text: 'Haeuser', gender: 'plural', domains: ['location'] },
  { text: 'Kaffee', gender: 'masc', domains: ['drink'] },
  { text: 'Tee', gender: 'masc', domains: ['drink'] },
  { text: 'Buch', gender: 'neuter', domains: ['literature'] },
];
const VERBS = [
  {
    infinitive: 'sein',
    valencies: [ ['subject'], [] ],
    irregular: true,
    singular: [ 'bin', 'bist', 'ist'],
    plural: [ 'sind', 'seid', 'sind'],
  },
  {
    infinitive: 'haben',
    valencies: [ ['direct'] ],
    irregular: true,
    singular: [ 'habe', 'hast', 'hat'],
    plural: [ 'haben', 'habt', 'haben'],
  },
  {
    infinitive: 'gehen',
    separablePrefix: 'spazieren',
    valencies: [ [] ],
    domains: { subject: ['animate'] },
    verbOfMotion: true,
  },
  {
    infinitive: 'lesen',
    valencies: [ [], ['direct'] ],
    domains: {
      subject: ['animate'],
      direct: ['literature']
    },
    irregular: true,
    singular: [ 'lese', 'liest', 'liest'],
    plural: [ 'lesen', 'lest', 'lesen'],
  },
  {
    infinitive: 'trinken',
    valencies: [ [], ['direct'] ],
    domains: {
      subject: ['animate'],
      direct: ['drink']
    },
  },
  {
    infinitive: 'helfen',
    valencies: [ ['indirect'], [] ],
    irregular: true,
    singular: [ 'helfe', 'hilfst', 'hilft'],
    plural: [ 'helfen', 'helft', 'helfen'],
  },
  {
    infinitive: 'existieren',
    valencies: [ [] ],
  },
];
const REGULAR_VERB_ENDINGS = {
  singular: [ 'e', 'st', 't' ],
  plural: [ 'en', 't', 'en' ],
};
const DEFINITE_ARTICLES = {
  nominative: { masc: 'der', fem: 'die', neuter: 'das', plural: 'die' },
  accusative: { masc: 'den', fem: 'die', neuter: 'das', plural: 'die' },
  dative: { masc: 'dem', fem: 'der', neuter: 'dem', plural: 'den' },
  genitive: { masc: 'des', fem: 'der', neuter: 'des', plural: 'der' },
};
const INDEFINITE_ARTICLES = {
  nominative: { masc: 'ein', fem: 'eine', neuter: 'ein', plural: 'keine' },
  accusative: { masc: 'einen', fem: 'eine', neuter: 'ein', plural: 'keine' },
  dative: { masc: 'einem', fem: 'einer', neuter: 'einem', plural: 'keinen' },
  genitive: { masc: 'eines', fem: 'einer', neuter: 'eines', plural: 'keiner' },
};
const ARTICLE_TYPES = ['definite', 'indefinite', 'none'];

module.exports = {
  NOUNS,
  VERBS,
  REGULAR_VERB_ENDINGS,
  DEFINITE_ARTICLES,
  INDEFINITE_ARTICLES,
  ARTICLE_TYPES,
};
