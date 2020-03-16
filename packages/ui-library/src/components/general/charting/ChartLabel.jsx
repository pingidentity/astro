import React from "react";
import PropTypes from "prop-types";
import { Label } from "recharts";

class ChartLabel extends React.Component {
    labelRef = React.createRef();

    state = {
        labelWidth: 0,
    };

    _getLabelWidth = () => this.labelRef && this.labelRef.getBBox ? this.labelRef.getBBox().width : 0;

    _setLabelRef = ref => { this.labelRef = ref; }

    render() {
        const {
            chartWidth,
            color,
            label,
            offset,
            x,
            y,
        } = this.props;

        const {
            left = offset,
            right = offset
        } = offset;

        const labelWidth = this._getLabelWidth();

        // Calculate whether label would go outside the bounds of the chart
        const overflowsLeft = (labelWidth / 2) > (x + left);
        const overflowsRight = ((labelWidth / 2) + x) > (chartWidth - right);

        const adjustedX = (() => {
            if (overflowsLeft) {
                return left + (labelWidth / 2);
            } else if (overflowsRight) {
                return chartWidth - ((labelWidth / 2) + right);
            } else {
                return x;
            }
        })();

        return (
            <g ref={this.labelRef}>
                <Label
                    fill={color}
                    fontSize={14}
                    position="top"
                    value={label}
                    viewBox={{
                        height: 125,
                        width: 0,
                        x: adjustedX,
                        y
                    }}
                />
            </g>
        );
    }
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


export default ChartLabel;