FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run build

#EXPOSE 3000

# for Production
EXPOSE 10000 

#CMD ["npm", "run", "dev"]
CMD ["npm", "run", "prod"]

