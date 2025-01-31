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

// import React from "react";
// import { Pagination } from "react-bootstrap";

// const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPagesToShow = 10; // Number of pages to display
//         const halfRange = Math.floor(maxPagesToShow / 2);
//         let startPage = Math.max(1, currentPage - halfRange);
//         let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//         if (endPage - startPage < maxPagesToShow - 1) {
//             startPage = Math.max(1, endPage - maxPagesToShow + 1);
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(i);
//         }

//         return pageNumbers;
//     };

//     const pageNumbers = getPageNumbers();

//     return (
//         <Pagination className="justify-content-center">
//             {currentPage > 1 && (
//                 <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
//             )}

//             {pageNumbers.map((page) => (
//                 <Pagination.Item
//                     key={page}
//                     active={page === currentPage}
//                     onClick={() => onPageChange(page)}
//                 >
//                     {page}
//                 </Pagination.Item>
//             ))}

//             {currentPage < totalPages && (
//                 <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
//             )}
//         </Pagination>
//     );
// };

// export default RoomPaginator;

// import React from "react";
// import { Pagination } from "react-bootstrap";

// const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPagesToShow = 10; // Maximum number of page links to display
//         const halfRange = Math.floor(maxPagesToShow / 2);

//         let startPage = Math.max(1, currentPage - halfRange);
//         let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//         if (endPage - startPage < maxPagesToShow - 1) {
//             startPage = Math.max(1, endPage - maxPagesToShow + 1);
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(i);
//         }

//         return pageNumbers;
//     };

//     const pageNumbers = getPageNumbers();

//     return (
//         <Pagination className="justify-content-center">
//             {currentPage > 1 && (
//                 <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
//             )}

//             {pageNumbers.map((page) => (
//                 <Pagination.Item
//                     key={page}
//                     active={page === currentPage}
//                     onClick={() => onPageChange(page)}
//                 >
//                     {page}
//                 </Pagination.Item>
//             ))}

//             {currentPage < totalPages && (
//                 <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
//             )}
//         </Pagination>
//     );
// };

// export default RoomPaginator;


// import React, { useState } from 'react';

// const RoomPagination = () => {
//     // Assuming currentPage and pageSize are coming from props or you can set them locally
//     const [currentPage, setCurrentPage] = useState(0);
//     const pageSize = 10;  // You can adjust this as needed
    
//     // Handlers for pagination buttons
//     const handleNext = () => {
//         setCurrentPage(prevPage => prevPage + 1); // Increment page number
//     };

//     const handleBack = () => {
//         if (currentPage > 0) {
//             setCurrentPage(prevPage => prevPage - 1); // Decrement page number
//         }
//     };

//     return (
//         <div className="pagination-container">
//             {/* Back button */}
//             <button
//                 onClick={handleBack}
//                 disabled={currentPage === 0} // Disable the button if on the first page
//                 className="pagination-button"
//             >
//                 Back
//             </button>

//             {/* Display current page for reference */}
//             <span>Page: {currentPage + 1}</span>

//             {/* Next button */}
//             <button
//                 onClick={handleNext}
//                 className="pagination-button"
//             >
//                 Next
//             </button>
//         </div>
//     );
// };

// export default RoomPagination;
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const RoomPaginator = ({ currentPage, onNext, onBack }) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <ButtonGroup>
                <Button
                    variant="secondary"
                    onClick={onBack}
                    disabled={currentPage <= 1} // Disable Back button on first page
                >
                    Back
                </Button>
                <Button variant="outline-primary" disabled>
                    Page {currentPage}
                </Button>
                <Button variant="secondary" onClick={onNext}>
                    Next
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default RoomPaginator;

