FROM node:13-alpine AS base

RUN mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

EXPOSE 3000

# production stage
FROM base AS production

ENV NODE_ENV=production

RUN yarn install --production --silent --non-interactive && \
  yarn cache clean

CMD [ "node", "./server.js" ]