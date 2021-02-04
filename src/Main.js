import React, { useState, useEffect } from "react"
import Axios from "axios"

var MainComponent = () => {

    var [eventDatas, setEventDatas] = useState([]);
    var [formValues, setFormValues] = useState({title: "", description: ""})

    /* componentDidMountを関数コンポーネントでやりたいときに使う */
    /* 第二引数に空の配列を渡すことでマウントとアンマウント時のみ実行 */
    /* これがないと無限にリクエストを送信してしまう */
    useEffect(() => {
        getEvenets();
    }, []);
    
    var getEvenets = () => {
        Axios.get("http://localhost:5000/events")
        .then((res) => setEventDatas(res.data.events))
        .catch((err) => {
            console.log(err);
            setEventDatas([]);
        });
    }

    var postEvent = () => {

        var body = {
            title: formValues.title,
            description: formValues.description,
            userId: "@testbot",
            eventId: Math.random().toString(32).substring(2),
            flag: 1
        }

        Axios.post("http://localhost:5000/events", body)
        .then((res) => alert("ok"));

    }

    var participateEvent = (eventId) => {

        Axios.post("http://localhost:5000/events", {userId: "@testbot", eventId: eventId, flag: 0})
        .then((res) => alert("ok"));

    }

    /* [イベントID, タイトル, 説明, いいね] */
    return (
        <div>
            <div>
                {eventDatas.map((arr) => {
                    return (
                        <div>
                            <h3>{arr[1]}</h3>
                            <p>{arr[2]}</p>
                            <input type="button" value="このイベントに参加する" onClick={() => participateEvent(arr[0])}/>
                        </div>
                    );
                })}
            </div>
            <div>
                <h2>イベントを投稿</h2>
                <input type="text" placeholder="イベント名を入力" onKeyUp={(e) => setFormValues({title: e.target.value, description: formValues.description})} />
                <textarea placeholder="イベント内容を入力" onKeyUp={(e) => setFormValues({title: formValues.title, description: e.target.value})}></textarea>
                <input type="button" value="送信" onClick={() => postEvent()} />
            </div>
        </div>
    )
}

export default MainComponent;