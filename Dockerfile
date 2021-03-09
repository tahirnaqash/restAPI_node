FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000

CMD ["node","src/server.js"]