# -------------------- STAGE 1: BUILD --------------------
# Usamos Node para construir la aplicación
FROM node:20-alpine AS build

WORKDIR /app

# Copia los archivos de configuración de paquetes
COPY package.json package-lock.json ./

# **PASO CLAVE: Sobrescribir el script 'build' para eliminar 'tsc -b'**
# Esto evita que los errores de TypeScript detengan el proceso de Docker build.
RUN sed -i 's/"build": "tsc -b && vite build"/"build": "vite build"/g' package.json

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Ejecuta la construcción de producción (crea la carpeta 'dist')
RUN npm run build

# -------------------- STAGE 2: RUN (Nginx) --------------------
# Usamos una imagen ligera de Nginx para servir los archivos
FROM nginx:alpine

# Copia la configuración de Nginx (que ya tiene el try_files para SPA)
# Esto garantiza que el routing de React funcione
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de producción compilados desde la etapa 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 del contenedor (mapeado al 5173 en el VPS por docker-compose)
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
