import React from 'react';

const SingleBook = ({ book, toggleBookData }) => {

    const handleChange = (e) => {
        if (e.target.checked === true) {
            toggleBookData(true, book._id);
        } else {
            toggleBookData(false, book._id);
        }
    }

    return (
        <div className='text-center'>
            <div className='mt-3'>
                <input type="checkbox" onChange={(e) => handleChange(e)} id={book._id} className="inline-block mr-3" />
                <label>{book.name}</label>
            </div>
        </div>
    )
}

export default SingleBook;