/**
 * Decode HTML entities from WordPress API responses
 */
export function decodeHtmlEntities(text) {
  if (!text) return '';

  // Decode numeric entities
  text = text.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });

  // Decode hex entities
  text = text.replace(/&#x([0-9A-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });

  // Decode named entities
  const entities = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    ndash: '–',
    mdash: '—',
    ldquo: '"',
    rdquo: '"',
    lsquo: "'",
    rsquo: "'",
    nbsp: ' ',
  };

  for (const [entity, char] of Object.entries(entities)) {
    text = text.replace(new RegExp(`&${entity};`, 'g'), char);
  }

  return text;
}
