# Nest.js - Onion Architecture

## Requisites

- [pnpm](https://pnpm.io/) - The Best Package Manager.
- [Nest.js](https://nestjs.com/) - The Best Node.js Framework.
- [MikroORM](https://mikro-orm.io) - The Best TypeScript ORM for Node.js.

(yes, this is strongly opinionated 😉 but it's OK if you don't like it, you can
do you own cooking here...)

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
$ pnpm start:dev
```

## Run the tests

```bash
$ pnpm test
```

Have a look at the E2E test as they help clarify the architecture:

```bash
$ pnpm test:e2e
```

## Description

The goal of this project is to demonstrate how to use the Onion (or similar) Architecture with the
[Nest.js](https://github.com/nestjs/nest) framework. To read more about my explanations on this
architecture, head over to my blog [post](https://wowww.ch).

This example was bootstrapped from the official Nest.js Advanced Course [courses](https://courses.nestjs.com/) but will
deviate over time toward a more "real-life" example. Still, to dive deeper and get more hands-on experience just go there and buy
their courses, they are excellent, and they explore many other concepts and architectures like CQRS, Event Sourcing,
etc., that are not covered at all in this repository. 💡

## Onion vs Hexagonal vs Clean

Onion, Hexagonal, and Clean Architecture are commonly referred to as "Ports and Adapters Architecture", 
"Layered Architecture with Dependency Inversion", or "Concentric Architecture". While mostly similar, 
they differ in subtle ways. For the sake of naming, I have used Onion Architecture most of the time 
as I feel like that specification is easier to grasp.

### Key Common Principles

> Design your code to interact with an abstract definition of behavior (an interface) rather than a specific implementation.

#### Dependency Rule

- Dependencies always point inward (we visualize these architectures as a circle[^1] with the domain at the center)
- Inner layers know nothing about outer layers
- Business/Domain logic is isolated from external concerns[^2]

#### Dependency Inversion

- High-level modules don't depend on low-level modules
- Both depend on abstractions
- Abstractions don't depend on details

#### Layer Separation

- Clear boundaries between different responsibilities
- Core business/domain logic at the center
- Infrastructure and UI concerns at the outer layers

## FAQ

### Should I use the Onion architecture in my project?

I can't answer that question for you. I think a good approach is to start with a standard layered
architecture, which at some point might lead to some bloating in services, or some headache
like a tight coupling between the controllers and services, and the services and the repositories.
At that point, you might want to come back here and start applying some abstractions, for example
you might want to:

1. Integrate UseCases instead of calling your services directly.
2. Create QueryObjects instead of calling your repositories for everything.
3. Make sure the Services and UseCases are not aware of the data-access details by abstracting the Repositories, EntityManager, or any ORM related classes from them.
4. Ensure Services don't receive anything from the HTTP layer and don't return HttpExceptions.
5. Ensure Services are unaware of the HTTP Authentication mechanisms (JWT, etc.). Often, to test ownership, developers have the tendency to pass the Authentication context to the Services. This creates a strong coupling.
6. Etc... many more things to think about, but if you apply the core principles, they should become obvious.

### Where should I put my files?

There are 4 mains "folders":

- application
- domain
- infrastructure
- presenter

#### Application

This is the application layer.

#### Domain

Basically, only POJO, containing the Business Logic for the creation, and modification of entities.

#### Infrastructure

To simplify, this is the data-access layer. Any interaction with a third party, or external system should
be abstracted here.

#### Presenter

This layer manage the input/output of different presenter. A presenter is a user 
interface. For example, a HTTP interface, or a CLI tool.

## Sources

* [Wikipedia: Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))
* [Nest.js: Advanced Courses](https://courses.nestjs.com)

## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE)

---

[^1] Yes, Hexagonal Architecture uses a hexagon, but the principle is identical. The hexagon actually made it confusing.   
[^2] Basically, they are just POJO, not even linked to Nest.js.   
