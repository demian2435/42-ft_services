FROM alpine:latest
COPY setup.sh ./
COPY controllo_php.sh ./
RUN apk update
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
RUN	apk add --no-cache nginx
COPY wordpress /www
COPY wp-config.php /www/
#VOGLIO MORIRE 2 LA VENDETTA
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
EXPOSE 5050
CMD ./setup.sh
