/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./cards.module.css";

const noImage = "https://i.imgur.com/Ks7SbZt.png"
function Card({ driver }) {
   const { forename, image, surname, teams, dob, id } = driver;
   const imageUrl = image ? image.url : noImage;
  const formatTeams = Array.isArray(teams) ? teams.map((team) => team.name).join(', ') : teams || '';

  return (
    <div className={styles.card_container} title={`Click para mas detalle de ${forename} ${surname}`}>
      <Link
        to={`/home/${id}`}
        style={{ textDecoration: "none"}}
      >
        <h3 className={styles.nombre}>{`${driver.name.forename} ${driver.name.surname}`}</h3>
        <img src={imageUrl} alt={image ? image.alt : "Driver"} className={styles.characterImage} />
        <div>
        <h5 className={styles.teams}>{formatTeams}</h5>
        <h5 className={styles.fecha}>{dob}</h5>
        </div>
        
      </Link>
    </div>
  );
}

export default Card;
