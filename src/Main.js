import React, { useState, useEffect } from "react"
import Axios from "axios"

var MainComponent = () => {

    var [eventDatas, setEventDatas] = useState([[0, 0, 0, 0]]);

    /* componentDidMountを関数コンポーネントでやりたいときに使う */
    useEffect(() => {
        getEvenets();
    });
    
    var getEvenets = () => {
        Axios.get("http://localhost:5000/events")
        .then((res) => setEventDatas(res.data.events));
    }

    return (
        <div>
            {eventDatas.map((arr) => {
                return (<p>{arr}</p>);
            })}
        </div>
    )
}

export default MainComponent;