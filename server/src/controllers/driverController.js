const axios = require("axios");
const API_URL = "http://localhost:5000/drivers";
const { Driver } = require("../db");

const addImage = (arr) => {
  const challenged = arr.map((driver) => {
    if (!driver.image?.url.length) {
      return {
        ...driver,
        image: {
          url: "https://www.bing.com/images/blob?bcid=snECf-3hxB8GNx2twNo7Sv7cuj6E.....0s"
        },
      };
    } else {
      return driver;
    }
  });
  return challenged;
};

const getDriversAll = async () => {
  const response = await axios.get(`${API_URL}`);
  return addImage(response.data);
};

const getDriversName = async (name) => {
  const response = await axios.get(`${API_URL}`);
  
  const filteredDrivers = response.data.filter((driver) =>
  driver.driverRef.toLowerCase().includes(name.toLowerCase())
  );
  
  const filteredDB = await Driver.findAll({ where: { lastName: name } });
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

const createDriver = async (name, lastName, description, image, nationality, dateOfBirth, teams) => {
  
  if (!name || !lastName || !description || !image || !nationality || !dateOfBirth|| !teams) {
    return 'Faltan datos del conductor' 
  }
  return await Driver.create({ name, lastName, description, image, nationality, dateOfBirth, teams });
  
}

module.exports = { 
  getDriversAll,
  getDriversName,
  getDriverById,
  createDriver,
 };