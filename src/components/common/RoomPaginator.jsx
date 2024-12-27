// import React from "react"

// const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
// 	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
// 	return (
// 		<nav aria-label="Page navigation">
// 			<ul className="pagination justify-content-center">
// 				{pageNumbers.map((pageNumber) => (
// 					<li
// 						key={pageNumber}
// 						className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
// 						<button onClick={() => onPageChange(pageNumber)} className="page-link">
// 							{pageNumber}
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 		</nav>
// 	)
// }

// export default RoomPaginator

import React from "react";
import { Pagination } from "react-bootstrap";

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 10; // Number of pages to display
        const halfRange = Math.floor(maxPagesToShow / 2);
        let startPage = Math.max(1, currentPage - halfRange);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination className="justify-content-center">
            {currentPage > 1 && (
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
            )}

            {pageNumbers.map((page) => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Pagination.Item>
            ))}

            {currentPage < totalPages && (
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
            )}
        </Pagination>
    );
};

export default RoomPaginator;

