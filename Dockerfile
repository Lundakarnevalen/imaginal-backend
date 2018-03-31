FROM node:8.9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY . /usr/src/app

USER node

CMD [ "npm", "start" ]

EXPOSE 8081
