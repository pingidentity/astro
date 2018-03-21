import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormSearchBox from "./FormSearchBox";
import CollapsibleLink from "../general/CollapsibleLink";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    static propTypes = {
        "data-id": PropTypes.string,
    };

    static defaultProps = {
        "data-id": "searchbar",
        formSearchBoxProps: {},
        strings: {},
    };

    _handleToggle = () => {
        const nextState = {
            open: !this.state.open
        };
        this.setState(nextState);
    };

    render() {
        const filtersOpen = this.props.open === undefined || this.props.open === null
            ? this.state.open : this.props.open;
        const inputClassNames = {
            "searchbar__input--open": filtersOpen,
        };
        const linkClassNames = {
            "searchbar__filter-link--open": filtersOpen,
        };

        return (
            <div key="searchbar" className="searchbar" data-id={this.props["data-id"]}>
                <FormSearchBox
                    data-id={`${this.props["data-id"]}-input`}
                    className={classnames("searchbar__input", inputClassNames)}
                    {...this.props.formSearchBoxProps}
                />
                <CollapsibleLink
                    data-id={`${this.props["data-id"]}-filter-link`}
                    title={this.props.strings.linkText || "Filters"}
                    className={classnames("searchbar__filter-link", linkClassNames)}
                    expanded={filtersOpen}
                    onToggle={this.props.onToggle || this._handleToggle}
                />
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
