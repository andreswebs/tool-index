# Tool Index

This is an example CRUD API written in Node.js. The API exposes endpoints for storing and retrieving information about tools.

See the [API documentation](api-doc/tool-index-api.md) for a description of available endpoints.

## Getting Started

### **Prerequisites**

The project can be run either using [Node.js](https://nodejs.org/en/) or using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

#### _For Running with Node.js_ :

[Node.js](https://nodejs.org/en/) >= 10.16.0 LTS must be installed.

[MongoDB](https://www.mongodb.com/) is used as a database. You can follow the instructions to [install it locally](https://docs.mongodb.com/manual/administration/install-community/) on your system.

Alternatively, you can use a managed MongoDB service such [MongoDB Atlas](https://www.mongodb.com/atlas/database) by creating an account on that platform and following their instructions to set up a database.

Once you have access to a MongoDB database, save the database URI in a file named `.env` at the root of the project, following the example in the `.env.example` file.

#### _For running with Docker and docker-compose_ :

Docker >= 18.06 and Docker Compose >= 1.24 must be installed in the system. First follow the instructions to [install Docker](https://docs.docker.com/install/#server), then [install Docker Compose](https://docs.docker.com/compose/install/).

In this case a MongoDB image will be set up automatically by docker-compose and no further configuration is required.

### **Installing**

If you are running the project with Docker, no further installation is required.

If you are running the project with Node.js, use the command to install dependencies:

```sh
npm install
```

### Running tests

For Docker, run:

```sh
npm run test:dckr
```

For Node.js, run

```sh
npm run test
```

## Development with Docker

Run `npm run dev:dckr` to start the containers. Modifications in the project directory are mirrored in the API container, and database data is persisted in the `./db-data` directory. The API will be available on `localhost:3000`.

## Clean up containers and images

Run `npm run clean:dckr` to remove exited containers and dangling images from the system.

## Built with

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Express](http://expressjs.com/) - Web framework for Node.js
* [MongoDB](https://www.mongodb.com/) - Document database
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
* [Mocha](https://mochajs.org/) - JavaScript test framework
* [Chai](https://www.chaijs.com/) - JavaScript assertion library
* [Docker](https://www.docker.com/) - Containerization engine
* [swagger-markdown](https://www.npmjs.com/package/swagger-markdown) - CLI script to turn swagger yaml into markdown files

## Author

**Andre Silva** [adev@disroot.org](mailto:adev@disroot.org)

## License

This project is licensed under the [Unlicense](UNLICENSE.md).

## References

Praveen Durairaj, [An Exhaustive Guide to Writing Dockerfiles for Node.js Web Apps](https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4/), 07 February 2018

Various Authors, [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md), 2018
