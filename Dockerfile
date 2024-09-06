FROM node:20-alpine3.20 AS dependencies

WORKDIR /app
COPY ./package.json ./yarn.lock ./

RUN yarn install --frozen-lockfile && \
    yarn cache clean

FROM dependencies

COPY ./* ./

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
