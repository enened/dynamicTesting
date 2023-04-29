import {Context} from "./context.js"
import {useState} from 'react';
import Home from "./home.js"

function App() {
  const [userId, setUserId] = useState();
  const [page, setPage] = useState("test");

  return (
    <Context.Provider value={{userId, setUserId, page, setPage}}>
      <Home/>
    </Context.Provider>
  );
}

export default App;
