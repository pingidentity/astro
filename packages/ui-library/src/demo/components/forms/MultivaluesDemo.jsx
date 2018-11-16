var React = require("react");
var Multivalues = require("../../../components/forms/Multivalues");

/**
* @name MultivaluesDemo
* @memberof Multivalues
* @desc A demo for Multivalues
*/
class MultivaluesDemo extends React.Component {
    state = {
        entries: [
            "First Entry",
            "Second Entry",
            "Another Entry",
            "Last Entry"
        ],
        urlEntries: [
            "http://www.someurl.com/foo/bar/",
            "http://www.someurl.com/foo/bar/longlonglongurl",
        ],
        iconEntries: [
            "First",
            {
                label: "Second",
                icon: "desktop"
            },
            {
                label: "Third",
                icon: "browser"
            },
            {
                label: "Four",
                icon: "clipboard"
            }
        ]
    };

    _handleValueChange = (entries) => {
        this.setState({
            entries: entries
        });
    };

    _handleUrlChange = (entries) => {
        this.setState({
            urlEntries: entries
        });
    };

    _onNewValue = (keyCode) => {
        if (keyCode === 13) {
            return true;
        }
        return false;
    };

    render() {
        return (
            <div>
                <p>
                    Type ahead. Press "return" or "," or "tab" or "space" to add an item, or delete an item by
                    clicking "x".
                </p>

                <div className="input-row">
                    <Multivalues
                        labelText="Default multi-values input"
                        stateless={false}
                        entries={this.state.entries}
                        onValueChange={this._handleValueChange}
                        autoFocus={true}
                    />
                </div>

                <div className="input-row">
                    <Multivalues
                        labelText="Default multi-values input with icons"
                        stateless={false}
                        entries={this.state.iconEntries}
                        onValueChange={this._handleValueChange}

                    />
                </div>

                <div className="input-row">
                    <Multivalues
                        labelText="Alternate stacked formatting"
                        stateless={false}
                        entries={this.state.urlEntries}
                        onNewValue={this._onNewValue}
                        onValueChange={this._handleUrlChange}
                        stacked={true}
                        name="mv-demo"
                        required={true}
                    />
                </div>

            </div>
        );
    }
}

module.exports = MultivaluesDemo;
