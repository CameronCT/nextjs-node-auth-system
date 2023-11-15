FROM nginx:latest

WORKDIR /usr/src/app
COPY ./http/nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./http/conf/*.conf /etc/nginx/conf.d/
COPY ./http/certs/*.crt /etc/nginx/
COPY ./http/certs/*.key /etc/nginx/
COPY ./http/certs/*.pem /etc/nginx/
RUN chown nginx:nginx /usr/share/nginx/html/*
COPY ./next/public /usr/share/nginx/html
COPY ./server/src/public /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]