import PropTypes from "prop-types";
import { makeSpacing, sizes } from "./Spacing";

const getClassName = (value, placement) => value !== undefined ? `padding-component--${placement}-${value}` : "";

/**
 * @class Padding
 * @desc Flexible component for adding padding. Different from Spacing because padding doesn't collapse.
 * @param {string} [data-id="padding-component"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      class name(s) to add to the top-level container/div
 * @param {Spacing.Sizes} bottom
 *      Padding on bottom
 * @param {Spacing.Sizes} left
 *      Padding on left
 * @param {Spacing.Sizes} right
 *      Padding on right
 * @param {Spacing.Sizes} top
 *      Padding on top
 * @param {Spacing.Sizes} vertical
 *      Padding on top and bottom
 * @param {Spacing.Sizes} horizontal
 *      Padding on left and right
 * @param {Spacing.Sizes} padding
 *      Padding on all sides
 */

const makeInlineClass = ({ inline }) => ({
    "padding-component--inline": inline
});

const Padding = makeSpacing({ getClassName, makeCustomClasses: makeInlineClass });

const paddingPropType = PropTypes.oneOf(Object.values(sizes));

Padding.propTypes = {
    bottom: paddingPropType,
    left: paddingPropType,
    right: paddingPropType,
    top: paddingPropType,
    vertical: paddingPropType,
    horizontal: paddingPropType,
    padding: paddingPropType,
};

Padding.defaultProps = {
    "data-id": "padding-component"
};

Padding.sizes = sizes;

export default Padding;
