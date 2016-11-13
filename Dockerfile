FROM hypriot/rpi-alpine-scratch

RUN apk update && apk add apache2

WORKDIR /var/www/localhost/htdocs
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]
