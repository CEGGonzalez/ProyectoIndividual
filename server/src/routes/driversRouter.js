const { Router } = require('express');

const driversByNameHandler = require('../handlers/drivers/driversByNameHandler');
const driversByIdHandler = require('../handlers/drivers/driversByIdHandler');
const postHandler = require('../handlers/drivers/postHandler');
const deleteDriverHandler = require('../handlers/drivers/deleteDriverHandler');
const updateDriverHandler = require('../handlers/drivers/updateDriverHandler');

const driversRouter = Router();
driversRouter.get('/', driversByNameHandler);
driversRouter.get('/:id', driversByIdHandler);
driversRouter.post('/', postHandler)
driversRouter.delete('/:id', deleteDriverHandler)
driversRouter.put('/:id', updateDriverHandler)

module.exports = driversRouter;