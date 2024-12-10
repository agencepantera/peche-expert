// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://peche-expert.fr',
  integrations: [
    tailwind({
      configFile: './tailwind.config.cjs',
      applyBaseStyles: false
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});