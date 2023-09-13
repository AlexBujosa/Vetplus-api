# Vetplus Api Backend

The Vetplus backend was made with [Nest.js](https://github.com/nestjs/nest) framework

# Documentation

[Documentation](https://vetplus-api-docs.netlify.app/)

# Installation

```bash
$ npm install
```

## Setup Prisma

```bash
# generate types for @prisma/client
$ npx prisma generate
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Graphql Playground

```bash
# run app in development mode
$ localhost:3000/graphql
```

# Push changes to prisma db

First create your ```DATABASE_URL``` inside your .env file

```bash
# push changes to the db
$ npx prisma db push
```
