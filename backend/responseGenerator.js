/*
response:
    sentence
    sentence response

sentence:
    independent_clause
    independent_clause coordinating_conjunction sentence
    independent_clause dependent_clause

dependent_clause:
    subordinating_conjunction subject predicate finite_verb

independent_clause:
    subject finite_verb predicate
    dependent_clause , finite_verb subject predicate
*/

function coinflip() { return Math.floor(Math.random() * 2); }

function randomElement(array, weighted = true) {
  if (!weighted) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }
  let index = 0;
  while (index < array.length - 1) {
    if (coinflip()) { return array[index]; }
    index += 1;
  }
  return array[index];
}

function getNounNumber(noun) {
  if (noun.gender === 'plural') return 'plural';
  return 'singular';
}

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

function fetchNounByDomains(domain) {
  if (!domain) { return randomElement(NOUNS); }
  let iteration = 0;
  while (iteration < 100) {
    const noun = randomElement(NOUNS, false);
    const nounDomain = (noun.domains ? noun.domains : []);
    const intersection = nounDomain.filter((dom) => (domain.includes(dom)));
    if (intersection.length) {
      return noun;
    }
    iteration += 1;
  }
  return randomElement(NOUNS);
}

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
function generateArticle(noun, nounCase) {
  let text = '';
  const prunedTypes = (nounCase !== 'nominative'
    ? ARTICLE_TYPES.slice(0,3)
    : ARTICLE_TYPES
  );
  const type = randomElement(ARTICLE_TYPES);
  if (type === 'definite') {
    text = DEFINITE_ARTICLES[nounCase][noun.gender];
  }
  if (type === 'indefinite') {
    text = INDEFINITE_ARTICLES[nounCase][noun.gender];
  }
  return { text, type };
}

const REGULAR_VERB_ENDINGS = {
  singular: [ 'e', 'st', 't' ],
  plural: [ 'en', 't', 'en' ],
};
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

function fetchVerbByDomains(domain, role = 'subject') {
  if (!domain) { return randomElement(VERBS); }
  let iteration = 0;
  while (iteration < 100) {
    const verb = randomElement(VERBS, false);
    const hasDomain = verb.domains;
    const hasDomainAndRole = (hasDomain && verb.domains[role]);
    let intersection = [];
    if (hasDomainAndRole) {
      const verbDomain = verb.domains[role];
      intersection = verbDomain.filter((dom) => (domain.includes(dom)));
    }
    if (intersection.length || !hasDomain) {
      return verb;
    }
    iteration += 1;
  }
  return randomElement(VERBS);
}

function conjugateVerb(verb, number = 'singular', person = 3) {
  if (verb.irregular) { return verb[number][person - 1] }
  let stem = verb.infinitive;
  if (stem.slice(-1) === 'n') { stem = stem.slice(0, stem.length - 1); }
  if (stem.slice(-1) === 'e') { stem = stem.slice(0, stem.length - 1); }
  const ending = REGULAR_VERB_ENDINGS[number][person - 1];
  return stem.concat(ending);
}

function generateNounPhrase(noun, nounCase = 'nominative') {
  const article = generateArticle(noun, nounCase);
  
  let declinedNoun = noun.text;
  if (nounCase === 'genitive') {
    if (noun.gender === 'masc' || noun.gender === 'neuter') {
      declinedNoun = declinedNoun.concat('s');
    }
  }
  if (nounCase === 'dative' && noun.gender === 'plural') {
    if (!['n', 's'].includes(declinedNoun.slice(-1))) {
      declinedNoun = declinedNoun.concat('n');
    }
  }

  return [article.text, declinedNoun].join(' ');
}

const PREPOSITIONS = {
  location: [
    { text: 'in', case: 'dative', domains: ['location'] },
    { text: 'neben', case: 'dative', domains: ['location'] },
  ],
  motion: [
    { text: 'in', case: 'accusative', domains: ['location'] },
  ],
  time: [
    { text: 'seit', case: 'dative', domains: ['time', 'gerund'] },
    { text: 'bis', case: 'nominative', domains: ['time', 'location'] },
    { text: 'waehrend', case: 'genitive', domains: ['time', 'gerund'] },
  ],
};
function generatePrepositionalPhrase(domain = 'location') {
  const preposition = randomElement(PREPOSITIONS[domain]);
  const noun = fetchNounByDomains(preposition.domains);
  return [preposition.text, generateNounPhrase(noun, preposition.case)].join(' ');
}

function generatePredicate(finiteVerb) {
  const valency = randomElement(finiteVerb.valencies);
  const domains = (finiteVerb.domains ? finiteVerb.domains : {});
  const subject = (valency.includes('subject')
    ? generateNounPhrase(fetchNounByDomains(domains.subject), 'nominative') : '');
  const directObject = (valency.includes('direct')
    ? generateNounPhrase(fetchNounByDomains(domains.direct), 'accusative') : '');
  const indirectObject = (valency.includes('indirect')
    ? generateNounPhrase(fetchNounByDomains(domains.indirect), 'dative') : '');

  const prepositionalPhrases = [];
/*
  const prepositionalPhrases = [
    (coinflip() ? generatePrepositionalPhrase('time') : ''),
    (coinflip() && !finiteVerb.verbOfMotion ? generatePrepositionalPhrase('location') : ''),
    (coinflip() && finiteVerb.verbOfMotion ? generatePrepositionalPhrase('motion') : ''),
  ].join(' ');
*/
  return [
    subject,
    directObject,
    indirectObject,
    prepositionalPhrases,
    finiteVerb.separablePrefix,
  ].join(' ');
}

const INDEPENDENT_CLAUSE_GRAMMAR = [
  ['subject', 'finite_verb', 'predicate'],
  ['dependent_clause', ',', 'finite_verb', 'subject', 'predicate'],
];
const DEPENDENT_CLAUSE_GRAMMAR = [
  ['subordinating_conjunction', 'subject', 'predicate', 'finite_verb']
];
const SUBORDINATING_CLAUSES = [
  'weil', 'obwohl', 'wenn', 'waehrend',
];
function generateClause(type = 'independent') {
  const rule = (type === 'independent'
    ? randomElement(INDEPENDENT_CLAUSE_GRAMMAR)
    : randomElement(DEPENDENT_CLAUSE_GRAMMAR)
  );
  const subject = randomElement(NOUNS, false);
  const subject_phrase = generateNounPhrase(subject);
  const finite_verb = fetchVerbByDomains(subject.domains);
  const finite_verb_conjugated = conjugateVerb(finite_verb, getNounNumber(subject));
  const predicate = generatePredicate(finite_verb);
  const subordinating_conjunction = randomElement(SUBORDINATING_CLAUSES);
  const response = [];
  rule.forEach((term) => {
    switch (term) {
      case 'subject': response.push(subject_phrase); break;
      case 'finite_verb': response.push(finite_verb_conjugated); break;
      case 'predicate': response.push(predicate); break;
      case 'dependent_clause': response.push(generateClause('dependent')); break;
      case 'subordinating_conjunction': response.push(subordinating_conjunction); break;
      default: response.push(term);
    }
  });
  return response.join(' ');
}

const SENTENCE_GRAMMAR = [
  ['independent_clause'],
  ['independent_clause', ',', 'dependent_clause'],
  ['independent_clause', 'coordinating_conjunction', 'sentence'],
];
function generateSentence() {
  const rule = randomElement(SENTENCE_GRAMMAR);
  const response = [];
  rule.forEach((term) => {
    switch (term) {
      case 'dependent_clause':
        response.push(generateClause('dependent'));
        break;
      case 'independent_clause':
        response.push(generateClause());
        break;
      case 'coordinating_conjunction':
        response.push('und');
        break;
      case 'sentence':
        response.push(generateSentence());
        break;
      default: response.push(term);
    }
  });
  return response.join(' ');
}

const RESPONSE_GRAMMAR = [
  ['sentence'],
  ['sentence', 'response'],
];
function generateResponse() {
  const rule = randomElement(RESPONSE_GRAMMAR);
  const response = [];
  rule.forEach((term) => {
    switch (term) {
      case 'response':
        response.push(generateResponse());
        break;
      case 'sentence':
        response.push(generateSentence().concat('.'));
        break;
      default:
    }
  });
  return response.join('. ')
    .replace(/ +/g, ' ')
    .replace(/ ,/g, ',')
    .replace(/ \./g, '.')
    .replace(/^ /g, '')
    .replace(/\.\./g, '.');
}

module.exports = generateResponse;
