import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import classnames from "classnames";

/**
 * @class PageSpinner
 * @desc Simple loading spinner implementation. Depends on prop will show loading spinner animation or children content.
 * Children content should be exception safe if no data available, because it will be evaluated regardless of loading
 * state (react limitation), also content should be wrapped in top-level element (div or span) (also react limitation).
 *
 * @param {string} [data-id="page-spinner"]
 *     To define the base "data-id" value for top-level HTML container.
 *
 * @param {string} [defaultText]
 *     Text that shows if CSS rotations are not supported
 **/


const PageSpinner = ({
    "data-id": dataId,
    className,
    children,
    show
 }) => (
    <div data-id={dataId} className={classnames("spinner__box", className)}>
        <div><Spinner className="spinner__page" show={show}/></div>
        { children && <div className="spinner__text">{children}</div> }
    </div>
 );

PageSpinner.PropTypes = {
    "data-id": PropTypes.string,
    show: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

PageSpinner.defaultProps = {
    "data-id": "page-spinner",
};

export default PageSpinner;