import './Pagination.css';
import React from "react";
import Pagination from "react-js-pagination";

const CustomPagination = ({page, count, totalCount, setPage}) => {
    return (
        <div>
            {totalCount === 0
                ? null
                : <Pagination
                    activePage={page}
                    itemsCountPerPage={count} 
                    totalItemsCount={totalCount} 
                    pageRangeDisplayed={5} 
                    prevPageText={"‹"} 
                    nextPageText={"›"} 
                    onChange={setPage}
                    />
            }
        </div>
    );
};

export default CustomPagination;