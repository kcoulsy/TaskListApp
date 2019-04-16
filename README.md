# TaskListApp

## Installation

Install the following packages globally (or update your package.json script to use locally)
nodemon (for server reloading on save)
mocha (for testing)
eslint (linting)
prettier (code styling)

> npm i -g nodemon mocha eslint prettier

Make sure you have MongoDB installed.
[MongoDB Community Server](https://www.mongodb.com/download-center/community)

Make sure your path to your development/testing MongoDB is set in ./server/config/config.json

Generate new JWT Keys (just needs to be random strings) and update ./server/config/config.json

Install the node packages 
> npm update && npm install

## Running the application

Start your MongoDB Database

Start your Express Server with 
> webpack-start

Start your Webpack Server with
> server-start

Testing 
> test
or to have it watch for changes
> test-watch

Linting code (with quick fix)
> lint

Building with webpack
> build:dev

## Development notes

The project follows the [Airbnb style guide](https://github.com/airbnb/javascript). Eslint and prettier will handle most cases for this.
