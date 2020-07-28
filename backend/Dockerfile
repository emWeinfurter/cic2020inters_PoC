FROM node:14-slim
WORKDIR /app
COPY package.json ./app
RUN npm install
COPY . /app
EXPOSE 8000:8000
CMD ["npm", "start"]