/******************************/
/* HANDLER: by ID de piloto   */
/******************************/
const getDriverById = require('../../controllers/drivers/getDriverById');

const driversByIdHandler = async (req,res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"
    try {
        const driverById = await getDriverById(id, source);
        res.status(200).json(driverById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = driversByIdHandler;