FROM node:13-alpine

RUN mkdir -p /opt/api-graphql
RUN apk --no-cache add \
  -t .build-deps \
    gcc \
    libc-dev \
    make \
    libpng-dev \
    g++ && \
  mkdir -p /opt/api-graphql && \
  cd /opt/api-graphql && \

WORKDIR /opt/api-graphql
COPY . /opt/api-graphql

ADD package.json /opt/api-graphql
RUN npm i
