var Redux = require("redux"),
    ReactRouter = require("react-router"),
    ReactRouterRedux = require("react-router-redux"),
    AppReducer = require("./Reducer.js"),
    NavReducer = require("../../components/panels/left-nav").Reducer,
    HeaderReducer = require("../../components/panels/header-bar").Reducer,
    thunk = require("redux-thunk");

var createStoreWithMiddleware = Redux.applyMiddleware(
    ReactRouterRedux.routerMiddleware(ReactRouter.hashHistory),
    thunk
)(Redux.createStore);

var baseReducers = {
    routing: ReactRouterRedux.routerReducer,
    nav: NavReducer,
    header: HeaderReducer,
    app: AppReducer
};

var store = (function configureStore (initialState) {
    return createStoreWithMiddleware(
        Redux.combineReducers(baseReducers), initialState);
})();

store.baseReducers = baseReducers;

module.exports = store;
