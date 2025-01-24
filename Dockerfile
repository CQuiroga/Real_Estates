FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# docker exec -it real_estates_app npm run db:import
# docker exec -it real_estates_app npm run db:delete
