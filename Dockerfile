FROM node:alpine
WORKDIR /usr/app
RUN yarn global add http-server
COPY . .
RUN yarn install
RUN yarn build

CMD ["http-server","build"]
EXPOSE 8080