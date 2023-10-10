const { Router } = require("express");
const {
  getAllNameHandler,
  getIdHandler,
  postHandler,
  deleteDriverHandler,
  updateDriverHandler
} = require("../handler/handlerDriver");

const driverRouters = Router();

driverRouters.get("/", getAllNameHandler);
driverRouters.get("/:id", getIdHandler);
driverRouters.post("/", postHandler );
driverRouters.put('/:id', updateDriverHandler);
driverRouters.delete("/:id", deleteDriverHandler);

module.exports = driverRouters;
