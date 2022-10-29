# README
A RESTful API using TypeScript, Node, Express, Sequelize, bcrypt, JWT and for tests were used Chai and Sinon. In this project, you will find the backend of TFC, a sportslike website about soccer matches and leaderboards.

# Endpoints
* /login to login as admin or user
* /login/validate to token validation
* /teams to list all teams in the championship
* /matches to create, update scoreboard and list matches (can be filtered by status adding ?=inProgress=true or ?=inProgress=false)
* /matches/:id/finish to end a match
* /leaderboard to get team by rank in the championship


# Tech specs
* Software Architecture: Model, Service, Controller (Layered Architecture)
* Node 16 / Express 4.17.1
* Sequelize 6.3.4 / mysql2 2.1
* JWT 8.5.1
* bcrypt 2.4.3
* chai 4.3
* sinon 13

# Usage and basic commands
1) Clone the repository to your local: 
`git clone git@github.com:lionffl/trybe-futebol-club.git`
2) Installing dependecies:
`npm install`
3) Config the enviroment by renaming `env.example` to `.env` and setting the variables
4) Running containers (you have to be in main project directory)
`npm run compose:up`
Alternatively, you can run containers in dev mode:
`npm run compose:up:dev`
5) By default, after db and backend cointainer are up, you can access them through ports 3002 and 3001, in that order.
