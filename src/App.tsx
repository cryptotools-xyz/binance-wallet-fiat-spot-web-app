import React, { useEffect, useState } from "react"
import Table from './components/Table';

function App() {
  useEffect(() => {
    const url = process.env.REACT_APP_WEB_API_URL

    if (!url) {
      throw new Error("The REACT_APP_WEB_API_URL variable is not defined.");
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Binance wallet fiat & spot</h1>

      {loading ? <p>We're loading, please wait.</p> : <>
        <Table data={data} />
      </>}
    </div>
  );
}

export default App;
