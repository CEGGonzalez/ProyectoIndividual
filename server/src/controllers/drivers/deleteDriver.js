const { Driver } = require('../../db');

const deleteDriver = async (id) => {
  console.log(id);
  const driverToDelete = await Driver.findByPk(id);

  if (!driverToDelete) {
    throw new Error("Driver no existe");
  }

  await driverToDelete.destroy();
  return driverToDelete;
};

module.exports = deleteDriver;
