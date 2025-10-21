/**
 * Extrahiert Gallery-Bilder aus WordPress Post Content
 */

import { decodeHtmlEntities } from './htmlDecode';

export function extractGalleryImages(htmlContent) {
  if (typeof window === 'undefined') {
    const imgRegex = /<img[^>]+src="([^">]+)"[^>]*alt="([^"]*)"[^>]*>/g;
    const images = [];
    let match;

    while ((match = imgRegex.exec(htmlContent)) !== null) {
      const caption = extractCaption(htmlContent, match[1]);
      images.push({
        url: match[1],
        alt: decodeHtmlEntities(match[2] || ''),
        caption: decodeHtmlEntities(caption),
      });
    }

    return images;
  }

  return [];
}

function extractCaption(htmlContent, imgSrc) {
  const escapedSrc = imgSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Figcaption
  const figureRegex = new RegExp(
    `<figure[^>]*>.*?<img[^>]+src="${escapedSrc}"[^>]*>.*?<figcaption[^>]*>(.*?)</figcaption>.*?</figure>`,
    's'
  );
  const match = htmlContent.match(figureRegex);
  if (match) {
    return match[1].replace(/<[^>]*>/g, '').trim();
  }

  // WP Caption
  const wpCaptionRegex = new RegExp(
    `<div[^>]*class="[^"]*wp-caption[^"]*"[^>]*>.*?<img[^>]+src="${escapedSrc}"[^>]*>.*?<p[^>]*class="[^"]*wp-caption-text[^"]*"[^>]*>(.*?)</p>.*?</div>`,
    's'
  );
  const wpMatch = htmlContent.match(wpCaptionRegex);
  return wpMatch ? wpMatch[1].replace(/<[^>]*>/g, '').trim() : '';
}
