const { Router } = require("express");
const router = Router();
const driverRouters = require("./driver");
const teamRouters = require("./team");

router.use("/", driverRouters);
router.use("/drivers", driverRouters);
router.use("/teams", teamRouters);

module.exports = router;
