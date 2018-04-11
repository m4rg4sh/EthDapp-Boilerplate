FROM node:alpine

ADD ./ /srv

RUN npm -g install serve

EXPOSE 5000

CMD serve /srv
