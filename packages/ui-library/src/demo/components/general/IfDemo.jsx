var React = require("react");
var If = require("./../../../components/general/If.jsx");

/**
* @name IfDemo
* @memberof If
* @desc A demo for If
*/
var IfDemo = React.createClass({

    getInitialState: function () {
        return {
            toggle: false
        };
    },

    _toggle: function () {
        this.setState({ toggle: !this.state.toggle });
    },

    render: function () {
        return (
            <div>
                <p>
                    Toggle set to: { (this.state.toggle) ? "true" : "false" }
                </p>
                <p>
                    <button onClick={this._toggle}>Toggle if condition</button>
                </p>
                <If test={this.state.toggle}>
                    <div>
                        This is only displayed when the toggle condition is true
                    </div>
                </If>
            </div>
        );
    }
});

module.exports = IfDemo;
