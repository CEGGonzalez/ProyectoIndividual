/* eslint-disable react/prop-types */
import styles from "./cards.module.css";
import { Link } from "react-router-dom";

const noImage = "https://i.imgur.com/Ks7SbZt.png";

 function Cards({ driver }) {
  const { forename, surname, image, teams, dob, id } = driver;

  const formattedTeams = Array.isArray(teams) ? teams.map((team) => team.name).join(', ') : teams || '';

  return (
    <div className={styles.card_container} title={`Click para mas detalle de ${forename} ${surname}`}>
      <Link to={`/home/${id}`} style={{ textDecoration: "none" }}>
        <h3 className={styles.nombre}>{`${forename} ${surname}`}</h3>
        <img src={image || noImage} alt="Driver" className={styles.characterImage} />
        <div>
          <h5 className={styles.teams}>{formattedTeams}</h5>
          <h5 className={styles.fecha}>{dob}</h5>
        </div>
      </Link>
    </div>
  );
}


export default Cards;

