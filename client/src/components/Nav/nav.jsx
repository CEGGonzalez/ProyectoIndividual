/* eslint-disable react/prop-types */
import styles from './nav.module.css';
import { useState, useEffect } from "react";
import SearchBar from "../../views/SearchBar/searchBar";
import { Link } from 'react-router-dom';

function Nav({ handleOrder, selectedOrder, selectedTeam, selectedOrigin, teams, handlerFilterTeam, resetHandler, handlerFilterOrigin, onSearch }) {
  const [resetSelectOrder, setResetSelectOrder] = useState(false);
  const [isChecked, setIsChecked] = useState(localStorage.getItem("checkedSearch") === "true"); // Usamos localStorage para mantener el estado del checkbox

  useEffect(() => {
    setResetSelectOrder(false);
  }, [resetHandler]);

  /* HANDLER PARA EL BOTON DE RESET DE FILTROS */
  const handleReset = () => {
    setIsChecked(false); // Reinicio el estado del checkbox
    localStorage.setItem("checkedSearch", false); // Actualizo el valor en localStorage
    setResetSelectOrder(true);
    resetHandler();
  };

  /* HANDLER PARA EL CHECKBOX DE ALL DRIVERS EN EL SEARCH */
  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    localStorage.setItem("checkedSearch", updatedValue); // Actualizamos el valor en localStorage
  };


  return (
    <div className={styles.container} >

      {/* BOTON CREAR NUEVO DRIVER */}
      <Link to="/create" className={styles.buttonNew}>
        Crear Driver
      </Link>
      
      <label className={styles.labelraya}> | </label>
      <div className={styles.searchContainer}>
        <SearchBar onSearch={onSearch} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} /> {/* Pasamos el estado del checkbox y la función de cambio como props */}
      </div>

      {/* BOTON DE RESET DE FILTROS */}
      <button className={styles.buttonLink} onClick={handleReset} title='All filters and sorts will be initialized, showing all drivers.'>
       <span>Reset</span> 
      </button>

      {/* SELECT DE ORDENAMIENTO */}
      <select onChange={handleOrder} value={selectedOrder} className={styles.select} title='It may be sorted Ascending or Descending by forename, in addition to being able to sort by dob'>
        <option value="">Order</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
        <option value="nacA">Dob(Asc)</option>
        <option value="nacD">Dob(Desc)</option>
      </select>

      {/* SELECT DE FILTROS X TEAM */}
      <select onChange={handlerFilterTeam} value={selectedTeam} className={styles.selectTeam} title='You can filter the drivers according to the team they belong to.'>
        <option value="">Team</option>
        {teams &&
          teams.map((team) => {
            return (
              <option key={team} value={team}>
                {team}
              </option>
            );
          })}
      </select>

      {/* SELECT DE FILTROS API|DB|ALL  */}
      <select onChange={handlerFilterOrigin} value={selectedOrigin} className={styles.selectOrigin} title='You can filter according to the origin of the data, if they come from the DB or from the API.'>
        <option value="all">ALL</option>
        <option value="api">API</option>
        <option value="db">DB</option>
      </select>
     

    </div>
  );
}


export default Nav;


