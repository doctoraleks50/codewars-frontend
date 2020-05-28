FROM node:10-alpine

MAINTAINER Markas Kvitka

WORKDIR /
ADD package.json /
RUN npm install --no-progress && rm -rf /root/.npm /tmp/npm*
RUN npm install -g --no-progress @vue/cli-service

ADD ./ /app
WORKDIR /app
