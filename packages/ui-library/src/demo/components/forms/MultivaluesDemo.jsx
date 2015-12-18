var React = require("react");
var Multivalues = require("../../../components/forms/Multivalues.jsx");

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

    _updateEntries: function (entries) {
        this.setState({
            entries: entries
        });
    },

    render: function () {
        return (
            <div>
                <p>Type ahead. Press return or "," to add an item, or delete an item by clicking "x".</p>

                <div className="input-row">
                    <Multivalues title="Multivalues Demo"
                        entries={this.state.entries}
                        onChange={this._updateEntries} />
                </div>
                
                <div className="input-row">
                    <Multivalues title="Multivalues Demo"
                        entries={this.state.entries}
                        isRequired={true}
                        onChange={this._updateEntries} />
                </div>
                
            </div>
        );
    }
});

module.exports = MultivaluesDemo;
