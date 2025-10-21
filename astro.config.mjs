// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
//import content from '@astrojs/content';

// https://astro.build/config
export default defineConfig({
  site: 'https://boekenwuurm.nl',
  image: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'wp.boekenwuurm.nl',
    }],
  },
	integrations: [mdx(), sitemap()],
});
