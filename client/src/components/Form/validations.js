export const validate = (newDriver) => {
  
  let errors = {
    forename: "",
    surname: "",
    description: "",
    nationality: "",
    image:"",
    dob: "",
    ok: true
  };

  if (!newDriver.image) {
    
    errors.image = "URL image default";
  }

  if (!newDriver.forename) { 
    errors.ok = false;
    errors.forename = "Nombre requerido";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(newDriver.forename)) {
    errors.ok = false;
    errors.forename = "El nombre solo acepta letras";
  } else if (newDriver.forename.length > 25) {
    errors.ok = false;
    errors.forename = "Un maximo de 25 caracteres";
  }

  if (!newDriver.surname) { 
    errors.ok = false;
    errors.surname = "El apellido es requirido";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(newDriver.surname)) {
    errors.ok = false;
    errors.surname = "Solo se permiten letras";
  } else if (newDriver.surname.length > 20) {
    errors.ok = false;
    errors.surname = "20 caracteres maximo";
  }

  if (!newDriver.dob) { 
    errors.ok = false;
    errors.dob = "Fecha de nacimiento requerida";
  } else if (!/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(newDriver.dob)){
    errors.ok = false;
    errors.dob = "Solamente acepta este formato dd/mm/aaaa";
  }   

  if (!newDriver.nationality) { 
    errors.ok = false;
    errors.nationality = "Nacionalidad requerida";
  } else if (!/^[a-zA-Z]+$/u.test(newDriver.nationality)) {
    errors.ok = false;
    errors.nationality = "Solo letras";
  } else if (newDriver.nationality.length > 30) {
    errors.ok = false;
    errors.nationality = "Maximo 30 caracteres";
  }

  if (!newDriver.description) { 
    errors.ok = false;
    errors.description = "Descripcion requerida";
  } 


  return errors;
};