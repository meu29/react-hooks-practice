import React, { useState } from "react"
import Axios from "axios"

/* なぜ引数にpropsを指定すると親のstateを使えるようになるのか？ */
var SidebarComponent = (props) => {

    var [formValue, setFormValue] = useState({userId: "", password: ""});

    return (
        <div id="sidebar">
            {/*
            <span class="sidebarElement">アイテム1</span>
            <span class="sidebarElement">アイテム2</span*/}
            {props.loginState == true && (
                <>
                    <p>ログイン中です</p>
                    {/*<input type="button" value="ログイン" onClick={() => props.parentLoginFunc(formValue)} />*/}
                </>
            )}
            {props.loginState == false && (
                <>
                    <p><input type="text" placeholder="ユーザーID" onKeyUp={(e) => setFormValue({userId: e.target.value, password: formValue.password})}/></p>
                    <p><input type="text" placeholder="パスワード" onKeyUp={(e) => setFormValue({userId: formValue.userId, password: e.target.value})}/></p>
                    <input type="button" value="ログイン" onClick={() => props.parentLoginFunc(formValue)} />
                </>
            )}
        </div>

    )
}

export default SidebarComponent;