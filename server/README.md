
**Install dependencies and start the `server`:**

```sh
cd server
yarn install
yarn docker
yarn seed # create database structure. Once seeded, stop the process
yarn start
```

Connect to postgres instance anc create a skeletoon database `CREATE DATABASE skeletoon`

In your browser navigate to [http://localhost:4000](http://localhost:4000).

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

**Securing graphs**
Surround your resolver with `withAuth` higher order function. That is it :)

**Considerations for production**

Set token in your server environment, rather then the test one in `package.json` in `start` script

*Frontend*
Frontend is wired up for development and communicates with backend for requests, but it is not configured to use any particular graphs.

**TODO**

* Add json refresh token
* Cache tokens and invalidate them when new token is generated
* Add flow and return errors as a { field: string, error: string } objects
* On Frontend add registration and login forms. Then use received token for auth.

