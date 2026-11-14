FROM nginx:alpine

# Copiar configuración personalizada optimizada para medios y streaming
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos estáticos de la app
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
