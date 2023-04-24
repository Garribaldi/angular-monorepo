FROM nginx:1.17.1-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY /dist/apps/demo /usr/share/nginx/html
