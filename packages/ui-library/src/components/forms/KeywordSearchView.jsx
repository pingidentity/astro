import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Link from "../general/Link";
import FormSearchBox from "./FormSearchBox";
import classNames from "classnames";

const KeywordSearchView = ({
    className,
    ["data-id"]: dataId,
    onKeyDown,
    onResultClick,
    onValueChange,
    queryString,
    results,
    selectedIndex
}) => {
    let _selected = null;
    let _container = null;

    const _getNav = (root, section) => {
        const nav =
            [root, section]
            .filter(node => node)
            .join(" > ");

        return (
            <div className="keyword-search__result__nav">
                {nav}
            </div>
        );
    };

    const _renderSearchResult = (result, idx) => {
        const {
            label,
            root,
            section
        } = result;

        const resultClicked = () => onResultClick(result);
        const nav = _getNav(root, section);
        const isSelected = idx === selectedIndex;
        const resultClass = `keyword-search__result ${isSelected ? "keyword-search__result--selected" : ""}`;

        const title = (
            <div ref={ref => _selected = isSelected ? ref : _selected } >
                {nav}
                {label}
            </div>
        );

        return (
            <li key={idx}>
                <Link
                    className={resultClass}
                    focusable
                    key={`Result ${idx}`}
                    title={title}
                    onClick={resultClicked}
                />
            </li>
        );
    };

    const containerClassName = classNames("keyword-search", className);

    /* istanbul ignore next */
    const scrollResultIntoView = () => {
        if (_selected) {
            const {
                offsetHeight: containerHeight,
                scrollTop: containerScroll
            } = ReactDOM.findDOMNode(_container);

            const selected = ReactDOM.findDOMNode(_selected);

            const scrollDifference = selected.offsetTop - containerScroll;

            if (scrollDifference < 0) {
                selected.scrollIntoView();
            } else if (scrollDifference > containerHeight - selected.offsetHeight) {
                selected.scrollIntoView(false);
            }
        }
    };

    window.requestAnimationFrame(scrollResultIntoView);

    return (
        <div className={containerClassName} data-id={dataId}>
            <FormSearchBox
                className="keyword-search__box"
                queryString={queryString}
                onKeyDown={onKeyDown}
                onValueChange={onValueChange}
                ref={search => search && search.searchBoxFocus()}
            />
            <ul className="keyword-search__results" ref={ref => _container = ref }>
                {results.map(_renderSearchResult)}
            </ul>
        </div>
    );
};

KeywordSearchView.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    onResultClick: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    results: PropTypes.array,
    queryString: PropTypes.string
};

KeywordSearchView.defaultProps = {
    ["data-id"]: "search-view",
    onResultClick: () => {},
    results: [],
    queryString: ""
};

export default KeywordSearchView;