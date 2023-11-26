FROM edisonc2h/dasboard
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@10.2.4
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]