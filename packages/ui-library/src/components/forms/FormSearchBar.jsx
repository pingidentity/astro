import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormSearchBox from "./FormSearchBox";
import CollapsibleLink from "../general/CollapsibleLink";
import Anchor from "../general/Anchor";
import _ from "underscore";

/**
 * @class FormSearchBar
 * @desc A search bar with an expandable container for filters
 *
 * @param {string} [data-id="searchbar"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {object} [formSearchBoxProps]
 *     Object of props that are passed on the child SearchBox component
 *
 * @param {object} [strings]
 *     Strings to override content.
 *
 * @param {boolean} [open=false]
 *     If true, filter container is open.
 * @param {boolean} [disableFilters=false]
 *     Disables toggle control
 * @param {function} [onToggle]
 *     Callback to be triggered when trigger is clicked.
 * @param {boolean} [queryMode]
 *     When enabled, change the style of the search field to indicate you're typing a structured query
 * @param {node} [rightControl]
 *     A content area that appears to the right of the search field, above the expanded filter area
 **/

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    static propTypes = {
        "data-id": PropTypes.string,
        disableFilters: PropTypes.bool,
        rightControl: PropTypes.node,
    };

    static defaultProps = {
        "data-id": "searchbar",
        formSearchBoxProps: {},
        strings: {},
        onToggle: _.noop,
        disableFilters: false,
    };

    _handleToggle = () => {
        this.props.onToggle();

        const nextState = {
            open: !this.state.open
        };
        this.setState(nextState);
    };

    render() {
        const filtersOpen = this.props.open === undefined || this.props.open === null
            ? this.state.open : this.props.open;
        const { documentationLink, rightControl } = this.props;
        const classes = classnames("searchbar", {
            "searchbar--open": filtersOpen,
        });

        const renderSearchBar = (
            <div className="searchbar__bar">
                <FormSearchBox
                    data-id={`${this.props["data-id"]}-input`}
                    className="searchbar__input"
                    {...this.props.formSearchBoxProps}
                />
                <CollapsibleLink
                    data-id={`${this.props["data-id"]}-filter-link`}
                    title={this.props.strings.linkText || "Filters"}
                    className="searchbar__filter-link"
                    expanded={filtersOpen}
                    onToggle={this._handleToggle}
                    disabled={this.props.disableFilters}
                />
            </div>
        );

        const renderDocLink = documentationLink && !filtersOpen ? (
            <div className="searchbar__doc-link">
                <Anchor href={documentationLink.href} target="_blank" data-id="doc-link">
                    {documentationLink.label}
                </Anchor>
            </div>
        ) : null;

        return (
            <div key="searchbar" className={classes} data-id={this.props["data-id"]}>
                {
                    rightControl
                    ? <div className="searchbar__top-line">
                        <div className="searchbar__left-control">
                            {renderSearchBar}
                            {renderDocLink}
                        </div>
                        <div className="searchbar__right-control">{rightControl}</div>
                    </div>
                    : [renderSearchBar, renderDocLink]
                }
                {filtersOpen &&
                    <div
                        data-id={`${this.props["data-id"]}-filters`}
                        className="searchbar__filters modifier_light-inputs"
                        key="searchbar-filters">
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

export default SearchBar;
