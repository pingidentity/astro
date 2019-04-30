import React from "react";
import PropTypes from "prop-types";
import MultiseriesChart, { chartTypes, propTypes as chartPropTypes } from "./MultiseriesChart";
import { DashboardCard } from "./Cards";
import DashboardCardTitle from "./Cards/DashboardCardTitle";


/**
*@callback MultiseriesChartCard~onDeselectOption
*     Callback for when an option is deselected.
* @param {string} [id]
*     The id of the deselected object
* @param {Object} [event]
*     The JS event fired by the deselect.
*/

/**
* @callback MultiseriesChartCard~onSelectOption
*     Callback for when an option is selected.
* @param {string} [id]
*     The id of the selected object
* @param {Object} [event]
*     The JS event fired by the deselect.
*/

/**
* @callback MultiseriesChartCard~onMenuToggle
*     Callback for option dropdown is toggled open or closed.
* @param {string} [id]
*     The id of the selected object
* @param {Object} [event]
*     The JS event fired by the deselect.
*/

/**
* @class MultiseriesChartCard
* @desc A card with a line/area chart.
*
* @param {string} [data-id="multiseries-chart"]
*     The data-id assigned to the top-most container of the component.
* @param {Object} [bottomPanel]
*     A piece of JSX to be included below the chart. Parameter can accept anything that
*     can be rendered by React, including JSX, strings and arrays.
* @param {Object[]} [data]
*     The data to be displayed. Data must be in the format of:
*     [{ id: val, id2: val }, { id: val2, id2: val2 }]
*     The toRechartsDataFormat helper function transforms data in the form of [{ id: id, label: label, data: data}]
*     to the Recharts format.
* @param {string} [errorMessage]
*     An error message to displayed. Chart will not appear if error message is provided.
* @param {number} [height=400]
*     The height of the chart in pixels.
* @param {boolean} [loading]
*     The loading state of the card. If set to true, chart will not display; a loading spinner will display instead.
*
* @param {string[]} [selectedDataSets]
*     An array of ids that decides which dataset to display. If not passed in, the component
*     will manage selected IDs internally.
* @param {number} [selectedLimit=3]
*     The maximum number of datasets that can be selected at one time.
* @param {string} [title]
*     The title of the chart.
* @param {boolean|function} [tooltip]
*     Controls display of tooltip in chart. If false, no tooltip is displayed; if true, default tooltip
*     is displayed. If a render function is passed in, will render custom tooltip.
* @param {string} [type]
*     The type of chart to display. Must be one of available values of the chartTypes object exported
*     by this component.
* @param {number} [width=400]
*     The width of the chart in pixels.
* @param {string} [xAxisKey]
*     The id of the dataset to use as the x-axis for the chart. This ID will not appear in the list of
*     of dropdown options.
* @param {string} [yAxisLabel]
*     The label for the y-axis.
* @example
*  <MultiseriesChartCard
*    data={formattedData}
*    menuNote={<p>Limit of 3 applications.</p>}
*    menuRequiredText={renderRequiredText}
*    onDeselectOption={this._handleDeselectOption}
*    onMenuToggle={this._handleToggle}
*    onSelectOption={this._handleSelectOption}
*    options={options}
*    type={this.state.typeIndex === 0 ? chartTypes.LINE : chartTypes.AREA}
*    title="Application Traffic"
*    xAxisKey="time"
*    yAxisLabel="# of Requests" />
*/

const MultiseriesChartCard = ({
    errorMessage,
    loading,
    title,
    ...props
}) => (
    <DashboardCard
        errorMessage={errorMessage}
        front={(
            <div>
                {title ? <DashboardCardTitle
                    title={title}
                    className="dashboard-card__title--multiseries"
                /> : null}
                <MultiseriesChart {...props}
                />
            </div>
        )}
        loading={loading}
    />
);

MultiseriesChartCard.propTypes = {
    ...chartPropTypes,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
};

MultiseriesChartCard.chartTypes = chartTypes;

export default MultiseriesChartCard;
