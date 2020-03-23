FROM node:13-alpine AS base

RUN apk add --no-cache tini

RUN   mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

EXPOSE 3000

# production stage
FROM base AS production

RUN yarn install --production --silent --non-interactive

ENTRYPOINT [ "/sbin/tini", "--" ]

CMD [ "node", "./server.js" ]