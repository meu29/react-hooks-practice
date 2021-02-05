import React, { useState } from "react"
import Axios from "axios"

/* なぜ引数にpropsを指定すると親のstateを使えるようになるのか？ */
var SidebarComponent = (props) => {

    var [formValue, setFormValue] = useState({userId: "", password: ""});

    return (
        <div id="sidebar">
            {props.userDataState.length > 0 && (
                <>
                    <p class="sidebarElement">{props.userDataState}</p>
                    <input type="button" value="ログアウト" onClick={() => props.parentLogoutFunc()} />
                </>
            )}
            {props.userDataState.length == 0 && (
                <>
                    <p><input type="text" placeholder="ユーザーID" onKeyUp={(e) => setFormValue({userId: e.target.value, password: formValue.password})}/></p>
                    <p><input type="password" placeholder="パスワード" onKeyUp={(e) => setFormValue({userId: formValue.userId, password: e.target.value})}/></p>
                    <input type="button" value="ログイン" onClick={() => props.parentLoginFunc(formValue)} />
                </>
            )}
        </div>

    )
}

export default SidebarComponent;