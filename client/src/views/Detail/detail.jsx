import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions/index';
import styles from "./detail.module.css";

const noImage = "https://img.freepik.com/foto-gratis/coche-deportivo-brillante-conduciendo-pista-deportiva-iluminada-ia-generativa_188544-53590.jpg";

function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const isDBDriver = driver.createInDb;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const data = response.data;

        if (Object.keys(data).length === 0) {
          setDriver(null);
        } else {
          const image = isDBDriver ? data.image : data.image.url;
          setDriver({ ...data, image });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const formatTeams = (teams) => {
    if (typeof teams === 'string') {
      return teams;
    } else if (Array.isArray(teams)) {
      return teams.map((team) => team.name).join(', ');
    } else {
      return '';
    }
  };

  const deleteDriver = async () => {
    try {
      await axios.delete(`http://localhost:3001/drivers/${id}`);
      await dispatch(getDrivers());
      alert("The driver was removed");
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteButton = isDBDriver ? (
    <button className={styles.deleteButton} onClick={deleteDriver}>
      <span title='Delete the Driver from the database' role="img" aria-label="Foto" className={styles.imgIcon}>🗑️</span>
    </button>
  ) : (
    <button className={styles.deleteButton} disabled>
      <span title='Cannot delete, belongs to API' role="img" aria-label="Foto" className={styles.imgIcon}>🗑️</span>
    </button>
  );

  // const updateButton = isDBDriver ? (
  //   <Link to={`/update/${driver.id}`} className={styles.updateButton} title="Update Driver">
  //     <span role="img" aria-label="Foto" className={styles.imgIcon}>↻</span>
  //   </Link>
  // ) : (
  //   <button className={styles.updateButton} disabled>
  //     <span role="img" aria-label="Foto" className={styles.imgIcon} title='update info of driver' disabled>↻</span>
  //   </button>
  // );

  return (
  <div className={styles.detailContainer}>
      {/* {updateButton} */}
      {deleteButton}
      <Link to="/home" className={styles.closeButton} title="Close Card">
        <span role="img" aria-label="Foto" className={styles.imgIcon}>&#10005;</span>
      </Link>
    <div className={styles.thecard}>
      

      {driver && Object.keys(driver).length !== 0 ? (
        <div className={styles.thefront}>
          <h4 className={styles.id}>{driver.id}</h4>
          <h4 className={styles.nombre}>{driver.name ? `${driver.name.forename} ${driver.name.surname}` : `${driver.forename} ${driver.surname}`}</h4>
          <img src={driver.image || noImage} alt="Driver" className={styles.imagen} />
          <h5 className={styles.nacionalidad}>{driver.nationality}</h5>
          <h5>{driver.dob}</h5>
          <h5 className={styles.teams}>{formatTeams(driver.teams || driver.Teams)}</h5>
        </div>
      ) : (
        <p>Cargando Driver...</p>
        )}
        <div className={styles.theback}>
        <h6 className={styles.descripcion} >{driver.description || 'No hay descripcion de este corredor'}</h6>
        </div>
      </div>
    </div>
  );
}

export default Detail;


