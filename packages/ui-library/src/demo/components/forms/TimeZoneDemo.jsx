
var React = require("react"),
    FormTimeZone = require("../../../components/forms/FormTimeZone");

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

    _handleSearch = (demoIndex, value, index) => {
        this.setState({
            ["searchString" + demoIndex]: value,
            ["selectedIndex" + demoIndex]: index,
        });
    };

    _handleChange = (demoIndex, type, value) => {
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

    _handleToggle = (demoIndex) => {
        this.setState({ [`open${demoIndex}`]: !this.state[`open${demoIndex}`] });
    };

    _handleClear = (demoIndex) => {
        this.setState({
            [`open${demoIndex}`]: false,
            [`displayValue${demoIndex}`]: this._selectText,
            [`filterByCountry${demoIndex}`]: "",
            [`searchString${demoIndex}`]: "",
        });
    }

    componentDidMount() {
        for (var i = 0; i < this._numDemos; i += 1) {
            this["_handleSearch" + i] = this._handleSearch.bind(null, i);
            this["_handleChange" + i] = this._handleChange.bind(null, i);
            this["_handleClear" + i] = this._handleClear.bind(null, i);
            this["_handleToggle" + i] = this._handleToggle.bind(null, i);
        }
    }

    render() {

        return (
            <div>
                <div className="input-row">
                    <FormTimeZone
                        data-id="timezone-stateless"
                        stateless={true}
                        filterByCountry={this.state.filterByCountry0}
                        labelText="Stateless Version with clear"
                        onValueChange={this._handleChange0}
                        onSearch={this._handleSearch0}
                        onToggle={this._handleToggle0}
                        onClear={this.state.displayValue0 !== this._selectText && this._handleClear0}
                        open={this.state.open0}
                        searchString={this.state.searchString0}
                        selectedIndex={this.state.selectedIndex0}
                        value={this.state.value0.name}
                        displayValue={this.state.displayValue0}
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
}

module.exports = FormTimeZoneDemo;
