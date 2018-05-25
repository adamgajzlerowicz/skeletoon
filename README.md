# fullstack

This project contains a simple fullstack skelton app based on `graphql-yoga` and `create-react-app`.

## Get started

**Clone the repository:**

```sh
git clone https://github.com/adamgajzlerowicz/skeletoon.git
cd skeletoon
```

**Install dependencies and start the `server`:**

```sh
cd server
yarn install
yarn docker
yarn seed # create database structure. Once seeded, stop the process
yarn start
```

In your browser navigate to [http://localhost:4000](http://localhost:4000).

**Install dependencies and start the `frontend`:**

In a second terminal window run:

```sh
cd ../frontend
yarn install
yarn start
```

Open your browser at [http://localhost:3000](http://localhost:3000).

**Create User**

In graphiql playground run a following mutation:

```sh
mutation {
  createUser(
    username: "user1",
    email: "user1@google.com",
    password: "c13qwffef$f%^RTY") {
    username
  }
}
```

**Authenticate user**

```sh
{
  login(username: "user1", password:"c13qwffef$f%^RTY"){
    token
  }
}
```

**Use your token***
At the bottom of the page in `Headers` section insert the token like so:

```sh
{
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZRf0QuQtrcbk" #your token
}
```

**Use JSON webtoken to access protected route**

```sh
{
  users{
    username,
    email
  }
}
```
