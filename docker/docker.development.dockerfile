FROM node:13-alpine AS base

RUN   mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

EXPOSE 3000

# development stage
FROM base AS development

RUN yarn install --silent --non-interactive

ENV DEBUG=*

CMD [ "npx", "nodemon", "./server.js" ]