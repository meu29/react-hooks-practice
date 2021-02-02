/* 初期状態 */
var initState = {
    count: 0
}

/* 引数stateが渡されなかった場合はinitStateを使用 */
export default function reducer(state = initState, action) {
    
    /* アクションをもとにstateを更新しApp.jsに渡す */
    if (action.type === "INCREMENT") {
        return { count: state.count + 1 };
    } else if (action.type === "DECREMENT") {
        return { count: state.count - 1};
    } else {
        return state;
    }

}