git pull \
&& docker build -t fubles . \
&& (docker rm -f fubles || true) \
&& docker run -dp 80:80 --name fubles fubles
