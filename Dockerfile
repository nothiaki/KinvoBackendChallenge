FROM node

RUN mkdir app

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "sh", "-c", "npx prisma db push && npm run dev" ]
