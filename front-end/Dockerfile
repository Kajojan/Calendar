FROM node:latest

WORKDIR /app


COPY /front-end .

RUN npm install

EXPOSE 3000


CMD [ "npm", "start" ]