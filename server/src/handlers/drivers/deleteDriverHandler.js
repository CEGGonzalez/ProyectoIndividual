const deleteDriver = require('../../controllers/drivers/deleteDriver')

const deleteDriverHandler = async (req,res) => {
    const { id } = req.params;
    try {
        const driverDeteled = await deleteDriver(id.trim());
        res.status(200).json(driverDeteled)
    } catch (error) {
        res.status(400).json( { error: error.message })
    }
}

module.exports = deleteDriverHandler;
