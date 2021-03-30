FROM alpine:latest

EXPOSE 8125

RUN apk update

RUN wget https://dl.influxdata.com/telegraf/releases/telegraf-1.14.5-static_linux_amd64.tar.gz
RUN tar xf telegraf-1.14.5-static_linux_amd64.tar.gz
RUN rm telegraf-1.14.5-static_linux_amd64.tar.gz

RUN cp telegraf/telegraf /usr/bin

CMD ["telegraf", "--config", "/etc/telegraf/telegraf.conf"]