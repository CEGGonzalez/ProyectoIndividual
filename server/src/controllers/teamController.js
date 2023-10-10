const axios = require("axios");
const { Team } = require("../db");


module.exports = getByTeams = async () => {

  const response = (await axios.get("http://localhost:5000/drivers")).data;
  const teamsSet = new Set(); // Conjunto para llevar un registro de equipos agregados
  
  for (const driver of response) {
    if (driver.teams) {
      const teams = driver.teams.split(',');
      
      // Recorre los equipos del conductor
      for (const team of teams) {
        // Elimina los espacios en blanco del equipo
        const teamTrimmed = team.trim();
        // Verifica si el equipo ya se ha agregado a la BD
        if (!teamsSet.has(teamTrimmed)) {
          // Agrega el equipo a la BD
          await Team.create({ name: teamTrimmed });
          teamsSet.add(teamTrimmed); // Agrega el equipo al conjunto
        }
      }
    }
  }
  
  console.log('Equipos agregados con éxito.');
  return 'Proceso completado';
   
  };