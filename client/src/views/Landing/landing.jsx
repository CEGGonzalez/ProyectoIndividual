import { Link } from 'react-router-dom';
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <Link to="/home" >
          Bienvenido presione
           para ingresar
        </Link>
      </div>
    </div>
  );
};

export default Landing;

