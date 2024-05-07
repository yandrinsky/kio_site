FROM node:18-alpine AS BUILD

WORKDIR /app

COPY . /app

# Устанавливаем Python, make и g++ для e
RUN apk add --no-cache python3 make g++ && \
    [ ! -e /usr/bin/python ] && ln -s /usr/bin/python3 /usr/bin/python || echo "Python link already exists"

# Устанавливаем переменную окружения для Python
ENV PYTHON=/usr/bin/python

# Устанавливаем пакеты с явным указанием версии Python
RUN npm install -g node-gyp@latest
#RUN npm install -g @microsoft/rush
#RUN npm install --python=/usr/bin/python


#RUN node /app/common/scripts/install-run-rush.js install
#RUN rush update
#RUN node /app/common/scripts/install-run-rush.js rebuild


#RUN rush build

#ADD ./data/import/realm-export.json /data/


