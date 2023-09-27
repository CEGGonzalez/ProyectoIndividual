const axios = require("axios");
const apiUrl = "http://localhost:5000/drivers";
const { Teams } = require("../db");

const fs = require('fs');

const getByTeams = async (req, res) => {
    try {
        const teams = await db.Team.findAll();
        if(teams.length === 0) {
            try {
                const data = fs.readFileSync('../../api/db.json', 'utf8');
                const apiTeams = JSON.parse(data);
                for (const apiTeam of apiTeams) {
                    const existingTeam = await db.Team.findOne({
                      where: { teams: apiTeam.name },
                    });
                    if (!existingTeam) {
                      await db.Team.create(apiTeam);
                    }
                  }
                const uniqueTeams = await db.Team.findAll();
                res.status(200).json(uniqueTeams);
              } catch (error) {
                throw new Error('Error reading db.json');
              }
        }
        else {res.status(200).json(teams)};
    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

module.exports = getByTeams;