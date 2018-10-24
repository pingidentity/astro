import React from "react";
import QueryBuilder from "../../../templates/query-builder/";

/**
* @name QueryBuilderDemo
* @memberof QueryBuilder
* @desc A demo for QueryBuilder
*/
class QueryBuilderDemo extends React.Component {
    render() {
        return (
            <QueryBuilder {...this.props} />
        );
    }
}

module.exports = QueryBuilderDemo;
