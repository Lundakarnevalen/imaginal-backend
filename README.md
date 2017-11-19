# Backend for lundakarnevalen 2018

The backend for the quadrennial carnival in Lund, Sweden. Template for readme https://gist.github.com/PurpleBooth/109311bb0361f32d87a2.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* MySQL > 5.7
* Node > 8

### Installing

Install dependencies
```
npm install
```

Create database "karneval"
```
mysql -u<user> -p<password>
CREATE DATABASE karneval;
```

Init database tables
```
./node_modules/.bin/sequelize db:migrate
```

Config application parameters
```
export MYSQL_USER='user'
export MYSQL_PASSWORD='passwd'
export TOKEN_SECRET='secret'
```

Run server
```
npm start
```

## Running the tests

```
npm test
```

## Run API test
npm run postman
make sure server is running and you have env variables

## Conventions
* [standard.js](https://github.com/standard/standard) - JavaScript Style used 

## Built With
* [node.js](https://github.com/nodejs/node) - Chosen backend framework.

## License

This project is licensed under the MIT License.
