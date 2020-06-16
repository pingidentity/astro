import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";
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

export const defaultSort = ({ startsWith, contains }) => {
    const sort = ({ id: a }, { id: b }) => a > b ? 1 : -1;
    return [
        ...startsWith.sort(sort),
        ...contains.sort(sort)
    ];
};

export default class KeywordSearch extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        initialResults: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        onResultClick: PropTypes.func,
        searchBuffer: PropTypes.number,
        sort: PropTypes.func,
        title: PropTypes.node,
        tree: PropTypes.arrayOf(
            PropTypes.shape({
                children: PropTypes.array,
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
    }

    static defaultProps = {
        "data-id": "keyword-search",
        searchBuffer: 0,
        sort: defaultSort
    }

    searchTree = noop
    resultsIndex = {}
    createSearchAndIndex = props => {
        const [search, resultsIndex] = createSearch(props.tree);
        this.searchTree = search;
        this.resultsIndex = resultsIndex;
    }

    checkForMatch = term => this.props.sort(this.searchTree(term))

    getInitialResults = () =>
        this.props.initialResults
            ? this.props.initialResults.map(id => this.resultsIndex[id])
            : this.checkForMatch("")

    constructor(props) {
        super(props);

        this.createSearchAndIndex(props);
        this.state = {
            query: null,
            results: this.getInitialResults(),
            selectedIndex: 0
        };
    }

    componentDidUpdate({ navTree: prevNavTree }) {
        if (prevNavTree !== this.props.navTree) {
            this.createSearchAndIndex(this.props);
        }
    }

    _resetSearch = () => this.setState({
        query: null,
        results: this.getInitialResults(),
        selectedIndex: 0
    })

    _onKeyDown = ({ keyCode }) => {
        if (isArrowUp(keyCode)) {
            this.setState(({ selectedIndex }) => ({
                selectedIndex: selectedIndex === 0 ? 0 : selectedIndex - 1
            }));
        } else if (isArrowDown(keyCode)) {
            /* istanbul ignore next */
            this.setState(({ results, selectedIndex }) => ({
                selectedIndex: selectedIndex === results.length - 1 ? results.length - 1 : selectedIndex + 1
            }));
        } else /* istanbul ignore next */ if (isEnter(keyCode)) {
            const {
                results,
                selectedIndex
            } = this.state;

            const result = results[selectedIndex];

            if (result) {
                this._resultClicked(result);
            } else {
                this._resetSearch();
            }

        }
    }

    _onValueChange = (query) => {
        const resultsFromStore =
            query.length >= this.props.searchBuffer
                ? this.checkForMatch(query)
                : [];

        this.setState({
            results: resultsFromStore,
            selectedIndex: 0,
            query
        });
    };

    _resultClicked = (result) => {
        const { onResultClick } = this.props;
        this._resetSearch();

        /* istanbul ignore next */
        if (onResultClick) {
            onResultClick(result);
        }
    }

    render () {
        const {
            className,
            "data-id": dataId,
            title,
            initialTitle = title,
        } = this.props;

        return (
            <KeywordSearchView
                className={className}
                data-id={dataId}
                onKeyDown={this._onKeyDown}
                onResultClick={this._resultClicked}
                onResultRender={this._onResultRender}
                onValueChange={this._onValueChange}
                queryString={this.state.query}
                results={this.state.results}
                selectedIndex={this.state.selectedIndex}
                title={this.state.query === null ? initialTitle : title}
            />
        );
    }
}
