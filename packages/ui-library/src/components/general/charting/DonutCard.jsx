import React, { Component } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell } from "recharts";
import DashboardCard from "./Cards/DashboardCard";
import FormDropDownList from "../../forms/FormDropDownList";
import classnames from "classnames";

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
 * @param {object} [Array.DonutCard~data]
 *     A list of objects that provides the data for the chart
 * */




class DonutCard extends Component {

    state = {
        statColor: null
    }


    _mouseOver = /* istanbul ignore next  */ (value, index, e) => {

        if (this.props.onMouseOver) {
            this.props.onMouseOver(e, value);
        }

        const dataItem = this.props.data[index];

        this.setState({
            statColor: dataItem.hasOwnProperty("color") ? dataItem.color : null
        });
    };

    _mouseOut = /* istanbul ignore next  */ (value, index, e) => {
        if (this.props.onMouseOut) {
            this.props.onMouseOut(e, value);
        }

        this.setState({
            statColor: null
        });
    };

    _renderCells = (data) => {
        return data.map((item) => {
            return <Cell key={item.id} fill={item.color} />;
        });
    };

    _renderNumber = (value) => {
        return value >= 1000 ? `${Number.parseFloat((value/1000).toFixed(1))}k` : value;
    };

    _renderCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    _renderBack = (data) => {
        return (
            <div className="dashboard-card__stat-list" data-id={`${this.props["data-id"]}-list`} key="dashKey">
                {data.map(({ id, label, value, color }) => (
                    <div key={id} className="donut-card__back-info">
                        <div className="dashboard-card__stat-row-label">{label || id}</div>
                        <div
                            className="dashboard-card__stat-row-number"
                            style={{ color: color }}>
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
                        <div className="donut-card__title">
                            {this.props.title}
                        </div>
                        {!this.props.loading && ([
                            <PieChart
                                key="chartKey"
                                height={225}
                                width={225}
                                data-id={`${this.props["data-id"]}-chart`}
                                className="donut-card__donut-chart"
                                >
                                <Pie
                                    innerRadius={70}
                                    outerRadius={113}
                                    key="pieKey"
                                    data={this.props.data}
                                    dataKey="value"
                                    nameKey="id"
                                    onMouseOver={this._mouseOver}
                                    onMouseOut={this._mouseOut}
                                >
                                    {this._renderCells(this.props.data)}
                                </Pie>
                            </PieChart>,
                            <div key="centerLabelKey" className="donut-card__center-info">
                                <div className="donut-card__center-number" style={{ color: this.state.statColor }}>
                                    {this._renderNumber(this.props.value)}
                                </div>
                                <hr className="donut-card__front-line" />
                                <div className="donut-card__center-label" style={{ color: this.state.statColor }}>
                                    {this.props.label}
                                </div>
                            </div>
                        ])}
                    </div>
                )}
                back={(
                    <div>
                        <div
                            data-id={`${this.props["data-id"]}-back-title`}
                            className="dashboard-card__back-title donut-card__back-title"
                            >
                            {this.props.title}
                        </div>
                        {!this.props.loading && ([
                            <hr key="backLineKey" className="donut-card__back-line" />,
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
        title: PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.number,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
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
        "data-id": "donut-card",
    };
}

export default DonutCard;