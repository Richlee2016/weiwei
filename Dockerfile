FROM node

RUN mkdir -p /app

WORKDIR /app

EXPOSE 3002

CMD yarn && npm start