FROM node:latest as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
