import './Pagination.css';
import React, { useState } from "react";
import Pagination from "react-js-pagination";

const CustomPagination = () => {
    const [page, setPage] = useState(1);
    
    const handlePageChange = (page) => {
        setPage(page);
    };
    
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={5} 
            totalItemsCount={100} 
            pageRangeDisplayed={5} 
            prevPageText={"‹"} 
            nextPageText={"›"} 
            onChange={handlePageChange}
        />
    );
};

export default CustomPagination;