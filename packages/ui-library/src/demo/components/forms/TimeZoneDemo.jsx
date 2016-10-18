
var React = require("react"),
    FormLabel = require("../../../components/forms/FormLabel.jsx"),
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
            value: undefined,
        };
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <FormLabel value="Stateful Version" className="detached" />
                    <FormTimeZone
                        data-id="timezone-stateful"
                        controlled={false}
                        countryLabel="Select a Country"
                    />
                </div>
                <div className="input-row">
                    <FormLabel value="Stateless Version" className="detached" />
                    <FormTimeZone
                        data-id="timezone-stateless"
                        controlled={true}
                        filterByCountry={this.state.filterByCountry}
                        onValueChange={this._handleChange}
                        onSearch={this._handleSearch}
                        onToggle={this._handleToggle}
                        open={this.state.open}
                        searchString={this.state.searchString}
                        selectedIndex={this.state.selectedIndex}
                        countryLabel="Select a Country"
                        value={this.state.value}
                    />
                    <p>
                        Note that the browser's timezone is guessed if the passed value is undefined.
                    </p>
                </div>
            </div>
        );
    }
});

module.exports = FormTimeZoneDemo;
