import { decodeHtmlEntities } from './htmlDecode';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const WORDPRESS_API_URL = 'https://wp.boekenwuurm.nl/wp-json/wp/v2';

export async function getPosts() {
  const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }
  const posts = await res.json();

  return posts.map((post) => ({
    ...post,
    title: {
      ...post.title,
      rendered: decodeHtmlEntities(post.title.rendered),
    },
  }));
}

export async function getCategories() {
  const res = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.statusText}`);
  }
  const categories = await res.json();

  // Dekodiere HTML-Entities in Kategorienamen
  return categories.map((cat) => ({
    ...cat,
    name: decodeHtmlEntities(cat.name),
  }));
}

export async function getPostsByCategory(categoryId) {
  const res = await fetch(`${WORDPRESS_API_URL}/posts?categories=${categoryId}&_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }
  const posts = await res.json();

  return posts.map((post) => ({
    ...post,
    title: {
      ...post.title,
      rendered: decodeHtmlEntities(post.title.rendered),
    },
  }));
}
