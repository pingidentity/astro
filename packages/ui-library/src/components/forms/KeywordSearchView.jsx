import React, { useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "../general/Link";
import FlexRow, { alignments, spacingOptions } from "../layout/FlexRow";
import FormSearchBox from "./FormSearchBox";
import InputWidths from "./InputWidths";
import Text, { textTypes } from "../general/Text";

const KeywordSearchView = ({
    className,
    ["data-id"]: dataId,
    onKeyDown,
    onResultClick,
    onValueChange,
    queryString,
    results,
    selectedIndex,
    title,
}) => {
    const selectedRef = useRef();
    const containerRef = useRef();

    const _renderSearchResult = (result, idx) => {
        const {
            id,
            label,
            root: {
                id: rootId,
                label: root = rootId
            },
            section
        } = result;

        const resultClicked = () => onResultClick(result);
        const isSelected = idx === selectedIndex;
        const resultClass = `keyword-search__result ${isSelected ? "keyword-search__result--selected" : ""}`;

        const resultTitle = (
            <FlexRow alignment={alignments.BOTTOM} spacing={spacingOptions.XS}>
                <div
                    className="keyword-search__result-label"
                    {...isSelected ? { ref: selectedRef } : {}}
                >
                    {`${label} - `}
                </div>

                <Text
                    className="keyword-search__result-root"
                    inline
                    type={textTypes.PARENTLABEL}
                    overflow={Text.overflowTypes.ELLIPSIS}
                >
                    {root}
                </Text>
                <Text
                    inline
                    type={textTypes.PARENTLABEL}
                    className="keyword-search__result-carat">
                    {section ? "> " : ""}
                </Text>
                {section &&
                <Text
                    className="keyword-search__result-section"
                    inline
                    type={textTypes.PARENTLABEL}
                    overflow={Text.overflowTypes.ELLIPSIS}
                >
                    {section.label || section.id}
                </Text>}
            </FlexRow>
        );

        const sanitizedLabel = label.toLowerCase().replace(/[^0-9a-z]/gi, "");

        return (
            <li key={id}>
                <Link
                    className={resultClass}
                    data-id={`search-result_${rootId}${section ? `-${section.id}` : ""}-${sanitizedLabel}`}
                    focusable
                    title={resultTitle}
                    onClick={resultClicked}
                    type="block"
                />
            </li>
        );
    };

    const containerClassName = classNames("keyword-search", className);

    /* istanbul ignore next */
    const scrollResultIntoView = () => {
        const selected = selectedRef.current;
        if (selected) {
            const {
                current: {
                    offsetHeight: containerHeight,
                    scrollTop: containerScroll
                }
            } = containerRef;

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
                width={InputWidths.AUTO}
            />
            {title &&
                <Text
                    className="keyword-search__title"
                    type={textTypes.SECTIONTITLE}
                >
                    {title}
                </Text>
            }
            <ul className="keyword-search__results" ref={containerRef}>
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