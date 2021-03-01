#https://stackoverflow.com/questions/60458028/ftps-server-doesnt-work-properly-using-kubernetes
#http://vsftpd.beasts.org/vsftpd_conf.html#lbAE

FROM alpine:latest

COPY setup.sh ./
RUN apk update
RUN	apk add --no-cache vsftpd
RUN apk add --no-cache openssl
RUN	adduser -D d2435 
RUN echo "d2435:d2435" | chpasswd
COPY vsftpd.conf /etc/vsftpd/
RUN	echo "d2435" >> /etc/vsftpd/vsftpd.userlist
RUN openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out /etc/ssl/d2435.pem -keyout /etc/ssl/d2435.key -subj "/C=IT/ST=Rome/L=Rome/O=42RomaLuiss/OU=dmalori/CN=localhost"
EXPOSE 21 30000 30001 30002
CMD ./setup.sh