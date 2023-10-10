const {getDriverByName, getAllDrivers} = require('../../controllers/drivers/getAllDrivers');

const driversByNameHandler = async (req,res) => {
    const { name } = req.query;

    try {
        if(name){
        const driverByName = await getDriverByName(name);
        res.status(200).json(driverByName);
    }else{
       const response = await getAllDrivers() 
       res.status(200).json(response);
    }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = driversByNameHandler;