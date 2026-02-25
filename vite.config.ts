import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,          // allow LAN access
    allowedHosts: 'all'  // disable host restriction
  }
});