FROM node:16-alpine AS base

RUN mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

EXPOSE 3000

# development stage
FROM base AS development

RUN npm install

ENV DEBUG=*

CMD [ "npx", "nodemon", "./server.js" ]
