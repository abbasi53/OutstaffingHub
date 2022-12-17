
## 🛠 Tech Stack

- Node.js
- Typescript
- GraphQL
- MongoDB

```
## 💻 Run Locally

Clone the project

```bash
  git clone <https://github.com/abbasi53/outstaffinghub.git>
```

Go to the project directory

```
  cd src
```

Install dependencies

```bash
  yarn install
```

Set-up `ENV` variables

```bash
MONGO_URI=
APP_SECRET=


GRAPHQL_HOST=
GRAPHQL_PORT=8000

# Redis
REDIS_URL= localhost
REDIS_HOST= localhost
REDIS_PORT= 6379
REDIS_PASSWORD= redis


```

To run the server locally it will be required to have `Redis` and `MongoDB` installed on your machine, if you have `Docker` installed you can run the following commands:

```bash
docker run --name redis -p 6379:6379 -d -t redis:alpine --requirepass redis
```

```bash
docker run --name mongo -p 27017:27017 -d  mongo
```

Start the server

```bash
  yarn dev
```

Run the tests

```bash
yarn test
``
