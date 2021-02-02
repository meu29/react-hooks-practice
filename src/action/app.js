/* アクション(stateをどのように更新するかのメッセージ)をリデューサーに送信 */
export default {
    increment: () => {
        return {type: "INCREMENT"};
    },
    decrement: () => {
        return {type: "DECREMENT"};
    }
}