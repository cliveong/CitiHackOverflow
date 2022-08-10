import React, { useState, useContext } from 'react';
import { Context } from "./Context";
import { Link } from "react-router-dom";

export default function() {
    const [user, setUser] = useContext(Context);
    return (
        <div>
            <Link to="/performance" onClick={() => setUser("banker")}>
                <button> Banker</button>
            </Link>
            <Link to="/performance" onClick={() => setUser("client")}>
                <button> Client</button>
            </Link>
        </div>
    );
}
