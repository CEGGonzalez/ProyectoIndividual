const axios = require("axios");
const { Driver, Team } = require('../../db');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const noImage = "https://img.freepik.com/foto-gratis/coche-deportivo-brillante-conduciendo-pista-deportiva-iluminada-ia-generativa_188544-53590.jpg"

const infoCleaner = (arr) => {
    return arr.map((driver) => {
            return {
                id: driver.id,
                forename: driver.name.forename,
                surname: driver.name.surname,
                description: driver.description || "",
                image: driver.image.url || noImage,
                nationality: driver.nationality,
                dob: driver.dob,
                teams: driver.teams,
      
            };
        })
    }
    
const getAllDrivers = async() => {
    const allDriversDb = await Driver.findAll({
        include: {
            model: Team,
            attributes: ["id", "name"],
            through: {
            attributes: [],
            },
        }
    });
    const infoApi = (await axios("http://localhost:5000/drivers")).data;
    const driverApi = infoCleaner(infoApi);
    
    return [...allDriversDb, ...driverApi]
}
// const getDriverByName = async(forename) =>{
//     const infoApi = (await axios("http://localhost:5000/drivers")).data;
//     const driverApi = infoCleaner(infoApi);

//     const driversFiltered = driverApi.filter((driver) => 
//         driver.forename.toLowerCase().includes(forename.toLowerCase()));
//         if (getDriverByName.length) {
            
            
//             const driverDB = await Driver.findAll({where: {forename : forename}});
            
//             return [...driversFiltered, ...driverDB];
//         }
//             return getDriverByName.slice(0, 15);
    
// }

const getDriverByName = async (name) => {
    const infoApi = (await axios("http://localhost:5000/drivers")).data;
    const driverApi = infoCleaner(infoApi);

    const exact = [];
    const partial = [];

    const lowerName = name.toLowerCase();

    for (const driver of driverApi) {
        const driverForenameLower = driver.forename.toLowerCase();
        if (driverForenameLower.startsWith(lowerName)) {
            exact.push(driver);
        } else if (driverForenameLower.includes(lowerName)) {
            partial.push(driver);
        }

        if (exact.length >= 15) {
            break;
        }
    }

    const combinedResults = [...exact, ...partial].slice(0, 15);

    if (combinedResults.length === 0) {
        const driverDB = await Driver.findAll({
            where: {
                forename: {
                    [Sequelize.Op.iLike]: `%${forename}%`
                }
            }
        });
        return driverDB.slice(0, 15);
    }

    return combinedResults;
}

    

module.exports = { getAllDrivers, getDriverByName };