# React image
FROM node:alpine
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install
COPY . .
# build React file
RUN npm run build

# NGINX Image
FROM nginx
# ให้ Nginx listen port 3000
EXPOSE 3000
# COPY config จาก local to container
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY build file from previous container 
COPY --from=0 /app/build /usr/share/nginx/html
