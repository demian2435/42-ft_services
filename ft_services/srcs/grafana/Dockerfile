FROM alpine:latest
COPY setup.sh ./
RUN apk update
RUN mkdir grafana
COPY grafana-7.5.1 ./grafana
RUN apk add --no-cache libc6-compat
EXPOSE 3000
CMD ./setup.sh