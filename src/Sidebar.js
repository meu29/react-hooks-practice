import React, { useState } from "react"
import Axios from "axios"

/* なぜ引数にpropsを指定すると親のstateを使えるようになるのか？ */
var SidebarComponent = (props) => {

    var [formValue, setFormValue] = useState({userId: "", password: ""});

    var login = () => {
        //Axios.post("http://localhost:5000/login", formValue)
        //.then((res) => alert(res.data.message));
    }

    return (
        <div id="sidebar">
            {/*
            <span class="sidebarElement">アイテム1</span>
            <span class="sidebarElement">アイテム2</span*/}
            <p>{props.loginState.toString()}</p>
            <p><input type="text" placeholder="ユーザーID" onKeyUp={(e) => setFormValue({userId: e.target.value, password: formValue.password})}/></p>
            <p><input type="text" placeholder="パスワード" onKeyUp={(e) => setFormValue({userId: formValue.userId, password: e.target.value})}/></p>
            <input type="button" value="ログイン" onClick={() => login()} />
        </div>

    )
}

export default SidebarComponent;