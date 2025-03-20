# FROM node:20-alpine

FROM node:20  

WORKDIR /app

COPY package*.json ./

# RUN npm install
RUN npm install --omit=optional  

COPY . .

#RUN npm run build

#EXPOSE 3000
# for Production
EXPOSE 10000 

#CMD ["npm", "run", "dev"]
RUN npm start
