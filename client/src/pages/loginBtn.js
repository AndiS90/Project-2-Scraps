import React from 'react';

function loginBtn ({ currentPage, handlePageChange}){
    return (
    <div className = "btn btn-lg btn-primary m-2"> 
        <a href="#loginPage" onClick={() => handlePageChange('')}
          className={currentPage === 'loginPage' ? 'nav-link active' : 'nav-link'}
        >
         Login Page
        </a>
    </div>

    )

}

export default loginBtn;