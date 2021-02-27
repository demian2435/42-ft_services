FROM alpine:latest
COPY setup.sh ./
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
ADD https://wordpress.org/latest.tar.gz .
RUN tar -xvf latest.tar.gz
RUN mv wordpress /www
COPY wp-config.php /www/ 
EXPOSE 5050
CMD ./setup.sh
