import React from "react";
import PropTypes from "prop-types";
import KeywordSearchView from "./KeywordSearchView";
import {
    isArrowDown,
    isArrowUp,
    isEnter
} from "../../util/KeyboardUtils";
import { createSearch } from "../../util/SearchUtils";

/**
 * @class Keyword Search
 * @desc A component for searching by keyword and displaying results
 *
 * @param {string} [data-id="keywordSearch"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {number} [searchBuffer=1]
 *     Sets the minimum number of characters that must be typed to trigger search
 *
 * @param {Object} [tree]
 *     An array of objects to be searched through
 *
 * @param {Search~onResultClick}
 *     Callback to be triggered when a result is clicked; passes back result properties from possibleResults
 *
 */

export default class KeywordSearch extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        classname: PropTypes.string,
        searchBuffer: PropTypes.number,
        tree: PropTypes.arrayOf(
            PropTypes.shape({
                children: PropTypes.array,
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
        onResultClick: PropTypes.func
    }

    static defaultProps = {
        "data-id": "keyword-search",
        searchBuffer: 1
    }

    checkForMatch = createSearch(this.props.tree)

    state = {
        query: "",
        results: [],
        selectedIndex: 0
    }

    _onKeyDown = ({ keyCode }) => {
        if (isArrowUp(keyCode)) {
            this.setState(({ selectedIndex, ...previous }) => ({
                ...previous,
                selectedIndex: selectedIndex === 0 ? 0 : selectedIndex - 1
            }));
        } else if (isArrowDown(keyCode)) {
            /* istanbul ignore next */
            this.setState(({ results, selectedIndex, ...previous }) => ({
                ...previous,
                selectedIndex: selectedIndex === results.length - 1 ? results.length - 1 : selectedIndex + 1
            }));
        } else /* istanbul ignore next */ if (isEnter(keyCode)) {
            const {
                results,
                selectedIndex
            } = this.state;

            this._resultClicked(results[selectedIndex]);
        }
    }

    _onValueChange = (query) => {
        const resultsFromStore =
            query.length >= this.props.searchBuffer
                ? this.checkForMatch(query)
                : [];

        this.setState(() => ({
            results: resultsFromStore,
            selectedIndex: 0,
            query
        }));
    };

    _resultClicked = (result) => {
        const { onResultClick } = this.props;
        this.setState(() => ({
            query: "",
            results: []
        }));

        /* istanbul ignore next */
        if (onResultClick) {
            onResultClick(result);
        }
    }

    render () {
        return (
            <KeywordSearchView
                className={this.props.className}
                data-id={this.props["data-id"]}
                onKeyDown={this._onKeyDown}
                onResultClick={this._resultClicked}
                onResultRender={this._onResultRender}
                onValueChange={this._onValueChange}
                queryString={this.state.query}
                results={this.state.results}
                selectedIndex={this.state.selectedIndex}
            />
        );
    }
}