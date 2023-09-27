const { createDriver, getDriversName, getDriversAll, getDriverById } = require('../controllers/driverController')
const getAllNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const filteredDrivers = await getDriversName(name);
      res.status(200).json(filteredDrivers);
    } else {
      const allDrivers = await getDriversAll();
      res.status(200).json(allDrivers);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api"
  try {
    const response = await getDriverById(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

const postHandler = async (req, res) => {
  const { name, lastName, description, image, nationality, dateOfBirth, teams } = req.body
  try {
    const response = await createDriver(name, lastName, description, image, nationality, dateOfBirth, teams); 
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIdHandler,
  getAllNameHandler,
  postHandler,
};
