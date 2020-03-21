FROM node:13-alpine AS base

RUN   mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

EXPOSE 3000

# production stage
FROM base AS production

RUN yarn global add pm2

RUN yarn install --production --silent --non-interactive

CMD [ "pm2-runtime", "./server.js" ]