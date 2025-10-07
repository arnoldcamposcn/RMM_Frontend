import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🛑 Añadir esta sección para permitir el acceso desde el subdominio 🛑
  server: {
    // Si estás usando Docker, es una buena práctica forzar el host
    host: '0.0.0.0', 
    
    // Permitir el acceso desde tu dominio público
    allowedHosts: [
      'revista.metaminingmedia.com', 
      '127.0.0.1', 
      'localhost',
    ]
  }
  // Fin de la sección añadida
});
