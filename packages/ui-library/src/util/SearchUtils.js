/**
 * @method
 * @name AppFrame#_addToSearchTerms
 * @param {object} node
 * @private
 * @desc Adds item label and keywords to search terms
 */
const _addToSearchTerms = ({ id, label, keywords = [] }, searchTerms = {}) => {
    return [
        label,
        ...keywords
    ]
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
};

/**
 * @method
 * @name AppFrame#_addSearchProps
 * @param {object} node
 * @param {object} searchTerms
 * @param {object} possibleResults
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
    const ancestorProps = root && !section && children.length > 0
    ? {
        root,
        section: id
    }
    : {
        root
    };

    const { possibleResults: newResults, searchTerms: childSearchTerms } = children.reduce(
        ({ possibleResults: accResults, searchTerms: accSearch }, child) =>
            _getSearchProps({ ...child, ...ancestorProps }, accResults, accSearch)
    , { possibleResults, searchTerms });

    const result = {
        hasChildren: children.length > 0,
        id,
        label,
        root,
        ...section && { section }
    };

    return {
        possibleResults: {
            [id]: {
                ...result
            },
            ...newResults
        },
        searchTerms: _addToSearchTerms({
            id,
            keywords,
            ...result
        }, childSearchTerms)
    };
};

/**
 * @method
 * @name AppFrame#_buildSearchProps
 * @param {array} tree
 * @private
 * @desc Return the results lookup and the keyword lookup for search
 */
const buildSearchProps = (tree) => {
    return tree.reduce(({ possibleResults, searchTerms }, { id, children }) => {
        return children.reduce(({ possibleResults: accResults, searchTerms: accSearch }, child) => {
            return _getSearchProps({ ...child, root: id }, accResults, accSearch);
        }, { possibleResults, searchTerms });
    }, { possibleResults: {}, searchTerms: {} });
};

module.exports = {
    _addToSearchTerms,
    _getSearchProps,
    buildSearchProps
};