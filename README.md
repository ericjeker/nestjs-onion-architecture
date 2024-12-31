# Nest.js - Onion Architecture

## Description

The goal of this project is to demonstrate a clean repository using the Onion Architecture in the 
[Nest.js](https://github.com/nestjs/nest) framework. To read more about my explanations on this 
architecture, head over to my blog [post](https://wowww.ch).

This example is strongly inspired from the official video [courses](https://courses.nestjs.com/). To dive deeper and get more 
hands-on experience just go there and buy their courses, they are excellent, and they explore many 
other concepts and architectures like CQRS, Event Sourcing, etc. 💡

## Requisites

- [pnpm](https://pnpm.io/) - The Best Package Manager.
- [Nest.js](https://nestjs.com/) - The Best Node.js Framework.
- [MikroORM](https://mikro-orm.io) - The Best TypeScript ORM for Node.js.

(yes, this is strongly opinionated 😉)

The project will create a SQLite database in the root folder.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE)
