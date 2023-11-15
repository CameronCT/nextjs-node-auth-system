FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn install
RUN yarn run build
EXPOSE 8080

CMD [ "yarn", "run", "start" ]