import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Draggable from "react-draggable";
import _ from "underscore";
import { usePStateful } from "../../util/PropUtils";
import {
    isArrowDown,
    isArrowLeft,
    isArrowUp,
    isArrowRight,
    isEnd,
    isHome,
    withFocusOutline
} from "../../util/KeyboardUtils";

const DEFAULT_BACKGROUND_COLOR = "#f2f2f2";

/**
 * @class Slider
 * @desc The grouped buttons in a dialog
 *
 * @param {string} [data-id="slider"]
 *      To define the base "data-id" value for the top-level HTML container.
 * @param {string | array | function} [background]
 *      Background color of slider (single color string, array of color strings, array of objects with color and point)
 * @param {array} [backgroundVariant]
 *      Solid or gradient background
 * @param {array | number} [defaultValue]
 *      Default slider value
 * @param {boolean} [disabled]
 *    Disables slider
 * @param {number} [max]
 *      Maximum slider value
 * @param {number} [min]
 *      Minimum slider value
 * @param {function} [onValueChange]
 *      Callback to be triggered when the slider value changes.
 * @param {number} [steps]
 *      Step intervals on slider
 * @param {array | number} [value]
 *      Slider value
 * @param {string | number} [width]
 *      Width of slider
 */

function Slider({
    background,
    "data-id": dataId,
    backgroundVariant,
    defaultValue,
    disabled,
    max,
    min,
    onValueChange,
    steps,
    width,
    value
}) {

    const sliderRef = useRef();
    const sliderWidthMinusIndicator = (
        sliderRef.current ? (sliderRef.current.offsetWidth ? sliderRef.current.offsetWidth - 25 : 1000) : 1000
    );
    const [points, setPoints] = usePStateful(value, defaultValue);

    const getValueArray = () => {
        if (typeof points === "number") {
            return [].concat(points);
        } else {
            return points.sort((a, b) => a - b);
        }
    };

    useEffect(() => {
        if (typeof points === "number") {
            setPoints(points);
        }
        else {
            setPoints(getValueArray());
        }
    }, []);

    const getValuePosition = (val) => {
        const pointValue = val - min;
        const scale = max - min;
        const pointPercentage = pointValue / scale;
        const valuePosition = pointPercentage * sliderWidthMinusIndicator;

        return valuePosition;
    };

    const getBound = (boundIndex, position) => {
        const absolutePositionValue = points[boundIndex] - min;
        const lowerBound = absolutePositionValue + 1;
        const upperBound = absolutePositionValue - 1;
        const widthPerPoint = sliderWidthMinusIndicator / (max - min);
        const lowerBoundPixels = lowerBound * widthPerPoint;
        const upperBoundPixels = upperBound * widthPerPoint;

        if (position === "lower") {
            return lowerBoundPixels;
        } else if (position === "upper") {
            return upperBoundPixels;
        }
    };

    const getPercentageFromPoint = (point) => {
        const scale = max - min;
        const pointValue = point - min;
        const pointPercentage = (pointValue / scale) * 100;

        return pointPercentage;
    };

    const backgroundToCSS = (bg) => {
        const backgroundPoints = bg.reduce((acc, val, index) => {
            const color = typeof val === "object" ? (val.color || DEFAULT_BACKGROUND_COLOR) : val;
            const position = val.point ? getPercentageFromPoint(val.point) : index / (bg.length - 1) * 100;
            const stop = { color, position };

            //add hard stops if solid so gradient doesn't blend
            const hardStop = backgroundVariant === "solid"
                ? {
                    color: color,
                    position: getPercentageFromPoint(acc[acc.length - 1] ? acc[acc.length - 1].position : min) //start color at previous position or min (for first one)
                }
                : [];

            return ([
                ...acc,
                ...hardStop,
                ...stop
            ]);
        }, []);


        return backgroundPoints.reduce((acc, val) => {
            return `${acc}, ${val.color} ${val.position}%`;
        }, "linear-gradient(to right");


    };

    const getBackground = (bg, position = 0) => {
        switch (typeof bg) {
            case "function":
                return getBackground(bg(position)); //send the results of the function back through
            case "string":
                return bg;
            default:
                return backgroundToCSS(bg);
        }
    };

    const getPositionValue = (data, position) => {
        const relativePosition = Math.round(data.x / sliderWidthMinusIndicator * (max - min));
        const positionValue = relativePosition + min;

        const currentValues = Object.assign([], points, { [position]: positionValue });
        if (JSON.stringify(currentValues) !== JSON.stringify(points)) {
            onValueChange(points.length > 1 ? currentValues : positionValue);
            setPoints(currentValues);
        }
    };

    const getSteps = () => {
        const difference = max - min;
        const numOfSteps = difference / steps;
        const stepWidth = sliderWidthMinusIndicator / numOfSteps;
        return stepWidth;
    };

    const formArray = (inputValue, index) => {
        const array = points.map((val, i) => {
            if (index === i) {
                return inputValue;
            } else {
                return val;
            }
        });

        return array;
    };

    const lastValueKey = (index) => {
        if (typeof points === "number") {
            const difference = max - value;
            const remainder = difference % steps;
            const maxValue = max - remainder;

            return maxValue;
        } else if (typeof points[index + 1] === "undefined") {
            const difference = max - points[index];
            const remainder = difference % steps;
            const maxValue = max - remainder;

            return formArray(maxValue, index);
        } else {
            const difference = points[index + 1] - points[index];
            const remainder = difference % steps;
            const maxValue = points[index + 1] - remainder;
            const finalValue = maxValue - steps;

            return formArray(finalValue, index);
        }
    };

    const firstValueKey = (index) => {
        if (typeof points === "number") {
            const remainder = value % steps;

            return remainder;
        } else if (typeof points[index - 1] === "undefined") {
            const remainder = points[index] % steps;
            const minValue = remainder !== 0 ? remainder + steps : remainder;

            return formArray(minValue, index);
        } else {
            const difference = points[index] - points[index - 1];
            const remainder = difference % steps;
            const minValue = points[index - 1] + remainder;
            const finalValue = minValue === points[index - 1] ? minValue + steps : minValue;

            return formArray(finalValue, index);
        }
    };

    const incrementKey = (index) => {
        if (typeof points[index + 1] !== "undefined" && points[index] + steps >= points[index + 1]) {
            return points;
        } else if (points + steps > max) {
            return points;
        } else if (typeof points === "number") {
            return points + steps;
        } else {
            const newArray = points.map((val, i) => {
                if (index === i) {
                    return val + steps;
                } else {
                    return val;
                }
            });

            return newArray;
        }
    };

    const decrementKey = (index) => {
        if (typeof points[index - 1] !== "undefined" && points[index] - steps <= points[index - 1]) {
            return points;
        } else if (points - steps < min) {
            return points;
        } else if (typeof points === "number") {
            return points - steps;
        } else {
            const newArray = points.map((val, i) => {
                if (index === i) {
                    return val - steps;
                } else {
                    return val;
                }
            });

            return newArray;
        }
    };

    const setPointsAndValue = (val) => {
        setPoints(val);
        onValueChange(val);
    };

    const _handleKeyDown = (e, index) => {
        const { keyCode } = e;

        if (isArrowLeft(keyCode) || isArrowDown(keyCode)) {
            e.preventDefault();
            setPointsAndValue(decrementKey(index));
        } else if (isArrowRight(keyCode) || isArrowUp(keyCode)) {
            e.preventDefault();
            setPointsAndValue(incrementKey(index));
        } else if (isHome(keyCode)) {
            e.preventDefault();
            setPointsAndValue(firstValueKey(index));
        } else if (isEnd(keyCode)) {
            e.preventDefault();
            setPointsAndValue(lastValueKey(index));
        }
    };

    const sliderClassName = classnames("slider", {
        "slider--disabled": disabled
    });

    const indicatorClassname = classnames("slider__indicator", "focusable-element", {
        "slider__indicator--disabled": disabled
    });

    return (
        <div className="slider__container" style={{ width: width }} data-id={dataId}>
            <div className={sliderClassName}
                ref={sliderRef}
                style={{ background: getBackground(background, points) }}
            />
            {sliderWidthMinusIndicator && (
                getValueArray().map((val, index) => {
                    return (
                        <Draggable
                            axis="x"
                            bounds={{
                                left: points[index - 1] ? getBound(index - 1, "lower") : 0,
                                right: points[index + 1] ? getBound(index + 1, "upper") : sliderWidthMinusIndicator
                            }}
                            disabled={disabled}
                            grid={[getSteps(), 0]}
                            key={index}
                            onDrag={(e, data) => getPositionValue(data, index)}
                            position={{ x: getValuePosition(val), y: 0 }}>
                            <div
                                className={indicatorClassname}
                                tabIndex={0}
                                onKeyDown={(e) => _handleKeyDown(e, index)}
                                role="slider"
                                aria-valuemin={points[index - 1] ? points[index - 1] + steps : min}
                                aria-valuemax={points[index + 1] ? points[index + 1] - steps : max}
                                aria-valuenow={typeof points === "number" ? points : points[index]}
                            />
                        </Draggable>
                    );
                })
            )}
        </div>
    );
}

Slider.propTypes = {
    "data-id": PropTypes.string,
    background: PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.object)
    ),
    backgroundVariant: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    onValueChange: PropTypes.func,
    steps: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Slider.defaultProps = {
    "data-id": "slider",
    defaultValue: 0,
    disabled: false,
    max: 100,
    min: 0,
    onValueChange: _.noop,
    steps: 1,
    width: "100%",
    backgroundVariant: "solid",
    background: DEFAULT_BACKGROUND_COLOR,
};

export default withFocusOutline(Slider);
