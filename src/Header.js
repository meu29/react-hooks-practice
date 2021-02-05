import React from "react"
import { Link } from "react-router-dom"

var HeaderComponet = () => {
    return (
        <div id="header">
            <span id="siteTitle" class="headerElement">タイトル</span>
            <Link to="/" className="headerElement">イベントをさがす</Link>
            <Link to="/myevent" className="headerElement">参加・開催予定のイベント</Link>
        </div>
    )
}

export default HeaderComponet;