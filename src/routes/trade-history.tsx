import React, { useState } from "react";
import Navigation from "../components/Navigation";
import ReactTable from "../components/TradeHistory.tsx/ReactTable";

export default function TradeHistory() {

    const [password, setPassword] = useState("secret");
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleClick = async () => {
        const url = process.env.REACT_APP_WEB_API_URL;

        if (!url) {
            throw new Error("The REACT_APP_WEB_API_URL variable is not defined.");
        }

        setLoading(true);
        try {
            const response = await fetch(url + "/api/my-trades/ETHUSDT/with-order?password=" + password);
            const trades = await response.json();
            setTrades(trades);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    };

    return (
        <main>
            <Navigation />
            <h2>Trade History</h2>
            <hr />

            <h2>Unlock api</h2>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            <button onClick={handleClick}>Get data</button>
            <hr />

            <h2>Your trades</h2>
            {loading ? <p>We re loading, please wait.</p> : <>
                <ReactTable data={trades} />
            </>}
        </main>
    );
}