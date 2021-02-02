import { connect } from "react-redux"
import AppComponent from "../App"
import { increment, decrement } from "../action/app"

var mapStateToProps = (state) => {
    return state;
}

var mapDispatchToProps = (dispatch) => {
    return {
        /* ボタンが押される -> ディスパッチ */
        handleClick: () => { dispatch(increment()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);