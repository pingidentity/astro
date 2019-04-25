import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import FormDropDownList from "../../forms/FormDropDownList";
import { flagsPropType } from "../../../util/FlagUtils";

class MarketSelector extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        onMarketChange: PropTypes.func,
        market: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.object),
        flags: flagsPropType,
    };

    static defaultProps = {
        "data-id": "market-selector",
        onMarketChange: _.noop,
        market: "",
        flags: [],
        options: []
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    // The FormDropDownList uses labels & values. We want to use labels & ids
    _getDDLOption = option => ({ label: option.label, value: option.id })

    _getSelectedOption = () => {
        const selectedList = this.props.options.filter(
            option => option.id === this.props.market
        );
        if (selectedList.length > 0) {
            return this._getDDLOption(selectedList[0]);
        } else {
            return {};
        }
    };

    _getOptions = () => this.props.options.map(this._getDDLOption);

    _handleMarketChange = marketObject => {
        this.props.onMarketChange(marketObject.value);
    }

    render = () => (
        <FormDropDownList
            className="market-selector"
            data-id={this.props["data-id"]}
            selectedOption={this._getSelectedOption()}
            onValueChange={this._handleMarketChange}
            options={this._getOptions()}
            flags={["use-portal", "p-stateful"]}
        />
    );
}

module.exports = MarketSelector;
