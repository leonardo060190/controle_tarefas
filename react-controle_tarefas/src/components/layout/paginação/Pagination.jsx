//import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css'; // Importe seus estilos CSS

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
        {'<<'}
      </button>
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={currentPage === index + 1 ? styles.active : ''}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
        {'>'}
      </button>
      <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
        {'>>'}
      </button>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
