FROM node:13-alpine AS base

RUN   mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

EXPOSE 3000

# test stage
FROM base AS test

RUN yarn install --silent --non-interactive

CMD [ "npx", "mocha", "--exit" ]