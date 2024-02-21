FROM --platform=linux/amd64 node:21.6.1

WORKDIR /app/users

COPY package.json yarn.lock ./

CMD ["echo", "Installing dependencies"]

RUN yarn install --frozen-lockfile

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY .env ./

RUN yarn build

EXPOSE 3000
RUN yarn start