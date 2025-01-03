# Nest.js - Onion Architecture

## Onion vs Hexagonal vs Clean

Onion, Hexagonal, and Clean Architecture are commonly referred to as "Ports and Adapters Architecture", 
"Layered Architecture with Dependency Inversion", or "Concentric Architecture". While mostly similar, 
they differ in subtle ways. For the sake of naming, I have used Onion Architecture most of the time 
as I feel like that specification is easier to grasp.

### Key Common Principles

#### Dependency Rule

- Dependencies always point inward (we visualize these architctures as a circle* with the domain at the center)
- Inner layers know nothing about outer layers
- Business/Domain logic is isolated from external concerns

#### Layer Separation

- Clear boundaries between different responsibilities
- Core business/domain logic at the center
- Infrastructure and UI concerns at the outer layers

#### Dependency Inversion

- High-level modules don't depend on low-level modules
- Both depend on abstractions
- Abstractions don't depend on details

* Yes, Hexagonal Architecture uses an hexagon, but the principle is identical. The hexagon actually made it confusing.

## Description

The goal of this project is to demonstrate how to use the Onion (or similar) Architecture with the 
[Nest.js](https://github.com/nestjs/nest) framework. To read more about my explanations on this 
architecture, head over to my blog [post](https://wowww.ch).

This example was bootstrapped from the official Nest.js Advanced Course [courses](https://courses.nestjs.com/) but will
deviate over time toward a more "real-life" example. Still, to dive deeper and get more hands-on experience just go there and buy 
their courses, they are excellent, and they explore many other concepts and architectures like CQRS, Event Sourcing, 
etc., that are not covered at all in this repository. 💡

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
