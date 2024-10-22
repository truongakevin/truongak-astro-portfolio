import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kevinatruong.com',
  trailingSlash: 'never',
  integrations: [
    react(),
  ],
});