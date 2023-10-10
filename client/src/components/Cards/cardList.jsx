/* eslint-disable react/prop-types */
import Cards from "../Card/cards";
import styles from "./cardList.module.css";

const CardsList = ({drivers}) => {
  const arrDrivers = drivers;

  return (
    <div className={styles.cardList}>
      {arrDrivers?.map((driver, i) => (<Cards key={i} driver={driver} />))}
    </div>
  );
}

export default CardsList;
