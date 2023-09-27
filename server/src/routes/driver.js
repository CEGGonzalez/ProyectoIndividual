const { Router } = require("express");
const {
  getAllNameHandler,
  getIdHandler,
  postHandler,
} = require("../handler/handlerDriver");

const driverRouters = Router();

driverRouters.get("/", getAllNameHandler);
driverRouters.get("/:id", getIdHandler);
driverRouters.post("/", postHandler );

module.exports = driverRouters;
