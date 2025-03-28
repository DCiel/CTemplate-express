# Шаблон express с prisma
Шаблон для работы express с prisma
Работает и запускается через bun

## Install packages

Install with [bun](https://bun.sh/docs/installation):

```sh
$ bun install
```

---


## Usage

Start database:
```sh
$ docker-compose up --build
```
Migrate with bun
```sh
$ bun run migrate
```
or
```sh
$ prisma migrate dev --name init
```

Start with bun:

```sh
$ bun start
```

---

### Tech

ZOD Architecture oriented to: [link](https://laniewski.me/blog/2023-11-19-api-response-validation-with-zod/)
