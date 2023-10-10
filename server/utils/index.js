const infoCleaner = (arr) => {
  return arr.map((user) => {
      return{
          id:user.id,
          name:`${user.name.forename} ${user.name.surname}`,
          description:user.description,
          image:user.image.url,
          nationality:user.nationality,
          birthDate:user.dob,
          teams:user.teams,
  }
 })
};

const addImage = (arr) => {
  const challenged = arr.map((driver) => {
    if (!driver.image?.url.length) {
      return {
        ...driver,
        image: {
          url: "https://img.freepik.com/foto-gratis/coche-deportivo-brillante-conduciendo-pista-deportiva-iluminada-ia-generativa_188544-53590.jpg",
        },
      };
    } else {
      return driver;
    }
  });
  return challenged;
};

module.exports= {infoCleaner, addImage}