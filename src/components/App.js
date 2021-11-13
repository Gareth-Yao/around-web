
import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";
import jwt_decode from "jwt-decode";
import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

function App() {
    const checkToken = () => {
        let decoded = jwt_decode(localStorage.getItem(TOKEN_KEY));
        console.log(decoded.exp);
        console.log(Date.now());
        if(decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem(TOKEN_KEY);
            return false;
        }
        return true;
    }
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? checkToken() : false
    );

    const logout = () => {
        console.log("log out");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    };

    const loggedIn = (token) => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }
    };
    return (
        <div className="App">
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
            <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
        </div>
    );
}
export default App;

