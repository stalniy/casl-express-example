# Example of CASL integration in expressjs app

Read [CASL in Expressjs app][casl-express-example] for details.

[CASL](https://stalniy.github.io/casl/) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access.

This is an example application which shows how integrate CASL in blog application. There are 3 entities:
* User
* Post
* Comment

Application uses `passport-jwt` for authentication.
Permission logic (i.e., abilities) are define in `src/auth/abilities.js`. Rules can be specified for authenticated and anonymous users, so potentially it's quite easy to give access anonymous users to leave comments in blog.
The main logic is built on top of modules (`src/modules`)

**Note**: refactored to use CASL 2.0. See [@casl/ability][casl-ability] and [@casl/mongoose][casl-mongoose] for details.
**Warning**: this code is just an example and doesn't follow best practices everywhere (e.g. it stores passwords without hashing).

**Note #2**: in order to use with [Vuex example](https://github.com/stalniy/casl-vue-api-example) switch to branch [vue-api](https://github.com/stalniy/casl-express-example/tree/vue-api)

## Installation

```sh
git clone https://github.com/stalniy/casl-express-example.git
cd casl-express-example
npm install
npm start # `npm run dev` to run in dev mode
```

Also you need mongodb database up and running. Application will connect to `mongodb://localhost:27017/blog`


## Instruction to login

1. Create new user

```
POST http://localhost:3030/users
{
  "user": {
    "email": "casl@medium.com",
    "password": "password"
  }
}
```

2. Create new session

```
POST http://localhost:3030/session
{
  "session": {
    "email": "casl@medium.com",
    "password": "password"
  }
}

201 Created
{ "accessToken": "...." }
```

3. Put access token in `Authorization` header for all future requests


## Routes

* /posts
* /posts/:id/comments
* /users
* /session

To create or update an entity you need to send parameters in wrapper object, which key equals entity name.
For example, to create new user you send:

```json
{
  "user": {
    "....": "...."
  }
}
```

to create a post you send

```json
{
  "post": {
    "....": "...."
  }
}
```

[casl-express-example]: https://medium.com/@sergiy.stotskiy/authorization-with-casl-in-express-app-d94eb2e2b73b
[casl-ability]: https://github.com/stalniy/casl/tree/master/packages/casl-ability
[casl-mongoose]: https://github.com/stalniy/casl/tree/master/packages/casl-mongoose

