import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import SingleBook from './SingleBook';
import ChangeField from './ChangeField';

const UpdateMany = () => {
    const [books, setBooks] = useState([]);
    const [checkedBooks, setCheckedBooks] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/books').then(res => {
            setBooks(res.data)
        }).catch(err => console.log(err));
    }, []);


    const toggleBookData = (val, id) => {
        if (val === true) {
            let newarr = checkedBooks;
            newarr.push(id);
            setCheckedBooks(newarr);
        } else {
            let newarr1 = checkedBooks.filter(book => book !== id);
            setCheckedBooks(newarr1);
        }
    }

    const handleUpdate = (value, name) => {
        let payload = {
            id: checkedBooks,
            updateValue: value
        }
        Axios({
            url: `http://localhost:5000/books/updateMany/${name}`,
            method: 'post',
            data: payload
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    return (
        <div className="mt-20">

            {books.map(book => (
                <SingleBook book={book} toggleBookData={(val, id) => toggleBookData(val, id)} />
            ))}

            <div className="text-center">
                <ChangeField handleUpdate={(value, name) => handleUpdate(value, name)} name="name" />
                <ChangeField handleUpdate={(value, name) => handleUpdate(value, name)} name="description" />
                <ChangeField handleUpdate={(value, name) => handleUpdate(value, name)} name="author" />
            </div>

        </div>
    )
}

export default UpdateMany;