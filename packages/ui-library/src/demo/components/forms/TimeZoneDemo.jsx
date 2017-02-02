
var React = require("react"),
    FormTimeZone = require("../../../components/forms/FormTimeZone.jsx");

/**
* @name FormTimeZoneDemo
* @memberof FormTimeZone
* @desc A demo for FormTimeZone
*/
var FormTimeZoneDemo = React.createClass({

    _numDemos: 2,

    _handleSearch: function (demoIndex, value, index) {
        var newState = {};
        newState["searchString" + demoIndex] = value;
        newState["selectedIndex" + demoIndex] = index;
        this.setState(newState);
    },

    _handleChange: function (demoIndex, type, value) {
        var newState = {};

        if (type === "country") {
            newState["filterByCountry" + demoIndex] = value;
            newState["searchString" + demoIndex] = "";

        } else if (type === "zone") {
            newState["value" + demoIndex] = value;
            newState["filterByCountry" + demoIndex] = undefined;
            newState["open" + demoIndex] = false;
        }

        this.setState(newState);
    },

    _handleToggle: function (demoIndex) {
        var newState = {};
        newState["open" + demoIndex] = !this.state["open" + demoIndex];
        this.setState(newState);
    },

    getInitialState: function () {
        var state = {};
        for (var i = 0; i < this._numDemos; i += 1) {
            state["open" + i] = false;
            state["searchString" + i] = "";
        }
        state.value0 = {
            name: "America/Fort_Nelson",
            abbr: "MST"
        };
        state.value1 = {
            name: "America/Denver",
            abbr: "MDT"
        };
        return state;
    },

    componentDidMount: function () {
        for (var i = 0; i < this._numDemos; i += 1) {
            this["_handleSearch" + i] = this._handleSearch.bind(null, i);
            this["_handleChange" + i] = this._handleChange.bind(null, i);
            this["_handleToggle" + i] = this._handleToggle.bind(null, i);
        }
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <FormTimeZone
                        data-id="timezone-stateless"
                        stateless={true}
                        filterByCountry={this.state.filterByCountry0}
                        labelText="Stateless Version"
                        onValueChange={this._handleChange0}
                        onSearch={this._handleSearch0}
                        onToggle={this._handleToggle0}
                        open={this.state.open0}
                        searchString={this.state.searchString0}
                        selectedIndex={this.state.selectedIndex0}
                        value={this.state.value0.name}
                        displayValue={FormTimeZone.getZoneNameDisplayValue(this.state.value0.name)}
                        ref="tzStateless"
                    />
                </div>
                <div className="input-row">
                    <FormTimeZone
                        data-id="timezone-stateless"
                        stateless={true}
                        filterByCountry={this.state.filterByCountry1}
                        labelText="Stateless Version (where abbreviation is displayed instead)"
                        onValueChange={this._handleChange1}
                        onSearch={this._handleSearch1}
                        onToggle={this._handleToggle1}
                        open={this.state.open1}
                        searchString={this.state.searchString1}
                        selectedIndex={this.state.selectedIndex1}
                        value={this.state.value1.name}
                        displayValue={this.state.value1.abbr}
                        ref="tzStateless"
                    />
                </div>
                <div className="input-row">
                    <FormTimeZone
                        data-id="timezone-stateful"
                        stateless={false}
                        labelText="Stateful Version"
                        labelHelpText="Help hints are optional for both versions"
                        helpClassName="bottom right"
                    />
                </div>
                <p>
                    * Note that the browser's timezone is guessed if the passed value is undefined.
                </p>
            </div>
        );
    }
});

module.exports = FormTimeZoneDemo;
