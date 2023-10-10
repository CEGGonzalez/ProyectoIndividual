const axios = require("axios");
const { Driver, Team } = require('../../db');

const getDriverById = async (id) => {
    let driverById;

    if (isNaN(id)) {
        driverById = await Driver.findByPk(id, { include: Team });
        if (!driverById) { //no hay pilotos en la DB con es id
            throw new Error(`No se encuentra el ${id} en la BD`);
        }
    } else {
        try {
            const response = await axios.get(`http://localhost:5000/drivers/${id}`);
            driverById = response.data;
        } catch (error) { //no hay pilotos en la API con ese id
            throw new Error(`No se encuentra el ${id} en la API`);
        }
    }

    return driverById;
}

module.exports = getDriverById;




