import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'revista.metaminingmedia.com',
      '127.0.0.1',
      'localhost'
    ]
  }
});
