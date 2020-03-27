import React from "react";
import PropTypes from "prop-types";
import { Label } from "recharts";
import { usePreventOverflow } from "../../../util/ChartingUtils";

export default function ChartLabel({
    chartWidth,
    color,
    label,
    offset,
    x,
    y,
}) {
    const [labelRef, adjustment] = usePreventOverflow(chartWidth, x, offset);

    return (
        <g ref={labelRef}>
            <Label
                fill={color}
                fontSize={14}
                position="top"
                value={label}
                viewBox={{
                    height: 125,
                    width: 0,
                    x: x + adjustment,
                    y
                }}
            />
        </g>
    );
}

ChartLabel.propTypes = {
    chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    offset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            left: PropTypes.number,
            right: PropTypes.number
        })
    ]),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

ChartLabel.defaultProps = {
    offset: 0,
};