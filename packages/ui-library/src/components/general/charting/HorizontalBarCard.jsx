import React, { Component } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { DashboardCard } from "./Cards/index";
import FormDropDownList from "../../forms/FormDropDownList";
import classnames from "classnames";
import Color from "color";

import Colors from "../charting/Cards/dashboardColors";

/**
 * @typedef {Object} HorizontalBarCard~data
 * @param {string} [id]
 *     Identifier for this data label
 * @param {string|number} [value]
 *     value of the data
 * @param {string} [color]
 *     color of the data
 *
 *
 * @class HorizontalBarCard
 * @desc A card that displays a donut chart on a dashboard card.
 *
 * @param {string} [className]
 *    Custom class name(s) applied to the top-level container
 * @param {array} [data-id="donut-card"]
 *  The data-id attribute applied to the top-level container
 * @param {string} [label]
 *     label for the card
 * @param {string} [title]
 *     Title of the card. Displayed at top of front and back
 * @param {number} [value]
 *     The valuee shown on the front and back of the card
 * @param {string} [errorMessage]
 *    When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [loading=false]
 *    When true the splinner animation shows in place of the stats
 * @param {function} [onMouseOver]
 *     Callback triggered when a chart data-point is hovered over
 * @param {function} [onMouseOut]
 *     Callback triggered when the mouse is hovered out of the chart
 * @param {object} [options]
 *     provides the list of objects for the drop down
 * @param {object} [selectedOption]
 *     highlightes selected option
 * @param {object} [onSelect]
 *     selects from the list of options
 * @param {object} [Array.HorizontalBarCard~data]
 *     A list of objects that provides the data for the chart
 * */



const magenta = Object.values(Colors.COLORS)[2];

const defaultColor = Color(magenta).lighten(0.5).hex();

export default class HorizontalBarCard extends Component {

    state = {
        hoverSection: null,
        statColor: null,
        strokeColor: null,
        strokeWidth: null,
    }

    _mouseOver = /* istanbul ignore next  */ (value, index, e) => {

        if (this.props.onMouseOver) {
            this.props.onMouseOver(e, value);
        }


        this.setState({
            hoveredSection: value.id,
            statColor: magenta,
            strokeColor: magenta,
            strokeWidth: 1,
        });
    };

    _mouseOut = /* istanbul ignore next  */ (value, index, e) => {
        if (this.props.onMouseOut) {
            this.props.onMouseOut(e, value);
        }

        this.setState({
            hoveredSection: null,
            statColor: null,
            strokeWidth: null,
        });
    };

    _renderCells = (data) => {
        return data.map(({ id, color = defaultColor }) => {
            return this.state.hoveredSection === id ? (
                <Cell
                    className="horizontalBar-card__hovered" key={id}
                    fill={this.state.statColor}
                    style={{
                        stroke: this.state.strokeColor,
                        strokeWidth: this.state.strokeWidth,
                    }}
                />) : (<Cell key={id} fill={color} />);
        });
    }

    _renderCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render () {

        const classes = classnames(
            "horizontalBar-card",
            this.props.className,
        );

        return (
            <DashboardCard {...this.props} data-id={this.props["data-id"]} className={classes}
                size = {2}
                front= {(
                    <div className="horizontalBar-card__top-level-container">
                        <div className="horizontalBar-card__title">
                            {this.props.title}
                        </div>
                        {!this.props.loading && ([
                            <div key="chart" className="horizontalBar-card__scroll">
                                <BarChart
                                    data-id={`${this.props["data-id"]}-chart`}
                                    className="horizontalBar-card__horizontal-card"
                                    width={400}
                                    height={this.props.data.length * 50}
                                    data={this.props.data}
                                    layout="vertical"
                                >
                                    <XAxis type="number" tickLine={false} hide/>
                                    <YAxis
                                        type="category"
                                        tickLine={false}
                                        dataKey="id"
                                        interval={0}
                                    />
                                    <Bar
                                        data-id={`${this.props["data-id"]}-value`}
                                        className="horizontalBar-card__bar"
                                        dataKey="value"
                                        onMouseOver={this._mouseOver}
                                        onMouseOut={this._mouseOut}
                                        label={{ position: "right" }}
                                    >
                                        {this._renderCells(this.props.data)}
                                    </Bar>
                                </BarChart>
                            </div>,
                            <div key="stats" className="horizontalBar-card__number-container">
                                <div key="barTotalKey" className="horizontalBar-card__number-info">
                                    <div
                                        data-id={`${this.props["data-id"]}-number`}
                                        className="horizontalBar-card__total-number"
                                        style={{ color: this.state.statColor }}
                                    >
                                        {this._renderCommas(this.props.value)}
                                    </div>
                                    <div
                                        data-id={`${this.props["data-id"]}-label`}
                                        className="horizontalBar-card__label"
                                        style={{ color: this.state.statColor }}
                                    >
                                        {this.props.label}
                                    </div>
                                </div>
                                <div
                                    key="backLineKey"
                                    className="horizontalBar-card__back-line"
                                />
                                <FormDropDownList
                                    data-id={`${this.props["data-id"]}-drop-down`}
                                    key="dropdown"
                                    className="horizontalBar-card__drop-down"
                                    options={this.props.options}
                                    selectedOption={this.props.selectOption}
                                    onValueChange={this.props.onSelect}
                                />
                            </div>
                        ])}
                    </div>
                )}
            />
        );
    }


    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.number,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.object),
        selectOption: PropTypes.object,
        onSelect: PropTypes.func,
        errorMessage: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
            color: PropTypes.string,
        })).isRequired,
    };

    static defaultProps = {
        "data-id": "horizontalBar-card",
    };
}