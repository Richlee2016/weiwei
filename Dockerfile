FROM node

RUN mkdir -p /app

WORKDIR /app

EXPOSE 3006

CMD yarn && npm run build && npm run start:prod