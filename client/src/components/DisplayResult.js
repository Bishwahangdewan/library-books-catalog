import React, { useState } from 'react';
import Axios from 'axios';

import EditBook from './EditBook';

const DisplayResult = ({ data }) => {

    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    const handleViewCount = () => {
        console.log("handle count")
        Axios.get(`http://localhost:5000/genre/count/${data.genre}`).then(res => {
            setCount(res.data);
        })
    }

    return (
        <div className="border border-gray-300 w-9/12 m-auto p-10 mt-10">

            <div className="flex justify-between">
                <span className='text-2xl font-bold pb-4'>{data.name}</span>
                <button onClick={() => setToggle(!toggle)} className="bg-blue-200 px-5 rounded">Edit</button>
            </div>

            <p className="font-bold text-stone-500 pb-4">{data.author}</p>
            <p className="pb-4">{data.description}</p>
            <span onClick={() => handleViewCount()} className="bg-green-200 px-5 py-1 rounded capitalize">{data.genre}</span>

            {count > 0 ? <span className='bg-red-200 px-5 py-1 rounded capitalize ml-4'>Genre Count : <b>{count} </b></span> : ""}

            {toggle ? <EditBook data={data} /> : ""}
        </div>
    )
}

export default DisplayResult;