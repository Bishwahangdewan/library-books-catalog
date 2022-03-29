import React, { useState } from 'react';
import Axios from 'axios';

import DisplayResult from './components/DisplayResult';

function App() {
  const [searchField, setSearchField] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.get(`http://localhost:5000/search?field=${searchField}`).then(res => {
      setSearchResult(res.data.data);
    }).catch(err => console.log(err))
  }

  return (
    <div className="App pt-5">
      <h2 className="text-3xl font-bold text-center pb-10">Library Book Manager and Genre Maintainence</h2>

      <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
        <span>
          <input type="text" className="bg-slate-100 px-4 py-2 w-80" onChange={(e) => setSearchField(e.target.value)} />
          <input type="submit" className="bg-cyan-200 px-4 py-2" />
        </span>
      </form>


      {searchResult.length > 0 ?
        searchResult.map(result => <DisplayResult data={result} />)
        : "No Results Found"}
    </div>
  );
}

export default App;
