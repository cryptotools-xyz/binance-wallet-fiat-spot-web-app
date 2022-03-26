// @ts-nocheck
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import ReactTable from './components/ReactTable';

function App() {
  const [password, setPassword] = useState("");
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    const url = process.env.REACT_APP_WEB_API_URL

    if (!url) {
      throw new Error("The REACT_APP_WEB_API_URL variable is not defined.");
    }
    
    setLoading(true);
    try {
      const response = await fetch(url + "/api/wallet/fiat-spot?password=" + password);
      const { balances } = await response.json();
      setBalances(balances);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(true);
    }
  }

  console.log("loading", loading)
  console.log("error", error)
  console.log("balances", balances)

  return (
    <div>
      <h1>Binance wallet fiat & spot</h1>
      <hr />

      <h2>Unlock api</h2>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={handleClick}>Get data</button>
      <hr />

      <h2>Your wallet</h2>
      {loading ? <p>We're loading, please wait.</p> : <>
        <ReactTable data={balances} />
      </>}
    </div>
  );
}

export default App;