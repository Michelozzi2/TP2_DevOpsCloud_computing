FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Copier le script d'entrée
COPY entrypoint.sh /
# Le rendre exécutable
RUN chmod +x /entrypoint.sh
EXPOSE 80
# Utiliser notre script comme point d'entrée
CMD ["/entrypoint.sh"]