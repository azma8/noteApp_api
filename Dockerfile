FROM node:22

USER root
WORKDIR /api

COPY . .

RUN npm install

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
