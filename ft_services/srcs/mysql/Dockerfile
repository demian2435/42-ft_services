FROM alpine:latest
COPY ./setup.sh .
COPY ./wordpress.sql .
RUN apk update
RUN apk add --no-cache mysql
RUN apk add --no-cache mysql-client
# VOGLIO MORIRE
RUN mkdir /run/mysqld
EXPOSE 3306
CMD ./setup.sh
