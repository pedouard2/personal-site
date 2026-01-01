// @ts-check

import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    // This part is crucial
    optimizeDeps: {
      include: ['react-chrono', 'framer-motion'] 
    },
    // Sometimes necessary to stop Astro from trying to run it on the server
    ssr: {
      noExternal: ['react-chrono'] 
    }
  }
});