FROM node:22-bookworm

WORKDIR /app

COPY .next/standalone .

ENV HOSTNAME "0.0.0.0"
ENV PORT 8080

CMD node server.js