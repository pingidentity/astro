
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FlexRow, { alignments } from "./FlexRow";

/**
 * @class FieldSet
 * @desc Container with border which wraps contents
 *
 * @param {string} [data-id]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [className]
 *     Optional CSS classname(s) applied to top-level container.
 * @param {node} [legend]
 *    Text that will appear within the border.
 * @param {node} [children]
 *    A node that will appear in the component.
 * @param {bool} [isFullWidth=false]
 *   Whether or not the fieldset box takes up the full width
 * @example
 *     <FieldSet legend="IDs">
 *          <Text> Lorem Ipsum...</Text>
 *     </FieldSet>
 */

export default function FieldSet({
    legend,
    children,
    "data-id": dataId,
    className,
    isFullWidth
}) {

    return (
        <FlexRow
            className={className}
            alignment={alignments.CENTER}
            data-id={dataId}>
            <fieldset className={classnames("field-set-component", { "field-set-component--full-width": isFullWidth })}>
                {legend ? <legend>{legend}</legend> : null }
                {children}
            </fieldset>
        </FlexRow>
    );
}

FieldSet.propTypes = {
    legend: PropTypes.node,
    "data-id": PropTypes.string,
    className: PropTypes.string,
    isFullWidth: PropTypes.bool
};

FieldSet.defaultProps = {
    isFullWidth: false
};
