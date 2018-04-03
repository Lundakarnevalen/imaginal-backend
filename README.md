# Backend for lundakarnevalen 2018

The backend for the quadrennial carnival in Lund, Sweden. Template for readme https://gist.github.com/PurpleBooth/109311bb0361f32d87a2.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* MySQL > 5.7
* Node 8.9 LTS

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

Init and seed database tables
```
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
```

Config application parameters
```
export MYSQL_USER='user'
export MYSQL_PASS='passwd'
export TOKEN_SECRET='secret'
```

Run server
```
npm start
```
## Scripts
If you have username root and no password on mysql, you can use
```
sh dbinit
```
On mac or linux (maybe). If you don't want to make a backup, use.

```
sh noBackupinit
```

## Running the tests


Execute
```
./testsetup
```
to setup the test environment followed by
```
npm test

```
to run the tests

## Run API test
```
npm run postman
```
make sure server is running and you have env variables

## Generate API documentation
```
npm run apidoc
open doc.html
```
## API codes
200: OK
400: User sent bad information or missing parameters
401: User does not have appropriate privileges
404: No such end point
500: Internal error, not caused by user

## Docker

Docker is a packaging tool that is very useful and uses the concept of 
"containers". It creates a virtual container from your code and can run 
everywhere.

The Dockerfile is used to describe how to create a image-file for the project.
We use a pre-created image made for node version 8.9 as a base. You can think 
of it as a virtual machine with npm pre-installed. 

We can expect that the project will run identical on whatever machine you are 
on (mac, linux or windows) if you use a docker container. 

The docker-compose file is a bit more woaw. Here we instruct docker that we
want three containers that we call; db, api. And they point to 
the imagefile of a mysql-server and the 
dockerfile of imaginal-backend.  

You could also just manually start three containers for db, api 
by using the Dockerfiles and connecting them, but docker-compose makes it a
lot easier!

### Use docker

The first step is to install docker (Community edition):
[https://docs.docker.com/install/]{https://docs.docker.com/install/}

Then in the terminal when in the folder of the project run;
```
# This will download the base-images and create images for the database and
# backend.
docker-compose build

#When everything is built, you can start db and backend by running
docker-compose up -d # -d means in detached mode. 

# To see logs run;
docker-compose logs
```

You can now rebuild and update images for specific project like;
```
docker-compose build api

docker-compose up api
```

If you want to see which containers are running you can use the command `ps`
```
docker-compose ps
>   Name             Command             State                Ports              
> -----------------------------------------------------------------------------
> api_1        npm start          Up      0.0.0.0:3000->3000/tcp, 8081/tcp
> db_1         docker.sh mysqld   Up      0.0.0.0:8999->3306/tcp          
```

## Conventions
* [standard.js](https://github.com/standard/standard) - JavaScript Style used 

## Built With
* [node.js](https://github.com/nodejs/node) - Chosen backend framework.

## License

This project is licensed under the MIT License.
