"use strict";

//NOTE: Do not use keyMirror to generate the enums as JSDocs doesn't know how to parse it for keys.

/**
 * @module constants/ChartingConstants
 * @desc Related charting constants.
 */
module.exports = {
    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.ChartLayouts
     * @desc Chart layouts.
     */
    Layouts: {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.AxisTypes
     * @desc Axis types.
     */
    AxisTypes: {
        NUMBER: "number",
        STRING: "category"
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.AxisOrientations
     * @desc Axis orientations.
     */
    AxisOrientations: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right"
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.LineTypes
     * @desc Line interpolation types.
     */
    LineTypes: {
        BASIS: "basis",
        BASIS_CLOSED: "basisClosed",
        BASIS_OPEN: "basisOpen",
        LINEAR: "linear",
        LINEAR_CLOSED: "linearClosed",
        NATURAL: "natural",
        MONOTONE_X: "monotoneX",
        MONOTONE_Y: "monotoneY",
        MONOTONE: "monotone",
        STEP: "step",
        STEP_BEFORE: "stepBefore",
        STEP_AFTER: "stepAfter"
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.LegendTypes
     * @desc Legend icon types.
     */
    LegendTypes: {
        LINE: "line",
        SQUARE: "square",
        RECTANGLE: "rect",
        CIRCLE: "circle",
        CROSS: "cross",
        DIAMOND: "diamond",
        STAR: "star",
        TRIANGLE: "triangle",
        WYE: "wye",
        NONE: "none"
    }
};
