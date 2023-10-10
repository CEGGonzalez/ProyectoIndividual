const {  getDriversName, getDriversAll, getDriverById, deleteDriver, updateDriver, createDriver } = require('../controllers/driverController')



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
    res.status(400).json({ error: error.message });
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
  const { name, lastname, description, image, nationality, birthdate, team } =
    req.body;
  try {
    const arrTeams = team.split(", ");
    const newDriver = await createDriver(
      name,
      lastname,
      description,
      image,
      nationality,
      birthdate,
      arrTeams
    );
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDriverHandler = async (req,res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
      const updatedDriver = await updateDriver(id, updateData);
      res.status(200).json(updatedDriver);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

const deleteDriverHandler = async (req,res) => {
  const { id } = req.params;
  try {
      const driverDeteled = await deleteDriver(id.trim());
      res.status(200).send(driverDeteled)
  } catch (error) {
      res.status(400).json( { error: error.message })
  }
}

module.exports = {
  getIdHandler,
  getAllNameHandler,
  postHandler,
  deleteDriverHandler,
  updateDriverHandler,
};
