import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
    ],
    // 💡 CONFIGURACIÓN CLAVE PARA CORREGIR EL WEBSOCKET HMR 💡
    hmr: {
        protocol: 'wss', // Forzar el uso del protocolo seguro WSS
        host: 'revista.metaminingmedia.com', // Usar el dominio público en lugar de localhost
        port: 443, // Especificar el puerto 443 (HTTPS)
        clientPort: 443, // También el puerto de cliente
    }
  }
  // Fin de la sección añadida
});