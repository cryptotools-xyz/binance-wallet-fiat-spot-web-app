import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/wallet">Wallet</Link>
                </li>
                <li>
                    <Link to="/trade-history">Trade History</Link>
                </li>
                <li>
                    <Link to="/order-history">Order History</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;