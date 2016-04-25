#FROM debian:latest
FROM resin/rpi-raspbian

RUN apt-get update
RUN apt-get install -y apache2

WORKDIR /var/www/html
CMD ["/usr/sbin/apache2ctl", "-D FOREGROUND"]
