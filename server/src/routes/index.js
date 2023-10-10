const { Router } = require("express");
const driverRouters = require("./driver");
const teamRouters = require("./team");

const router = Router();

router.use("/drivers", driverRouters);
router.use("/teams", teamRouters);

module.exports = router;
