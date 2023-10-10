import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './home.module.css';
import Navbar from '../../components/navbar/Navbar';
import Cards from '../../components/cards/cards';
import { getAllDrivers, getByName } from '../../redux/actions';
import Pagination from '../Paginado/Pagination'; 

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9; 

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  // Lógica para obtener los conductores que se mostrarán en la página actual
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.home}>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      {/* <h2 className={style.home_title}>Home</h2> */}
      <Cards allDrivers={currentDrivers} /> 
      
      <Pagination 
        driversPerPage={driversPerPage}
        totalDrivers={allDrivers.length}
        paginate={paginate}
      /> 
      
    </div>
  );
}

export default Home;
