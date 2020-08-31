const express = require('express');
const server = express();
const recipes = require('./routers/recipes-router');

server.use(express.json());
server.use('/recipes', recipes);

module.exports = server;