# Dependencies
FROM node:20-bullseye-slim AS deps
ARG PORT
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json /app/
RUN npm install --omit=dev

# Build
FROM node:20-bullseye-slim AS build
ARG PORT
WORKDIR /app
COPY package*.json tsconfig.json /app/
COPY ./src/ /app/src
COPY ./test/ /app/test
RUN \
    npm install && \
    npm run build

# Release
FROM node:20-bullseye-slim AS release
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}
WORKDIR /home/node/app
RUN chown -R node:node /home/node/app
ENV NODE_ENV=production
COPY --from=deps --chown=node:node /app/node_modules/ /home/node/app/node_modules/
COPY --from=build --chown=node:node /app/dist/src/ /home/node/app/
USER node
CMD ["node", "/home/node/app/server.js"]
