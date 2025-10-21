FROM node:22

WORKDIR /api

COPY . .

RUN npm install

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
RUN chown -R 1001:0 /api && chmod -R g+rwX /api

USER 1001

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
