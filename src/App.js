import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import HeaderComponent from "./Header"
import SidebarComponent from "./Sidebar"
import SearchEventComponent from "./SearchEvent"
import MyEventsComponent from "./MyEvents"
import Axios from "axios"


var AppComponent = () => {

    var [userDataState, setUserDataState] = useState([]);
    var [myEventsState, setMyEventsState] = useState([]);
    
    /* セッション確認 */
    useEffect(() => {
        login({userId: null, password: null});
    }, []);

    var login = (childComponentFormValue) => {
        Axios.post("http://localhost:5000/login", childComponentFormValue)
        .then((res) => {
            if (res.data.message === "ログインに成功") {
                setUserDataState(res.data.userData);
                setMyEventsState(res.data.myEvents);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    var logout = () => {
        Axios.get("http://localhost:5000/logout")
        .then((res) => {
            setUserDataState([]);
            setMyEventsState([]);
        })
        .catch((err) => alert(err));
    }

    var cancelEvent = (userId, eventId, flag) => {

        //Axios.delete("http://localhost:5000/events", {userId: userId, eventId: eventId, flag: flag})
        //.then((res) => alert("ok"));   
        alert(userId);
        alert(eventId);
        alert(flag)

    }

    return (
        <div>
            <Router>
                <HeaderComponent />
                <Route exact path="/" component={() => <SearchEventComponent userDataState={userDataState} />} />
                <Route exact path="/myevent" component={() => <MyEventsComponent userDataState={userDataState} myEventsState={myEventsState} parentCancelEvent={cancelEvent} />} />
            </Router>
            <SidebarComponent userDataState={userDataState} parentLoginFunc={login} parentLogoutFunc={logout}/>
        </div>
    )
}

export default AppComponent;