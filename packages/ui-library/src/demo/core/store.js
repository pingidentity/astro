import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { hashHistory } from "react-router";
import { routerMiddleware, connectRouter } from "connected-react-router";
import AppReducer from "./Reducer.js";

import NavReducer from "../../components/panels/left-nav";
import HeaderReducer from "../../components/panels/header-bar";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const createStoreWithMiddleware = applyMiddleware(
    routerMiddleware(hashHistory),
    thunk
)(createStore);

const baseReducers = {
    router: connectRouter(history),
    nav: NavReducer.Reducer,
    header: HeaderReducer.Reducer,
    app: AppReducer,
};

const store = (function configureStore (initialState) {
    return createStoreWithMiddleware(
        combineReducers(baseReducers), initialState);
})();

store.baseReducers = baseReducers;

export default store;
