const { Router } = require("express");
const getTeams  = require("../handler/teamsHandler");

const teamRouters = Router();

teamRouters.get("/", getTeams);

module.exports = teamRouters;