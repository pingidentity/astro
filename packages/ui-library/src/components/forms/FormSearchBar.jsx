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
 *     Object of props that are passed on the child SearchBox component.
 *     You can also pass these directly as props of their own, but this lets you be explicit.
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
 * @param {node} [centerControl]
 *     A content area that appears immediately to the right of the search field
 * @param {variable} [renderDocLink]
 *      When called it renders a documentation link
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
        const {
            children,
            "data-id": dataId,
            documentationLink,
            formSearchBoxProps,
            open,
            rightControl,
            centerControl,
            ...props
        } = this.props;
        const filtersOpen = open === undefined || open === null
            ? this.state.open : open;
        const classes = classnames("searchbar", {
            "searchbar--open": filtersOpen,
        });

        const searchBox = (
            <FormSearchBox
                data-id={`${dataId}-input`}
                className="searchbar__input"
                {...props}
                {...formSearchBoxProps}
            />
        );

        const renderSearchBar = (
            <div className="searchbar__bar" key="bar">
                {searchBox}
                {children && <CollapsibleLink
                    data-id={`${this.props["data-id"]}-filter-link`}
                    title={this.props.strings.linkText || "Filters"}
                    className="searchbar__filter-link"
                    expanded={filtersOpen}
                    onToggle={this._handleToggle}
                    disabled={this.props.disableFilters}
                />}
                {centerControl && <div className="searchbar__center-control">{centerControl}</div>}
            </div>
        );

        const renderDocLink = documentationLink ? (
            <div className="searchbar__doc-link" key="doc-link">
                <Anchor href={documentationLink.href} target="_blank" data-id={`${this.props["data-id"]}-doc-link`}>
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
                            {!filtersOpen && renderDocLink }
                        </div>
                        <div className="searchbar__right-control">{rightControl}</div>
                    </div>
                    : [ renderSearchBar, renderDocLink ]
                }
                {filtersOpen &&
                    <div data-id={`${dataId}-filters-container`}>
                        <div
                            data-id={`${dataId}-filters`}
                            className="searchbar__filters modifier_light-inputs"
                            key="searchbar-filters"
                        >
                            {children}
                        </div>
                        {filtersOpen && documentationLink && documentationLink.showWithFilters && renderDocLink}
                    </div>
                }
            </div>
        );
    }
}

export default SearchBar;
