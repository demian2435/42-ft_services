FROM alpine:latest

RUN apk update
RUN adduser -D d2435
RUN mkdir -p /etc/influxdb
RUN mkdir -p /var/lib/influxdb
COPY influxdb.conf /etc
RUN	apk add --no-cache influxdb
RUN mkdir -p /var/lib/influxdb/meta
RUN mkdir -p /var/lib/influxdb/data
RUN mkdir -p /var/lib/influxdb/wal
VOLUME /var/lib/influxdb


#COMPATIBILITA MEDIOEVO
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openrc
RUN mkdir /run/openrc && touch /run/openrc/softlevel
RUN	rc-status
RUN rc-update add influxdb

EXPOSE 8086
CMD ["influxd", "-config", "/etc/influxdb.conf"]