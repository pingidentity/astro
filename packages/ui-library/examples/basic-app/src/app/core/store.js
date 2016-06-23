var Redux = require("redux"),
    ReactRouter = require("react-router"),
    ReactRouterRedux = require("react-router-redux"),
    AppReducer = require("./Reducer.js"),
    NavReducer = require("ui-library/src/components/panels/left-nav").Reducer,
    HeaderReducer = require("ui-library/src/components/panels/header-bar").Reducer,
    WizardReducer = require("ui-library/src/components/wizard/WizardReducer"),
    ShowsReducer = require("../views/shows").Reducer,
    thunk = require("redux-thunk");

var createStoreWithMiddleware = Redux.applyMiddleware(
    ReactRouterRedux.routerMiddleware(ReactRouter.hashHistory),
    thunk
)(Redux.createStore);

var reducers = {
    routing: ReactRouterRedux.routerReducer,
    nav: NavReducer,
    header: HeaderReducer,
    wizard: WizardReducer,
    shows: ShowsReducer,
    app: AppReducer
};

var store = (function configureStore (initialState) {
    return createStoreWithMiddleware(
        Redux.combineReducers(reducers), initialState);
})();

store.reducers = reducers;

module.exports = store;
