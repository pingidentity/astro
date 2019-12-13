import React, { Component } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell } from "recharts";
import DashboardCard from "./Cards/DashboardCard";
import DashboardCardTitle from "./Cards/DashboardCardTitle";
import FormDropDownList from "../../forms/FormDropDownList";
import classnames from "classnames";
import Colors from "../charting/Cards/dashboardColors";
import FlexRow, { justifyOptions } from "../../layout/FlexRow";
/**
 * @typedef {Object} DonutCard~data
 * @param {string} [id]
 *     Identifier for this data label
 * @param {string|number} [value]
 *     value of the data
 * @param {string} [color]
 *     color of the data
 *
 *
 * @class DonutCard
 * @desc A card that displays a donut chart on a dashboard card.
 *
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container.
 * @param {array} [data-id="donut-card"]
 *     The data-id attribute applied to the top-level container.
 * @param {string} [label]
 *     label for the card.
 * @param {string} [title]
 *     Title of the card. Displayed at top of front and back.
 * @param {number} [value]
 *     The valuee shown on the front and back of the card.
 * @param {string} [errorMessage]
 *    When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [loading=false]
 *    When true the splinner animation shows in place of the stats.
 * @param {function} [onMouseOver]
 *     Callback triggered when a chart data-point is hovered over.
 * @param {function} [onMouseOut]
 *     Callback triggered when the mouse is hovered out of the chart.
 * @param {object} [options]
 *     Provides the list of objects for the drop down.
 * @param {object} [selectedOption]
 *     Highlightes selected option.
 * @param {object} [onSelect]
 *     Selects from the list of options.
 * @param {function} [onMakeDefault]
 *     Callback triggered when the make-default checkbox is changed.  When provided a checkbox will render on the back
 *     of the card.
 * @param {object} [Array.DonutCard~data]
 *     A list of objects that provides the data for the chart.
 *  @param {bool} [defaultChecked]
 *     state of the checkbox set to false. If set to true will render with onMakeDefault already checked.
 * */

class DonutCard extends Component {
    _getColors = (a) => {
        let colors = [];
        let defaultIndex = 0;

        a.map(({ color }) => {
            if (color) {
                colors.push(color);
            } else {
                colors.push(Object.values(Colors.COLORS)[defaultIndex]);

                /* istanbul ignore next */
                if (defaultIndex === Object.values(Colors.COLORS).length - 1) {
                    defaultIndex = 0;
                } else {
                    defaultIndex = defaultIndex + 1;
                }
            }
        });

        return colors;
    }

    state = {
        statColor: null,
        strokeColor: null,
        strokeWidth: 1,
        hoveredSection: null,
    }

    _mouseOver = (value, index, e) => {

        if (this.props.onMouseOver) {
            this.props.onMouseOver(e, value);
        }

        const color = this._getColors(this.props.data)[index];

        this.setState({
            hoveredSection: value.id,
            statColor: color,
            strokeColor: color,
            strokeWidth: 2,
        });
    };

    /*
    istanbul ignore next
    */
    _mouseOut = (value, index, e) => {
        if (this.props.onMouseOut) {
            this.props.onMouseOut(e, value);
        }

        this.setState({
            hoveredSection: null,
            statColor: null,
            strokeWidth: 1,
        });
    };

    _renderCells = (data, colors) => {
        return data.map(({ id }, key) => {
            return this.state.hoveredSection === id ? (
                <Cell
                    className="donut-card__hovered" key={id}
                    fill={colors[key]}
                    style={{
                        stroke: this.state.strokeColor,
                        strokeWidth: this.state.strokeWidth,
                    }}
                />) : (<Cell key={id} fill={colors[key]} />);
        });
    };

    _renderNumber = (value) => {
        if (value >= 1000000) {
            return `${Number.parseFloat((value / 1000000).toFixed(2))}m`;
        } else if (value >= 100000 ) {
            return `${Number.parseFloat((value / 1000).toFixed(0))}k`;
        } else if (value >= 10000) {
            return `${Number.parseFloat((value / 1000).toFixed(1))}k`;
        } else if (value >= 1000) {
            return `${Number.parseFloat((value / 1000).toFixed(2))}k`;
        } else {
            return value;
        }
    };

    _renderCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    _renderBack = (data) => {
        return (
            <div
                className="dashboard-card__stat-list donut-card__scroll"
                data-id={`${this.props["data-id"]}-list`}
                key="dashKey"
            >
                {data.map(({ id, label, value }, key) => (
                    <div key={id} className="donut-card__back-info">
                        <div className="dashboard-card__stat-row-label">{label || id}</div>
                        <div
                            className="dashboard-card__stat-row-number"
                            style={{ color: this._getColors(data)[key] }}>
                            {this._renderCommas(value)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    render () {

        const classes = classnames(
            "donut-card",
            this.props.className,
        );

        return (
            <DashboardCard {...this.props} data-id={this.props["data-id"]} className={classes}
                front={(
                    <div>
                        <DashboardCardTitle
                            className="dashboard-card__title--donut"
                            title={this.props.title}
                        />
                        {!this.props.loading && (
                            <FlexRow justify={justifyOptions.CENTER}>
                                <FlexRow justify={justifyOptions.CENTER}>
                                    <PieChart
                                        key="chartKey"
                                        height={202}
                                        width={202}
                                        data-id={`${this.props["data-id"]}-chart`}
                                        className="donut-card__donut-chart"
                                    >
                                        <Pie
                                            innerRadius={72}
                                            outerRadius={100}
                                            paddingAngle={1}
                                            startAngle={90}
                                            endAngle={450}
                                            key="pieKey"
                                            data={this.props.data}
                                            dataKey="value"
                                            nameKey="id"
                                            onMouseOver={this._mouseOver}
                                            onMouseOut={this._mouseOut}
                                        >
                                            {this._renderCells(this.props.data, this._getColors(this.props.data))}
                                        </Pie>
                                    </PieChart>
                                </FlexRow>
                                <div key="centerLabelKey" className="donut-card__center-info">
                                    <div className="donut-card__center-label" style={{ color: this.state.statColor }}>
                                        {this.props.label}
                                    </div>
                                    <div className="donut-card__center-number" style={{ color: this.state.statColor }}>
                                        {this._renderNumber(this.props.value)}
                                    </div>
                                </div>
                            </FlexRow>
                        )}
                    </div>
                )}
                back={(
                    <div>
                        <DashboardCardTitle
                            backTitle
                            title={this.props.title}

                        />
                        {!this.props.loading && ([
                            <div key="backLineKey" className="donut-card__back-line" />,
                            <FormDropDownList
                                data-id={`${this.props["data-id"]}-drop-down`}
                                key="dropdown"
                                className="donut-card__drop-down"
                                options={this.props.options}
                                selectedOption={this.props.selectOption}
                                onValueChange={this.props.onSelect}
                            />,
                            this._renderBack(this.props.data)
                        ])}
                    </div>
                )}
            />
        );
    }




    static propTypes = {
        "data-id": PropTypes.string,
        label: PropTypes.string,
        title: PropTypes.node,
        className: PropTypes.string,
        value: PropTypes.number,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        options: PropTypes.arrayOf(PropTypes.object),
        selectOption: PropTypes.object,
        onSelect: PropTypes.func,
        onMakeDefault: PropTypes.func,
        errorMessage: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
            color: PropTypes.string,
        })).isRequired,
    };

    static defaultProps = {
        "data-id": "donut-card",
    };
}

export default DonutCard;