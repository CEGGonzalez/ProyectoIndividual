/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./pagination.css";
import { Link } from 'react-router-dom';

const Pagination = ({ driversPerPage, totalDrivers, paginate,  currentPage}) => {
const [index, setIndex] = useState(1);
const [displayPages, setDisplayPages] = useState([]);
const pageNumbers = [];
for (let index = 1; index <= Math.ceil(totalDrivers /driversPerPage);index++) 
{
    pageNumbers.push(index);
}

useEffect(() => {
  const totalPages = Math.ceil(totalDrivers / driversPerPage);
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
}, [currentPage, totalDrivers, driversPerPage]);

return (
    <nav>
        <ul className='pagination'>
            <li className="page-item ">
                <Link
                    onClick={() => {
                        if (pageNumbers.includes(index - 1)) {
                            setIndex(index - 1);
                            paginate(index - 1);
                        }
                    }}
                    className="page-link">
                    Previous
                </Link>
              </li>
          <li>
            {displayPages.map((number) => (
          <li
            key={number}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
                <Link
                    onClick={() => {
                        if (pageNumbers.includes(index + 1)) {
                            console.log(index)
                            setIndex(index + 1);
                            paginate(index + 1);
                        }
                    }}
                    className="page-link">
                    Next
                </Link>
            </li>
        </ul>
    </nav>
);}

 export default Pagination;