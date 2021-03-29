FROM alpine:latest
COPY setup.sh ./
RUN apk update
RUN apk add --no-cache nginx
RUN apk add --no-cache openssh
RUN apk add --no-cache openssl
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
COPY index.html /www/
COPY bg.jpg /www/
RUN openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out /etc/ssl/d2435.pem -keyout /etc/ssl/d2435.key -subj "/C=IT/ST=Rome/L=Rome/O=42RomaLuiss/OU=dmalori/CN=localhost"
RUN ssh-keygen -A
RUN adduser -D d2435
RUN echo "d2435:d2435" | chpasswd
EXPOSE 22 80 443
CMD ./setup.sh