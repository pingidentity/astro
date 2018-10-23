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
 * @param {string} [className]
 *     Custom class names
 * @param {string} [data-id="page-spinner"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [modal]
 *     When true, the spinner displays centered on the page as a modal,with a page-blocking background.
 * @param {string} [small]
 *     When true, the spinner displays as a smaller size.
 *
 * @param {string} [defaultText]
 *     Text that shows if CSS rotations are not supported
 **/


const PageSpinner = ({
    "data-id": dataId,
    className,
    children,
    modal,
    small,
}) => {
    const spinner = (
        <div data-id={dataId} className={classnames("page-loader__box", className)}>
            <div>
                <Spinner className={classnames("page-loader", small ? "page-loader--small" : null)} show={true} />
            </div>
            {children && <div className="page-loader__text" data-id={`${dataId}-text`}>{children}</div>}
        </div>
    );

    if (modal) {
        return (
            <div className="modal show">
                <div className="modal-bg" data-id="modal-bg"></div>
                {spinner}
            </div>
        );
    } else {
        return spinner;
    }
};

PageSpinner.propTypes = {
    "data-id": PropTypes.string,
    modal: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

PageSpinner.defaultProps = {
    "data-id": "page-spinner",
    modal: false,
    small: false,
};

export default PageSpinner;