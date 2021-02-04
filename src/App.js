import React, { useState, useEffect } from "react"
import "./App.css"
import HeaderComponent from "./Header"
import SidebarComponent from "./Sidebar"
import MainComponent from "./Main"
import Axios from "axios"


var AppComponent = () => {

    var [loginState, setLoginState] = useState(false);
    var [userDataState, setUserDataState] = useState([]);
    
    useEffect(() => {
        login({userId: null, password: null})
    }, []);

    var login = (childComponentFormValue) => {
        Axios.post("http://localhost:5000/login", childComponentFormValue)
        .then((res) => {
            if (res.data.message === "ログインに成功") {
                setLoginState(true);
                setUserDataState(res.data.userData)
            } else {
                setLoginState(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setLoginState(false);
        });
    }

    var logout = () => {
        Axios.get("http://localhost:5000/logout")
        .then((res) => setLoginState(false))
        .catch((err) => alert(err));
    }

    return (
        <div>
            <HeaderComponent />
            <div class="flexWrap">
                <SidebarComponent loginState={loginState} userDataState={userDataState} parentLoginFunc={login} parentLogoutFunc={logout}/>
                <MainComponent userDataState={userDataState} />
            </div>
        </div>
    )
}

export default AppComponent;