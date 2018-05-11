const React = require("react"),
    PropTypes = require("prop-types"),
    KeywordSearchView = require("./KeywordSearchView");

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
 * @param {Object} [searchTerms]
 *     An object with properties representing each keyword; their values are the result ids they match
 *
 * @param {Object} [possibleResults]
 *     A key-value list of demo IDs and their associated labels and categories
 *
 * @param {Search~onResultClick}
 *     Callback to be triggered when a result is clicked; passes back result properties from possibleResults
 *
 */

class KeywordSearch extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        classname: PropTypes.string,
        searchBuffer: PropTypes.number,
        searchTerms: PropTypes.objectOf(
            PropTypes.arrayOf(
                PropTypes.string
            )
        ).isRequired,
        possibleResults: PropTypes.objectOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired
            })
        ).isRequired,
        onResultClick: PropTypes.func
    }

    static defaultProps = {
        "data-id": "keyword-search",
        searchBuffer: 1
    }

    state = {
        query: "",
        results: []
    }

    _getResults = (ids) => {
        return ids.map(id => this.props.possibleResults[id]);
    }

    _sort = ({ id: a }, { id: b }) => a > b ? 1 : -1

    _checkForMatch = (query, searchTerms) => {
        const {
            startsWith,
            contains
        } = Object.keys(searchTerms).reduce(({ startsWith: startsAcc, contains: containsAcc }, key) => {
            const keyIndex = key.indexOf(query.toLowerCase());
            if (keyIndex === 0) {
                const { [key]: idResults } = searchTerms;
                return {
                    startsWith: [
                        ...startsAcc,
                        ...this._getResults(idResults)
                    ],
                    contains: containsAcc
                };
            } else if (keyIndex > 0) {
                const { [key]: idResults } = searchTerms;
                return {
                    startsWith: startsAcc,
                    contains: [
                        ...containsAcc,
                        ...this._getResults(idResults)
                    ]
                };
            } else {
                return {
                    startsWith: startsAcc,
                    contains: containsAcc
                };
            }
        }, { startsWith: [], contains: [] });

        return [
            ...startsWith.sort(this._sort),
            ...contains.sort(this._sort)
        ];
    }

    _onValueChange = (query) => {
        const {
            searchBuffer,
            searchTerms
        } = this.props;

        const resultsFromStore = query.length >= searchBuffer
            ? this._checkForMatch(query, searchTerms)
            : [];

        this.setState(() => ({
            results: resultsFromStore,
            query
        }));
    };

    _resultClicked = (result) => {
        const { onResultClick } = this.props;
        this.setState(() => ({
            query: "",
            results: []
        }));
        if (onResultClick) {
            onResultClick(result);
        }
    }

    render () {
        return (
            <KeywordSearchView
                className={this.props.className}
                data-id={this.props["data-id"]}
                onResultClick={this._resultClicked}
                onValueChange={this._onValueChange}
                results={this.state.results}
                queryString={this.state.query}
            />
        );
    }
}

module.exports = KeywordSearch;