# Tool Index

This is an example CRUD API written in TypeScript on NodeJS. The API exposes
endpoints for storing and retrieving information about tools.

See the [API specification](tool-index-api.spec.yml) for a description of
available endpoints.

## Prerequisites

[Node.js](https://nodejs.org/en/) >= 18.x.x (LTS) must be installed.

[MongoDB](https://www.mongodb.com/) is used as a database. You can follow the
instructions to
[install it locally](https://docs.mongodb.com/manual/administration/install-community/)
on your system, or run it locally using the
[official MongoDB Docker image](https://hub.docker.com/_/mongo).

Alternatively, you can use a managed MongoDB service such
[MongoDB Atlas](https://www.mongodb.com/atlas/database) by creating an account
on that platform and following their instructions to set up a database.

Once you have access to a MongoDB database, save the database URI in a file
named `.env` at the root of the project, following the example in the
`.env.example` file.

## Installing dependencies locally

```sh
npm install
```

## Running tests

```sh
npm run test
```

## Built with

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express](http://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Document database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [Mocha](https://mochajs.org/) - JavaScript test framework
- [Chai](https://www.chaijs.com/) - JavaScript assertion library
- [Docker](https://www.docker.com/) - Containerization engine

## Author

**Andre Silva** - [@andreswebs](https://github.com/andreswebs)

## License

This project is licensed under the [Unlicense](UNLICENSE.md).
