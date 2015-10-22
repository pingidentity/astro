var React = require('react/addons');
var If = require('./../../../components/general/If.jsx');

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
                <div>Toggle set to: { (this.state.toggle) ? 'true' : 'false' } </div>
                <button onClick={this._toggle}>Toggle if condition</button>
                <br />
                <If test={this.state.toggle}>
                    <div>
                        <p>This is only displayed when the toggle condition is true</p>
                    </div>
                </If>
            </div>
        );
    }
});

module.exports = IfDemo;