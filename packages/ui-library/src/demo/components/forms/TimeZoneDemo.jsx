
var React = require("react"),
    FormTimeZone = require("../../../components/forms/FormTimeZone.jsx");

/**
* @name FormTimeZoneDemo
* @memberof FormTimeZone
* @desc A demo for FormTimeZone
*/
var FormTimeZoneDemo = React.createClass({

    _handleSearch: function (value, index) {
        this.setState({
            searchString: value,
            selectedIndex: index
        });
    },

    _handleChange: function (type, value) {
        var newState = {};

        if (type === "country") {
            newState.filterByCountry = value;
            newState.searchString = "";

        } else if (type === "zone") {
            newState.value = value;
            newState.filterByCountry = undefined;
            newState.open = false;
        }

        this.setState(newState);
    },

    _handleToggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    getInitialState: function () {
        return {
            open: false,
            searchString: "",
            value: {
                name: "America/Denver",
                abbr: "MDT"
            },
        };
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <FormTimeZone
                        data-id="timezone-stateless"
                        stateless={true}
                        filterByCountry={this.state.filterByCountry}
                        labelText="Stateless Version (where abbreviation is displayed instead)"
                        onValueChange={this._handleChange}
                        onSearch={this._handleSearch}
                        onToggle={this._handleToggle}
                        open={this.state.open}
                        searchString={this.state.searchString}
                        selectedIndex={this.state.selectedIndex}
                        value={this.state.value.name}
                        displayValue={this.state.value.abbr}
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
