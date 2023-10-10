const updateDriver = require('../../controllers/drivers/updateDriver')

const updateDriverHandler = async (req,res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedDriver = await updateDriver(id,updateData);
        res.status(200).json(updatedDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = updateDriverHandler;