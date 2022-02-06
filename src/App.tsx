import React, { useEffect, useState } from "react"
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  useEffect(() => {
    const url = process.env.REACT_APP_WEB_API_URL

    if (!url) {
      throw new Error("The REACT_APP_WEB_API_URL variable is not defined.");
    }

    setLoading(true);
    const fetchBalances = async () => {
      try {
        const response = await fetch(url);
        const { balances } = await response.json();
        setBalances(balances);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    setLoading(true);
    const fetchTickerPrice = async () => {
      try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price");
        const tickerPrices = await response.json();
        setTickerPrices(tickerPrices);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    fetchBalances();
    fetchTickerPrice();
  }, []);

  const [balances, setBalances] = useState([]);
  const [tickerPrices, setTickerPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Binance wallet fiat & spot</h1>

      {loading ? <p>We're loading, please wait.</p> : <>
        <Table balances={balances} tickerPrices={tickerPrices} />
      </>}
    </div>
  );
}

export default App;
