var React = require("react");
var If = require("./../../../components/general/If");
import Button from "../../../components/buttons/Button";

/**
* @name IfDemo
* @memberof If
* @desc A demo for If
*/
class IfDemo extends React.Component {
    state = {
        toggle: false
    };

    _toggle = () => {
        this.setState({ toggle: !this.state.toggle });
    };

    render() {
        return (
            <div>
                <p>
                    Toggle set to: { (this.state.toggle) ? "true" : "false" }
                </p>
                <p>
                    <Button onClick={this._toggle}>Toggle if condition</Button>
                </p>
                <If test={this.state.toggle}>
                    <div>
                        This is only displayed when the toggle condition is true
                    </div>
                </If>
            </div>
        );
    }
}

module.exports = IfDemo;
