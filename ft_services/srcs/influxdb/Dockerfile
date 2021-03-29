FROM alpine:latest

COPY setup.sh ./
RUN apk update
RUN	apk add --no-cache influxdb
EXPOSE 8086
CMD ./setup.sh