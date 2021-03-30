FROM alpine:latest

EXPOSE 3000

RUN apk update
RUN apk add libc6-compat
RUN addgroup grafana
RUN adduser -s /bin/false -G grafana -S -D grafana

RUN mkdir grafana
COPY grafana-7.5.1 /grafana
RUN	mkdir -p /var/lib/grafana/dashboards
RUN mkdir -p /var/lib/grafana/data
RUN mkdir -p /var/lib/grafana/logs
RUN mkdir -p /var/lib/grafana/plugins
RUN	ln -s /grafana/plugins /var/lib/grafana/plugins
RUN	mv /grafana/bin/* /usr/bin/

COPY /extra/defaults.ini /grafana/conf/defaults.ini

CMD ["grafana-server", "--homepath=/grafana"]