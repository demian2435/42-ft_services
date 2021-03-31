FROM alpine:latest
COPY setup.sh ./
COPY controllo_php.sh ./
RUN apk update
RUN apk add --no-cache nginx
RUN	apk add --no-cache php7
RUN	apk add --no-cache php7-fpm
RUN	apk add --no-cache php7-opcache
RUN	apk add --no-cache php7-gd
RUN	apk add --no-cache php7-mysqli
RUN	apk add --no-cache php7-zlib
RUN	apk add --no-cache php7-curl
RUN	apk add --no-cache php7-mbstring
RUN	apk add --no-cache php7-json
RUN	apk add --no-cache php7-session
RUN	apk add --no-cache php7-xml
RUN	apk add --no-cache php7-iconv
COPY phpMyAdmin-5.1.0-english /www
COPY config.inc.php /www/
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
EXPOSE 5000
CMD ./setup.sh