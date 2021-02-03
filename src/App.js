import React, { useState } from "react"
import "./App.css"
import HeaderComponent from "./Header"
import SidebarComponent from "./Sidebar"
import MainComponent from "./Main"
import Axios from "axios"

/*
var loginCheck = () => {

    Axios.get("http://localhost:5000/session")
    .then((res) => setAppState({loginState: res.data.loginState}))
    .catch((err) => { return false; })
    
}
*/

var AppComponent = () => {

    var [appState, setAppState] = useState({loginState: false});

    return (
        <div>
            <HeaderComponent />
            <SidebarComponent loginState={appState.loginState} />
            <MainComponent />
            {/*<input type="button" onClick={loginCheck} />*/}
        </div>
    )
}

export default AppComponent;