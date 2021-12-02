import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

//creo la store de redux, le paso los parámetros del reducer y aplico el middleware thunk, para manejar asincronia

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
