import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import { chartingColors } from "../../../constants/DashboardConstants";

const baseClass = "chart-tooltip";

export const textAlignments = {
    CENTER: "center",
    LEFT: "left",
    RIGHT: "right"
};

const getTextAlignmentClass = alignment => {
    switch (alignment) {
        case textAlignments.CENTER:
            return `${baseClass}--align-center`;
        case textAlignments.RIGHT:
            return `${baseClass}--align-right`;
        case textAlignments.LEFT:
        default:
            return `${baseClass}--align-left`;
    }
};

const ChartTooltip = ({
    label,
    textAlignment,
    values
}) => {
    const isHorizontal = values.length > 3;

    return (
        <div className={baseClass}>
            <div className={classnames(
                `${baseClass}__label`,
                isHorizontal ? `${baseClass}--align-center` : getTextAlignmentClass(textAlignment),
                {
                    [`${baseClass}__label--horizontal`]: isHorizontal
                }
            )}
            >
                {label}
            </div>
            <div
                className={classnames(
                    `${baseClass}__values`,
                    {
                        [`${baseClass}__values--horizontal`]: isHorizontal
                    }
                )}
            >
                {values.map(({ id, color, label: valueLabel = id, value }, idx) => (
                    <div
                        className={classnames(
                            `${baseClass}__value-container`,
                            {
                                [`${baseClass}__value-container--horizontal`]: isHorizontal
                            }
                        )}
                        key={id}
                    >
                        {value !== undefined && (
                            <div
                                className={`${baseClass}__value`}
                                style={{ color: color || chartingColors[idx] }}
                            >
                                {value}
                            </div>
                        )}
                        {id !== undefined && <div className={`${baseClass}__subtitle`}>{valueLabel}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

ChartTooltip.propTypes = {
    label: propTypes.node,
    textAlignment: propTypes.oneOf([
        textAlignments.CENTER,
        textAlignments.LEFT,
        textAlignments.RIGHT
    ]),
    values: propTypes.arrayOf(
        propTypes.shape({
            color: propTypes.string,
            id: propTypes.oneOfType([
                propTypes.number,
                propTypes.string
            ]),
            label: propTypes.string,
            value: propTypes.oneOfType([
                propTypes.number,
                propTypes.string
            ]),
        })
    ).isRequired,
};

ChartTooltip.defaultProps = {
    textAlignment: textAlignments.CENTER
};

export default ChartTooltip;
