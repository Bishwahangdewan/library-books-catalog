import React, { useState } from 'react';

const ChangeField = ({ name, handleUpdate }) => {

    const [fieldValue, setFieldValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(fieldValue, name);
    }

    return (
        <div className="mt-10 block">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label className="block">Change {name}</label>
                <input type="text" className="border rounded py-1 px-3" onChange={(e) => setFieldValue(e.target.value)} />
                <input type="submit" value="Update" className="bg-blue-200 py-1 px-3 border" />
            </form>
        </div>
    )
}

export default ChangeField;