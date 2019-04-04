/**
 * @method
 * @name _addToSearchTerms
 * @param {object} node
 * @private
 * @desc Adds item label and keywords to search terms
 */
export const _addToSearchTerms = ({
    id,
    label,
    keywords = []
}, searchTerms = {}) =>
    [label, ...keywords]
        .filter(key => key.length > 1)
        .reduce((acc, keyword) => {
            const lowerKey = keyword.toLowerCase();

            const {
                [lowerKey]: currentKeyValues = []
            } = acc;

            return {
                ...acc,
                [lowerKey]: [
                    id,
                    ...currentKeyValues
                ]
            };
        }, searchTerms);

/**
 * @method
 * @name _addSearchProps
 * @param {object} node
 * @param {object} possibleResults
 * @param {object} searchTerms
 * @private
 * @desc Return search terms and results for a tree node recursively
 */
const _getSearchProps = ({
    id,
    label,
    root,
    section,
    keywords = [],
    children = []
}, possibleResults, searchTerms) => {
    // Give children information on their parents. Setting section
    // on end nodes doesn't matter because they have no children.
    const ancestorProps = root && !section && children.length > 0
        ? {
            root,
            section: id
        }
        : {
            root
        };

    // Get results and search terms for all children
    const { possibleResults: newResults, searchTerms: childSearchTerms } = children.reduce(
        ({ possibleResults: accResults, searchTerms: accSearch }, child) =>
            _getSearchProps({ ...child, ...ancestorProps }, accResults, accSearch)
        , { possibleResults, searchTerms });

    const result = {
        hasChildren: children.length > 0,
        id,
        label,
        root,
        section
    };

    const isEndNode = !!section || root && children.length === 0;

    return {
        // Don't add results unless they're end nodes
        possibleResults:
            isEndNode
                ? {
                    [id]: {
                        ...result
                    },
                    ...newResults
                }
                : newResults,
        searchTerms:
            isEndNode
                ? _addToSearchTerms({
                    id,
                    keywords,
                    ...result
                }, childSearchTerms)
                : childSearchTerms
    };
};

const _getResults = (possibleResults, ids, currentResults = []) => {
    return ids.reduce((acc, id) => {
        return currentResults.some(current => id === current.id)
            ? acc
            : [possibleResults[id], ...acc];
    }, []);
};

export const _sort = ({ id: a }, { id: b }) => a > b ? 1 : -1;

/**
 * @method
 * @name _buildSearchProps
 * @param {array} tree
 * @private
 * @desc Return the results lookup and the keyword lookup for search
 */
export const _buildSearchProps = (tree) => {
    return tree.reduce(({ possibleResults, searchTerms }, { id, children }) => {
        return children.reduce(({ possibleResults: accResults, searchTerms: accSearch }, child) => {
            return _getSearchProps({ ...child, root: id }, accResults, accSearch);
        }, { possibleResults, searchTerms });
    }, { possibleResults: {}, searchTerms: {} });
};


/**
 * @method
 * @name _checkForMatch
 * @param {object} searchTerms
 * @param {object} possibleResults
 * @param {string} query
 * @private
 * @desc Checks for a match against provided search terms and possible results; curried so that factory can use it.
 */
const _checkForMatch = searchTerms => possibleResults => query => {
    const {
        startsWith,
        contains
    } = Object.keys(searchTerms).reduce(({ startsWith: startsAcc, contains: containsAcc }, key) => {
        // Return all results for empty query
        const keyIndex = query ? key.indexOf(query.toLowerCase()) : 0;

        // Put results that start with the search term before results that just contain it.
        if (keyIndex === 0 || !query) {
            const { [key]: idResults } = searchTerms;
            return {
                startsWith: [
                    ...startsAcc,
                    ..._getResults(possibleResults, idResults, [...startsAcc, ...containsAcc])
                ],
                contains: containsAcc
            };
        } else if (keyIndex > 0) {
            const { [key]: idResults } = searchTerms;
            return {
                startsWith: startsAcc,
                contains: [
                    ...containsAcc,
                    ..._getResults(possibleResults, idResults, [...startsAcc, ...containsAcc])
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
        ...startsWith.sort(_sort),
        ...contains.sort(_sort)
    ];
};

/**
 * @method
 * @name createSearch
 * @param {array} tree
 * @public
 * @desc Returns a function that searches the nodes of a given tree based on the provided string query.
 */
export const createSearch = (tree = []) => {
    const {
        possibleResults,
        searchTerms
    } = _buildSearchProps(tree);

    return _checkForMatch(searchTerms)(possibleResults);
};

// Would use string.contains() here, but Jest doesn't like it. Probably related to our Node.js version.
export function containsString(string, searchTerm) {
    return string.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
}
