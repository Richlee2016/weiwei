FROM node

RUN mkdir -p /app

WORKDIR /app

EXPOSE 7001

CMD yarn && npm start