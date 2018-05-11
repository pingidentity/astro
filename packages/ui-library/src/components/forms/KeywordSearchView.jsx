const React = require("react"),
    PropTypes = require("prop-types"),
    Link = require("../general/Link"),
    FormSearchBox = require("./FormSearchBox"),
    classNames = require("classnames");

const SearchView = ({
    className,
    ["data-id"]: dataId,
    onResultClick,
    onValueChange,
    results = [],
    queryString = ""
}) => {
    const getIconClass = ({
        hasChildren,
        root
    }) => {
        if (root && hasChildren) {
            return "directory";
        } else {
            return "file";
        }
    };

    const _renderSearchResult = (result, idx) => {
        const { label } = result;
        const resultClicked = () => onResultClick(result);
        const icon = getIconClass(result);
        return (
            <Link
                key={`Result-${idx}`}
                className="keyword-search__result"
                title={label}
                onClick={resultClicked}
                icon={icon}/>
        );
    };

    const containerClassName = classNames("keyword-search", className);

    return (
        <div className={containerClassName} data-id={dataId}>
            <FormSearchBox
                className="keyword-search__box"
                queryString={queryString}
                onValueChange={onValueChange}
            />
            <div className="keyword-search__results">
                {results.map(_renderSearchResult)}
            </div>
        </div>
    );
};

SearchView.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    onResultClick: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    results: PropTypes.array,
    queryString: PropTypes.string
};

SearchView.defaultProps = {
    ["data-id"]: "search-view",
    onResultClick: () => {}
};

module.exports = SearchView;