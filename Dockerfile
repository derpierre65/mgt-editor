FROM nginx:alpine

WORKDIR /var/www/html/

COPY dist .
COPY build/nginx/conf.d/default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]