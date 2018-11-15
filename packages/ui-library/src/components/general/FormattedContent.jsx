import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 * @class FormattedContent
 * @desc A container that applies standard styling to native HTML elements inside it.
 *      Intended for large blocks of content.
 *
 * @param {string} [data-id="formatted-content"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *          CSS class to set on the top HTML element (optional)
 *
 * @example <FormattedContent>
 *              <p>
 *                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
 *                  doloremque laudantium, <strong>totam rem aperiam</strong>, eaque ipsa quae ab illo inventore
 *                  veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
 *                  ipsam <em>voluptatem quia voluptas sit aspernatur aut odit aut fugit</em>, sed quia
 *                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 *              </p>
 *              <ul>
 *                  <li>One</li>
 *                  <li>Two</li>
 *                  <li>Three</li>
 *              </ul>
 *          </FormattedContent>
 */

const FormattedContent = ({ children, className, "data-id": dataId }) => (
    <div className={classnames("formatted-content", className)} data-id={dataId}>
        {children}
    </div>
);

FormattedContent.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
};

FormattedContent.defaultProps = {
    "data-id": "formatted-content",
};

export default FormattedContent;