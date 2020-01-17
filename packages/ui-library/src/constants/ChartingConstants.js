"use strict";

//NOTE: Do not use keyMirror to generate the enums as JSDocs doesn't know how to parse it for keys.

/**
 * @module constants/ChartingConstants
 * @desc Related charting constants.
 */
module.exports = {
    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.Layouts
     * @desc Chart layouts.
     */
    Layouts: {
        /** horizontal */
        HORIZONTAL: "horizontal",
        /** vertical */
        VERTICAL: "vertical",
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.AxisTypes
     * @desc Axis types.
     */
    AxisTypes: {
        /** number */
        NUMBER: "number",
        /** category */
        STRING: "category",
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.AxisOrientations
     * @desc Axis orientations.
     */
    AxisOrientations: {
        /** top */
        TOP: "top",
        /** bottom */
        BOTTOM: "bottom",
        /** left */
        LEFT: "left",
        /** right */
        RIGHT: "right",
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.LineTypes
     * @desc Line interpolation types.
     */
    LineTypes: {
        /** basis */
        BASIS: "basis",
        /** basisClosed */
        BASIS_CLOSED: "basisClosed",
        /** basisOpen */
        BASIS_OPEN: "basisOpen",
        /** linear */
        LINEAR: "linear",
        /** linearClosed */
        LINEAR_CLOSED: "linearClosed",
        /** natural */
        NATURAL: "natural",
        /** monotoneX */
        MONOTONE_X: "monotoneX",
        /** monotoneY */
        MONOTONE_Y: "monotoneY",
        /** monotone */
        MONOTONE: "monotone",
        /** step */
        STEP: "step",
        /** stepBefore */
        STEP_BEFORE: "stepBefore",
        /** stepAfter */
        STEP_AFTER: "stepAfter",
    },

    /**
     * @enum {string}
     * @alias module:constants/ChartingConstants.LegendTypes
     * @desc Legend icon types.
     */
    LegendTypes: {
        /** line */
        LINE: "line",
        /** square */
        SQUARE: "square",
        /** rect */
        RECTANGLE: "rect",
        /** circle */
        CIRCLE: "circle",
        /** cross */
        CROSS: "cross",
        /** diamond */
        DIAMOND: "diamond",
        /** star */
        STAR: "star",
        /** triangle */
        TRIANGLE: "triangle",
        /** wye */
        WYE: "wye",
        /** none */
        NONE: "none",
    }
};
