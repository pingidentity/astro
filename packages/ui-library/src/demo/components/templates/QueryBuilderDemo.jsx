import React from "react";
import { Provider } from "react-redux";
import QueryBuilder from "../../../templates/query-builder/";

/**
* @name QueryBuilderDemo
* @memberof QueryBuilder
* @desc A demo for QueryBuilder
*/
class QueryBuilderDemo extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <QueryBuilder {...this.props} />
            </Provider>
        );
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
QueryBuilderDemo.Reducer = QueryBuilder.Reducer;

module.exports = QueryBuilderDemo;
