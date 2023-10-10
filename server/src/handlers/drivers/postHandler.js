const createDriver = require("../../controllers/drivers/createDriver");

const postHandler = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teams } =
    req.body;
  try {
    const arrTeams = teams.split(", ");
    const newDriver = await createDriver(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      arrTeams
    );
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postHandler;
