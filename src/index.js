import React from "react"
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducer"
import AppComponent from './App';

var store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}><AppComponent /></Provider>, 
  document.getElementById("app")
);