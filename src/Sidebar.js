import React, { useState } from "react"
import Axios from "axios"

var SidebarComponent = () => {

    var [formValue, setFormValue] = useState({userId: "", password: ""});

    var login = () => {
        Axios.post("http://localhost:5000/login", formValue)
        .then((res) => alert(res.data.message));
    }

    return (
        <div id="sidebar">
            {/*
            <span class="sidebarElement">アイテム1</span>
            <span class="sidebarElement">アイテム2</span*/}
            <input type="text" placeholder="ユーザーID" onKeyUp={(e) => setFormValue({userId: e.target.value, password: formValue.password})}/>
            <input type="text" placeholder="パスワード" onKeyUp={(e) => setFormValue({userId: formValue.userId, password: e.target.value})}/>
            <input type="button" value="ログイン" onClick={() => login()} />
        </div>

    )
}

export default SidebarComponent;