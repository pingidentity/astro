var React = require("react");
var Multivalues = require("../../../components/forms/Multivalues.jsx");

/**
* @name MultivaluesDemo
* @memberof Multivalues
* @desc A demo for Multivalues
*/
var MultivaluesDemo = React.createClass({

    getInitialState: function () {
        return {
            entries: [
                "First Entry",
                "Second Entry",
                "Another Entry",
                "Last Entry"
            ]
        };
    },

    _handleValueChange: function (entries) {
        this.setState({
            entries: entries
        });
    },

    _onNewValue: function (keyCode) {
        if (keyCode === 13) {
            return true;
        }
        return false;
    },

    render: function () {
        return (
            <div>
                <p>Type ahead. Press "return" or "," or "tab" or "space" to add an item,
                    or delete an item by clicking "x".</p>

                <div className="input-row">
                    <Multivalues title="Multivalues Demo"
                        entries={this.state.entries}
                        onValueChange={this._handleValueChange} />
                </div>

                <p>Type ahead. Press "return" to add an item, or delete an item by clicking "x".</p>
                <div className="input-row">
                    <Multivalues title="Multivalues Demo"
                        entries={this.state.entries}
                        required={true}
                        onNewValue={this._onNewValue}
                        onValueChange={this._handleValueChange} />
                </div>
                
            </div>
        );
    }
});

module.exports = MultivaluesDemo;
