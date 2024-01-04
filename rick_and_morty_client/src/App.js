import './App.css';

import NavBar from './components/NavBar/NavBar.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import CardBox from './components/Card/CardBox.js';
import CardDetail from './components/Card/CardDetail.js';

import { useState } from 'react';

function App() {
  const [showDetail, setShowDetail] = useState(false);
  const [cardId, setCardId] = useState(null);

  const [filter, setFilter] = useState({
    name: '',
    page: 1,
    status: '',
    gender: '',
    species: '',
  });

  return (
    <div className="App">
      <NavBar />
     {!showDetail ? <div>
        <SearchBar setFilter={setFilter} filter={filter} />
        <CardBox setShowDetail={setShowDetail} filter={filter} setFilter={setFilter} setCardId={setCardId} />
      </div> : <CardDetail setShowDetail={setShowDetail} cardId={cardId}/>}

    </div>
  );
}

export default App;
