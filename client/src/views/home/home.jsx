import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {getDrivers, orderDrivers, getTeams, filterTeams, reset, filterOrigin, searchDrivers, setError} from "../../redux/actions";
import Paginado from "../Paginado/Paginado";
import Cards from "../../components/Cards/cardList";
import Navbar from "../../components/Nav/nav";
import styles from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const teams = useSelector((state) => state.teams);
  const error = useSelector((state) => state.error);

  const [filters, setFilters] = useState({
    currentPage: parseInt(localStorage.getItem("currentPage")) || 1,
    selectedOrder: localStorage.getItem("selectedOrder") || "",
    selectedTeam: localStorage.getItem("selectedTeam") || "",
    selectedOrigin: localStorage.getItem("selectedOrigin") || "",
    checkedSearch: localStorage.getItem("checkedSearch") === "true",
  });

  const driversPerPage = 9;
  const indexLastDriver = filters.currentPage * driversPerPage;
  const indexOfFirstDriver = indexLastDriver - driversPerPage;

  useEffect(() => {
    setTimeout(() => {
      dispatch(setError(""));
    }, 8000);
  }, [dispatch, error]);

  useEffect(() => {
    if (!filteredDrivers.length) {
      dispatch(getDrivers());
    }
  }, [dispatch, filteredDrivers]);

  useEffect(() => {
    if (!teams.length) {
      dispatch(getTeams());
    }
  }, [dispatch, teams]);

  useEffect(() => {
    const storedCurrentPage = localStorage.getItem("currentPage");
    if (storedCurrentPage) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        currentPage: parseInt(storedCurrentPage),
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", filters.currentPage.toString());
  }, [filters.currentPage]);

  const paginado = (pageNumber) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      currentPage: pageNumber,
    }));
  };

  const handleOrder = (event) => {
    const orderType = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedOrder: orderType,
    }));
    localStorage.setItem("selectedOrder", orderType);
    dispatch(orderDrivers(orderType));
  };

  const handlerFilterTeam = (event) => {
    const team = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedTeam: team,
      currentPage: 1, 
    }));
    localStorage.setItem("selectedTeam", team);
    dispatch(filterTeams(team));
  };

  const handleSearch = (name, isChecked) => {
      setFilters((prevFilters) => ({
      ...prevFilters,
      checkedSearch: isChecked,
      currentPage: 1, 
    }));
    localStorage.setItem("checkedSearch", isChecked.toString());
    dispatch(searchDrivers(name, isChecked));
  };

  const resetHandler = () => {
    setFilters({
      currentPage: 1,
      selectedOrder: "",
      selectedTeam: "",
      selectedOrigin: "",
      checkedSearch: false,
    });
    localStorage.removeItem("selectedOrder");
    localStorage.removeItem("selectedTeam");
    localStorage.removeItem("selectedOrigin");
    localStorage.removeItem("checkedSearch");
    dispatch(reset());
  };

  const handlerFilterOrigin = (event) => {
    const origin = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedOrigin: origin,
    }));
    localStorage.setItem("selectedOrigin", origin);
    dispatch(filterOrigin(origin));
  };

  return (
    <div className={styles.home}>
      <div className={styles.navBar}>
        <Navbar
          onSearch={handleSearch}
          handleOrder={handleOrder}
          teams={teams}
          handlerFilterTeam={handlerFilterTeam}
          resetHandler={resetHandler}
          handlerFilterOrigin={handlerFilterOrigin}
          {...filters}
        />
        {error && <p className={styles.errores}>{error}</p>}
      </div>
      <Cards
        drivers={filteredDrivers.slice(
          indexOfFirstDriver,
          indexLastDriver
        )}
      />
      <div className={styles.paginadoContainer}>
        <Paginado
          driversPerPage={driversPerPage}
          allDrivers={filteredDrivers.length}
          paginado={paginado}
          currentPage={filters.currentPage}
        />
      </div>
    </div>
  );
}

export default Home;
