import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormSearchBox from "../../forms/FormSearchBox";
import { isFunction, noop } from "underscore";

const baseClassName = "column-selector";

export default class ColumnSelector extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        className: PropTypes.string,
        "data-id": PropTypes.string,
        onSearch: PropTypes.func,
        searchPlaceHolder: PropTypes.string,
        query: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "column-selector",
        onSearch: noop
    };

    state = {
        query: this.props.query || null
    }

    _handleSearch = query => {
        if (!this.props.query) {
            this.setState({ query });
        }

        this.props.onSearch(query);
    }

    render() {
        const {
            "data-id": dataId,
            children,
            className,
            searchPlaceHolder,
            query,
        } = this.props;

        return (
            <div className={classnames(baseClassName, className)} data-id={dataId}>
                <FormSearchBox
                    className={`${baseClassName}__search`}
                    data-id={`${dataId}-search`}
                    onValueChange={this._handleSearch}
                    placeholder={searchPlaceHolder}
                    queryString={query}
                />
                <div className={`${baseClassName}__columns`}>
                    {isFunction(children) ? children(this.state) : children}
                </div>
            </div>
        );
    }
}
