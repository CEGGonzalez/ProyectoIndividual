const axios = require("axios");
const API_URL = "http://localhost:5000/drivers";
const { Driver, Team } = require("../db");
const  {infoCleaner, addImage}  = require('../../utils/index')


const getDriversAll = async () => {
  const response = (await axios.get("http://localhost:5000/drivers/")).data 
    
  const infoApi = infoCleaner(response);
  const driverApi = addImage(infoApi);
  
  const driverDb = await Driver.findAll();

  return[...driverDb, ...driverApi];

};

const getDriversName = async (name) => {
  const response = await axios.get(`${API_URL}`);
  
  const filteredDrivers = response.data.filter((driver) =>
  driver.driverRef.toLowerCase().includes(name.toLowerCase())
  );
  
  const filteredDB = await Driver.findAll({ where: { name: name }});
  if (filteredDrivers.length === 0 && filteredDB.length === 0) {
    throw Error("No se encontraron drivers.");
  }
  const challengedFilters = addImage(filteredDrivers);
  
  return [...challengedFilters.slice(0, 15), ...filteredDB];
};

const getDriverById = async (id, source) => {
  const driverDB = source === "api" 
    ? (await axios.get(`${API_URL}/${id}`)).data 
    : await Driver.findByPk(id)
    return driverDB
}

const createDriver = async (name,lastname,description,image,nationality,birthdate, arrTeams) => {
  const existingDriver = await Driver.findOne({
    where: {
      name,
      lastname,
    },
  });

  if (existingDriver) {
    const error = new Error('El piloto  ya existe');
    error.status = 400; 
    throw error;
  }

const newDriver = await Driver.create({
    name,
    lastname,
    description,
    image,
    nationality,
    birthdate
})

for (const teamName of arrTeams) {
  const [team, created] = await Team.findOrCreate({
    where: { name: teamName },
  });
  await newDriver.addTeam(team);
}

  return newDriver;
}


const updateDriver = async (id, updateData) => {
  const { Team, ...driverData } = updateData; //Extraigo los Teams y el resto lo meto en driverData con el operador de propagacion '...'
  const driver = await Driver.findByPk(id);

  if (!driver) {
    throw new Error("Driver no reconocido");
  }

  await driver.update(driverData);
  await driver.setTeams([]); //elimino las asociaciones de teams por si cambio alguna

  if (Team && Team.length > 0) { //las vuelvo a crear si hay una nueva
    for (const teamData of Team) { //recorro todos los team
      const { name } = teamData.DriverTeam; //extraigo el nombre del team 

      if (name) {
        let [team] = await Team.findOrCreate({ // destructuro el array porque el findOrCreate devuelve dos elemento el registro team y un bool si se creo o no
          where: { name },
          defaults: { name } //sino encuentro el name, me quedo con el name para luego guardarlo
        });

        await driver.addTeam(team); 
      }
    }
  }
};

const deleteDriver = async (id) => {
  console.log(id);
  const driverToDelete = await Driver.findByPk(id);
  
  if (!driverToDelete) {
    throw new Error("Driver no existe");
  }
  await driverToDelete.destroy();
  return driverToDelete;
};

module.exports = { 
  getDriversAll,
  getDriversName,
  getDriverById,
  createDriver,
  deleteDriver,
  updateDriver,
  
 };