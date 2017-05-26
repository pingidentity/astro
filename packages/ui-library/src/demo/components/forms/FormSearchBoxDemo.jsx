var React = require("react"),
    FilterUtils = require("../../../util/FilterUtils.js"),
    FormSearchBox = require("../../../components/forms/FormSearchBox.jsx");


/**
* @name FormSearchBoxDemo
* @memberof FormSearchBox
* @desc A demo for FormSearchBox
*/
var FormSearchBoxDemo = React.createClass({

    _items: [
        { id: 1, name: "apples" },
        { id: 2, name: "oranges" },
        { id: 3, name: "bananas" },
        { id: 4, name: "grape" }
    ],

    getInitialState: function () {
        return {
            items: this._items,
            queryString: "",
            actionMessages: ["Type into field to search items for a match"]
        };
    },

    _handleValueChange: function (value) {
        this.setState({
            items: this._items.filter(FilterUtils.getFilterFunction(value)),
            queryString: value
        });
    },

    _handleKeyDown: function (e) {
        this.setState({ actionMessages: this.state.actionMessages.concat("Key pressed in search field: " + e.key) });
    },

    _handleFocus: function () {
        this.setState({ actionMessages: this.state.actionMessages.concat("Focused on search field") });
    },

    _handleBlur: function () {
        this.setState({ actionMessages: this.state.actionMessages.concat("Blurred search field") });
    },

    _handleClear: function () {
        this.setState({ actionMessages: ["Cleared search field"] });
    },

    _renderItems: function () {
        return (
            <ul style={{ listStyleType: "circle", marginLeft: 20 }}>
                {
                    this.state.items.map(function (i) {
                        return <li key={i.id}>{i.name}</li>;
                    })
                }
            </ul>
        );
    },

    _renderMessages: function () {
        return (
            <ul style={{ listStyleType: "circle", marginLeft: 20 }}>
                {
                    this.state.actionMessages.map(function (message, i) {
                        return <li key={i}>{message}</li>;
                    })
                }
            </ul>
        );
    },

    render: function () {

        return (
            <div>
                <div>Items: {this._renderItems()}</div>
                <br />
                <div className="input-row">
                    <FormSearchBox
                        queryString={this.state.queryString}
                        onValueChange={this._handleValueChange}
                        onKeyDown={this._handleKeyDown}
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                        onClear={this._handleClear}
                        className="input-width-medium"
                    />
                </div>
                {this._renderMessages()}
            </div>
        );
    }
});

module.exports = FormSearchBoxDemo;
