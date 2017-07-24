# Example of CASL integration in expressjs app

[CASL](https://stalniy.github.io/casl/) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access.

This is an example application which shows how integrate CASL in blog application. There are 3 entities:
* User
* Post
* Comment

Application uses `passport-jwt` for authentication.
Permission logic (i.e., abilities) are define in `src/auth/abilities.js`. Rules can be specified for authenticated and anonymous users, so potentially it's quite easy to give access anonymous users to leave comments in blog.
The main logic is built on top of modules (`src/modules`)

**Warning**: this code is not production ready and may have some bugs or use bad practises (e.g. it stores passwords with hashing)
