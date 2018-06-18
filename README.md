# fullstack

This project contains a simple fullstack skelton app based on `graphql-yoga` and `create-react-app`.

## Getting started

**Clone the repository:**

```sh
git clone https://github.com/adamgajzlerowicz/skeletoon.git
cd skeletoon
```

## graphql server
[Docs](https://github.com/adamgajzlerowicz/skeletoon/tree/master/server)

### Features
* json web token
* user support login/register over graphs
* securing graphs with user details
* me endpoint
* graph for refreshing token
* token expire after 5 minutes
* refresh token expires after 2 months
* postgres backend with docker
* requies hash for tokens supplied from command line

### Libraries used
* graphql-yoga
* sequelize
* graphql-sequelize
* jest

## Run frontend app
[Docs](https://github.com/adamgajzlerowicz/skeletoon/tree/master/frontend)

### Features
* blazing fast
* stores token and refresh token in local storage
* auto refresh tokens using refresh token when token expires
* router with protected routes
* auto redirect to / when token rejected or not found

### Libraries used
* react
* apollo
* webpack
* react router
* jset
* flow
