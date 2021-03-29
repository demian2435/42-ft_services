FROM alpine:latest
COPY setup.sh ./
RUN apk update
COPY grafana-7.5.1 ./
EXPOSE 3000
CMD bash setup.sh