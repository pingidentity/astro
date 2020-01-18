import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias PipeRow.pipeGaps
 */
export const pipeGaps = {
    /** sm */
    SM: "sm",
    /** md */
    MD: "md",
};

/**
 * @class PipeRow
 * @desc Simple row that puts pipes between its items. Usually used for side-by-side links.
 *
 * @param {string} [className]
 *     CSS classes to be set on the root element.
 * @property {string} [data-id]
 *     To define the base "data-id" value for the top-level HTML container.
 * @property {PipeRow.pipeGaps} [gap=MD]
 *     Gap between the items and the pipe
 */

/**
 * @class Pipe
 * @memberof PipeRow
 * @desc Render the pipe
 *
 * @property {PipeRow.pipeGaps} [gap=MD]
 *     Gap between the pipe and other items.
 */

export const Pipe = ({ gap = "md" }) => <span className={classnames("pipe", `pipe--${gap}`)} />;

const PipeRow = ({
    children,
    className,
    "data-id": dataId,
    gap
}) => (
    <div className={classnames("pipe-row", className)} data-id={dataId}>
        {React.Children.map(children, (child, index) => (
            index > 0 ? [<Pipe key={`pipe-${index}`} gap={gap} />, child] : child
        ))}
    </div>
);

PipeRow.propTypes = {
    gap: PropTypes.oneOf(Object.values(pipeGaps)),
};

PipeRow.defaultProps = {
    gap: pipeGaps.MD,
};

export default PipeRow;