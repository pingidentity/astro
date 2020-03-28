
import React from "react";
import FormTimeZone from "../../../components/forms/FormTimeZone";
import InputRow from "../../../components/layout/InputRow";

/**
* @name FormTimeZoneDemo
* @memberof FormTimeZone
* @desc A demo for FormTimeZone
*/
class FormTimeZoneDemo extends React.Component {
    constructor(props) {
        super(props);
        let state = {};

        for (var i = 0; i < this._numDemos; i += 1) {
            state["open" + i] = false;
            state["searchString" + i] = "";
            state["filterByCountry" + i] = "";
            state["selectedIndex" + i] = -1;
        }

        state.value0 = {
            name: "America/Fort Nelson",
            abbr: "MST"
        };
        state.value1 = {
            name: "America/Denver",
            abbr: "MDT"
        };
        this.state = state;
    }

    _numDemos = 2;
    _selectText = "Select a timezone";

    _handleSearch = demoIndex => (value, index) => {
        this.setState({
            ["searchString" + demoIndex]: value,
            ["selectedIndex" + demoIndex]: index,
        });
    };

    _handleChange = demoIndex => (type, value) => {
        let newState = {};

        if (type === "country") {
            newState[`filterByCountry${demoIndex}`] = value;

        } else if (type === "zone") {
            newState[`displayValue${demoIndex}`] = demoIndex === 1
                ? value.abbr
                : FormTimeZone.getZoneNameDisplayValue(value.name);
            newState[`filterByCountry${demoIndex}`] = undefined;
            newState[`open${demoIndex}`] = false;
            newState[`searchString${demoIndex}`] = "";
            newState[`value${demoIndex}`] = value;
        }

        this.setState(newState);
    };

    _handleToggle = demoIndex => () =>{
        this.setState({ [`open${demoIndex}`]: !this.state[`open${demoIndex}`] });
    };

    _handleClear = demoIndex => () => {
        this.setState({
            [`open${demoIndex}`]: false,
            [`displayValue${demoIndex}`]: this._selectText,
            [`filterByCountry${demoIndex}`]: "",
            [`searchString${demoIndex}`]: "",
        });
    }

    render() {

        return (
            <div>
                <InputRow>
                    <FormTimeZone
                        data-id="timezone-stateless-w-clear"
                        filterByCountry={this.state.filterByCountry0}
                        labelText="Stateless Version with clear"
                        onValueChange={this._handleChange(0)}
                        onSearch={this._handleSearch(0)}
                        onToggle={this._handleToggle(0)}
                        onClear={this.state.displayValue0 !== this._selectText && this._handleClear(0)}
                        open={this.state.open0}
                        searchString={this.state.searchString0}
                        selectedIndex={this.state.selectedIndex0}
                        value={this.state.value0.name}
                        displayValue={this.state.displayValue0}
                        ref="tzStateless"
                        description="Sample Description"
                    />
                </InputRow>
                <InputRow>
                    <FormTimeZone
                        data-id="timezone-stateless"
                        filterByCountry={this.state.filterByCountry1}
                        labelText="Stateless Version (where abbreviation is displayed instead)"
                        onValueChange={this._handleChange(1)}
                        onSearch={this._handleSearch(1)}
                        onToggle={this._handleToggle(1)}
                        open={this.state.open1}
                        searchString={this.state.searchString1}
                        selectedIndex={this.state.selectedIndex1}
                        value={this.state.value1.name}
                        displayValue={this.state.value1.abbr}
                        ref="tzStateless"
                    />
                </InputRow>
                <InputRow>
                    <FormTimeZone
                        data-id="timezone-stateful-initial-open"
                        labelText="Stateful Version"
                        labelHelpText="Help hints are optional for both versions"
                        helpClassName="bottom right"
                        initialState={{ open: true }}
                        filterByCountry="US"
                    />
                </InputRow>
                <InputRow>
                    <FormTimeZone
                        data-id="timezone-stateful2"
                        labelText="Stateful Version with clear"
                        labelHelpText="Help hints are optional for both versions"
                        helpClassName="bottom right"
                        showClear={true}
                    />
                </InputRow>
                <InputRow>
                    <FormTimeZone
                        labelText="Stateful Version with Error Message"
                        helpClassName="bottom right"
                        errorMessage="Example error message"
                    />
                </InputRow>
                <InputRow>
                    <FormTimeZone
                        data-id="timezone-stateful2"
                        labelText="Stateful Version with 'new-mouse' flag"
                        labelHelpText="Help hints are optional for both versions"
                        helpClassName="bottom right"
                        flags={["mouse-hover-select"]}
                        showClear={true}
                    />
                </InputRow>
                <p>
                    * Note that the browser's timezone is guessed if the passed value is undefined.
                </p>
            </div>
        );
    }
}

module.exports = FormTimeZoneDemo;
