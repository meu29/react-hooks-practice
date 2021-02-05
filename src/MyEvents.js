import React from "react"

var MyEventsComponent = (props) => {

    return (
        <div>
            {props.myEventsState.map((arr) => {
                return (
                    <div>
                        <h3>{arr[1]}</h3>
                        <p>{arr[2]}</p>
                        {arr[3] === 1 && (
                            <input type="button" value="イベントを削除" onClick={() => props.parentCancelEvent(props.userDataState[0], arr[0], 1)} />
                        )}
                        {arr[3] === 0 && (
                            <input type="button" value="参加をキャンセル" onClick={() => props.parentCancelEvent(props.userDataState[0], arr[0], 0)} />
                        )}
                    </div>
                );
            })}
        </div>
    )

}

export default MyEventsComponent;