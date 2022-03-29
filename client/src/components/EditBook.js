import Axios from 'axios';
import React, { useState } from 'react'

const EditBook = ({ data }) => {
    console.log(data._id)
    const [name, setName] = useState(data.name);
    const [author, setAuthor] = useState(data.author);
    const [description, setDescription] = useState(data.description);
    const [genre, setGenre] = useState(data.genre)

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post(`http://localhost:5000/books/edit/${data._id}/${data.genre}`, {
            name,
            description,
            author,
            genre
        }).then(res => {
            alert(res.data.message)
            console.log(res)
        }).catch(err => console.log(err));
    }

    return (
        <div className='mt-20'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='pb-5'>
                    <label className='block text-sm pb-1 w-full'>Book Name:</label>
                    <input className='block w-full border p-1 px-2' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='pb-5'>
                    <label className='block text-sm ' >Book Author:</label>
                    <input className='block w-full border p-1 px-2' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className='pb-5'>
                    <label className='block text-sm'>Book Description:</label>
                    <textarea className='block w-full border p-1 px-2' type="text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className='pb-5'>
                    <label className='block text-sm'>Book Genre:</label>
                    <input className='block w-full border p-1 px-2' type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>

                <input type="submit" value="Edit Book" className="bg-green-300 px-4 py-2 rounded" />
            </form>
        </div>
    )
}

export default EditBook;
