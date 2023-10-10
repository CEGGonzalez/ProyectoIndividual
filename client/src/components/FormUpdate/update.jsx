import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from './update.module.css';
import { validate } from './validations';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const noImage = "https://i.imgur.com/Ks7SbZt.png"

function Create() {
  const teams = useSelector((state) => state.teams);
  const drivers = useSelector((state) => state.allDrivers);
  const { id } = useParams();
  const teamInputRef = useRef(null);
  const history = useHistory();
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [customTeam, setCustomTeam] = useState("");
  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: []
  });
  const [errors, setErrors] = useState({
    forename: "Nombre requerido",
    surname: "Apellido requerido",
    description: "Descripcion",
    image: "Imagen por defecto",
    nationality: "Nacionalidad requerida",
    dob: "Fecha de nacimiento requerida",
    teams: "Teams requerido",
    message: "",
    ok: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const data = response.data;
        if (Object.keys(data).length === 0) {
          setNewDriver(null);
        } else {
          const formattedData = {
            ...data,
            image: data.createInDb ? data.image : data.image.url
          };
          setErrors({ ok: true });
          setNewDriver(formattedData);
          setSelectedTeam(formattedData.Teams);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddTeam = () => {
    const team = teamInputRef.current.value || customTeam;
    if (team && !newDriver.teams.includes(team)) {
      setSelectedTeam([...selectedTeam, team]);
      setCustomTeam("");
      teamInputRef.current.value = "";
    }
  };

  const handleTeamChange = (event) => {
    const selectedDriver = event.target.value;
    if (!newDriver.teams.includes(selectedDriver)) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: [...prevState.teams, selectedDriver]
      }));
      setSelectedTeam((prevState) => [...prevState, selectedDriver]);
    }
  };

  useEffect(() => {
    if (selectedTeam) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: selectedTeam
      }));
      validate(newDriver);
    }
  }, [selectedTeam, newDriver]);

  const handleCustomTeamChange = (event) => {
    setCustomTeam(event.target.value);
  };

  const handleUndo = () => {
    if (selectedTeam.length > 0) {
      const updatedTeam = selectedTeam.slice(0, -1);
      setSelectedTeam(updatedTeam);
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setNewDriver((prevState) => ({
      ...prevState,
      [name]: value
    }));
    const updatedErrors = validate({
      ...newDriver,
      [name]: value
    });
    setErrors(updatedErrors);
  };

  const imageUrlChange = () => {
    const url = document.getElementById("imageUrlInput").value;
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (url && regex.test(url)) {
      setNewDriver({ ...newDriver, image: url });
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: ""
      }));
    } else {
      setNewDriver({ ...newDriver, image: "" });
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Invalid URL, please correct"
      }));
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(newDriver);
    if (drivers.some(driver => driver.forename.toLowerCase() === newDriver.forename.toLowerCase() && driver.surname.toLowerCase() === newDriver.surname.toLowerCase())){
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Error: Driver exists!",
      }));
      return;
    }
    if (errors.ok) {
      const formattedDriver = {
        forename: newDriver.forename,
        surname: newDriver.surname,
        description: newDriver.description,
        image: newDriver.image,
        nationality: newDriver.nationality,
        dob: newDriver.dob,
        teams: selectedTeam.join(", ")
      };
      axios.post('http://localhost:3001/drivers', formattedDriver)
        .then(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            ok: false,
            message: "The driver was saved correctly"
          }));
          setTimeout(() => {
            history.push("/home");
          }, 1500);
        })
        .catch(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            message: "Error: NOT saved correctly"
          }));
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
       <div >
          {!newDriver.image && <img src={noImage} alt="No image" className={styles.characterImage} />}
          {newDriver.image && <img src={newDriver.image}  alt="Pic Driver" />}
        </div>
        
        <div className={styles.formField}>
            <label style={{color:"black"}}>Imagen URL:</label>
            <input type="text" title="URL" defaultValue={newDriver.image} onChange={imageUrlChange} id="imageUrlInput"/>
            {errors.image ? (
              <span className={styles.errorIcon} title={errors.image}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
      </div>

      <div className={styles.main}>
        <form className={styles.form}>
        <h2 style={{ marginTop: "-5px", marginBottom: "35px", color: "white" }}>{errors.ok}</h2>
          
          <div className={styles.formField}>
            <label style={{marginLeft:"0px"}}>Nombre: </label>
            <input style={{width:"150px"}} name="forename" type="text" defaultValue={newDriver.forename} onChange={handleChangeInput}/>
            {errors.forename ? (
              <span className={styles.errorIcon} title={errors.forename}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
            <label style={{marginLeft:"5px"}}>Apellido: </label>
            <input style={{width:"120px"}} name="surname" defaultValue={newDriver.surname} type="text" onChange={handleChangeInput}/>
            {errors.surname ? (
              <span className={styles.errorIcon} title={errors.surname}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          
            <label >F.N: </label>
            <input style={{width:"75px"}} defaultValue={newDriver.dob} name="dob" type="text" onChange={handleChangeInput}/>
            {errors.dob ? (
              <span className={styles.errorIcon} title={errors.dob}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
          
          <div className={styles.formField}>
            <label >Nacionalidad: </label>
            <input style={{ width: "75px" }} defaultValue={newDriver.nationality} name="nationality" type="text" onChange={handleChangeInput} />
            {errors.nationality ? (
              <span className={styles.errorIcon} title={errors.nationality}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formField}>Descripcion: </label>
            <textarea style={{width:"75%", height:"90px"}} defaultValue={newDriver.description} name="description" cols="100" onChange={handleChangeInput}/>
            {errors.description ? (
              <span className={styles.errorIcon} title={errors.description}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formField} style={{marginLeft:"-46px", marginTop:"23px"}}>Escuderia:</label>
            <select
              name="teams"
              value={newDriver.teams}
              onChange={handleTeamChange}
              className={styles.formField}
            >
              <option value="">Seleccione Escuderia</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            
            <label className={styles.formField} style={{marginLeft:"10px", marginTop:"23px"}}>Escuderia Personalizada:</label>
            <input type="text" ref={teamInputRef} value={customTeam} onChange={handleCustomTeamChange} />
            <button onClick={handleAddTeam} className={styles.btnIcono} style={{marginLeft:"40px", marginTop:"8px"}}>+</button>
            </div>
            <div>
              <textarea
                style={{marginLeft:"100px", width:"69%", height:"40px"}}
                value={selectedTeam.map(team => team.name).join(", ")}
                readOnly
              />
              <button className={styles.btnIcono} onClick={handleUndo}>{'\u21A9'}</button>

              {!selectedTeam.length ? (
                <span className={styles.errorIcon} title="No teams selected, one required">
                  {'\u274C'}
                </span>
              ) : (
                <span className={styles.validIcon}>✅</span>
              )}
          </div>
          
          <div className={styles.formField}>
              <div style={{ display: 'inline-block' }}>
                  <button
                      type="submit"
                      style={{ marginTop: '10px', marginLeft: '10px' }}
                      onClick={handleSubmit}
                      disabled={!errors.ok || selectedTeam.length === 0}
                      className={styles.submitButton}
                  >
                      Guardar
                  </button>
              </div>

              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <button
                      onClick={handleCancel}
                      style={{ marginTop: '10px' }}
                      className={styles.cancelButton}
                  >
                      Cancelar
                  </button>
              </div>
          </div>
          <div className={styles.messageContainer}>
                    {errors.message !== "" && errors.message ? (
                        <span className={styles.message}>
                            {errors.message}
                        </span>
                    ) : (
                        <span style={{color:"red"}}>{errors.message}</span>
                    )}
                </div>
        </form>
      
    </div>
    </div>
  )
}

export default Create;

