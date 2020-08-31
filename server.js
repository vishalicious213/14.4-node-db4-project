const express = require('express');
const server = express();
const recipes = require('./routers/recipes-router');
const instructions = require('./routers/instructions-router');

server.use(express.json());
server.use('/recipes', recipes);
server.use('/instructions', instructions);

module.exports = server;