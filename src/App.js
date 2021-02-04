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

    var [loginState, setLoginState] = useState(false);

    var login = (childComponentFormValue) => {
        Axios.post("http://localhost:5000/login", childComponentFormValue)
        .then((res) => {
            if (res.data.message === "ログインに成功") {
                setLoginState(true);
            } else {
                setLoginState(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setLoginState(false);
        });
    }

    return (
        <div>
            <HeaderComponent />
            <div class="flexWrap">
                <SidebarComponent loginState={loginState} parentLoginFunc={login}/>
                <MainComponent />
            </div>
        </div>
    )
}

export default AppComponent;