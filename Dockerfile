FROM node:19.6.0

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
