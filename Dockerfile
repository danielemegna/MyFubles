FROM httpd

COPY . /usr/local/apache2/htdocs

CMD ["/usr/local/apache2/bin/httpd", "-D", "FOREGROUND"]
