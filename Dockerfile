FROM node:14
WORKDIR /app
RUN npm i -g typescript
RUN npm i -g ts-node
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["ts-node", "--transpile-only", "./src/app.ts"]