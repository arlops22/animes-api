FROM node

RUN mkdir api

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]