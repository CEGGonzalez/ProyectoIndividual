/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ driversPerPage, allDrivers, paginado, currentPage }) {
  const [displayPages, setDisplayPages] = useState([]);
  const [inputPage, setInputPage] = useState("");
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    const totalPages = Math.ceil(allDrivers / driversPerPage);
    const maxPages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPages / 2), 1);
    let endPage = Math.min(startPage + maxPages - 1, totalPages);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(endPage - maxPages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setDisplayPages(pages);
  }, [currentPage, allDrivers, driversPerPage]);

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
    setErrorInput("");
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    const maxPage = Math.ceil(allDrivers / driversPerPage);
    if (pageNumber >= 1 && pageNumber <= maxPage) {
      paginado(pageNumber);
      setInputPage("");
    } else {
      setErrorInput("Fuera de rango");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGoToPage();
    }
  };

  const handleHomeBtn = () => {
    paginado(1);
  };

  return (
    <nav>
      <ul className={styles.paginado} style={{ display: "flex", alignItems: "center" }}>
        <li><button style={{color: "black"}} onClick={handleHomeBtn}>Inicio</button></li>
        <li className={currentPage === 1 ? styles.disabled : ""}>
          <button onClick={() => paginado(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
        </li>
        {displayPages.map((number) => (
          <li
            className={currentPage === number ? `${styles.number} ${styles.active}` : styles.number}
            key={number}
          >
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
        <li className={currentPage === Math.ceil(allDrivers / driversPerPage) ? styles.disabled : ""}>
          <button onClick={() => paginado(currentPage + 1)} disabled={currentPage === Math.ceil(allDrivers / driversPerPage)}>
            {">"}
          </button>
        </li>
        <li>
          <p className={styles.inicioFin} style={{color: "red"}}>
            {currentPage} / {Math.ceil(allDrivers / driversPerPage)}
          </p>
        </li>
        <li>
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            placeholder=""
            style={{ width: "40px"}}
            onKeyDown={handleKeyDown}
          />
         
        </li>
        <p className={styles.error} style={{ color: "red", marginTop: "5px", height: "8px", marginLeft: "10px", display: errorInput ? "block" : "none" }}>
          {errorInput}
        </p>
      </ul>
    </nav>
  );
}
