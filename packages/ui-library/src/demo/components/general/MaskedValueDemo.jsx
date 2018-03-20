var React = require("react");
var MaskedValue = require("ui-library/lib/components/general/MaskedValue");

/**
 * @name MaskedValueDemo
 * @memberof MaskedValue
 * @desc A demo for Icon component
 */
class MaskedValueDemo extends React.Component {
    state = {
        hide: true
    };

    _handleToggleReveal = () => this.setState({ hide: !this.state.hide });

    render = () => {
        return (
            <div>
                <MaskedValue onToggleReveal={this._handleToggleReveal} maskValue={this.state.hide}>
                    Some Value
                </MaskedValue>
                <hr className="hr" />
                <p>If no handler or value prop is provided, the component will manage its own state:</p>
                <MaskedValue>Another Value</MaskedValue>
                <hr className="hr" />
                <p>Starting unmasked</p>
                <MaskedValue initialState={{ maskValue: false }}>I'm showing</MaskedValue>
            </div>
        );
    };
}

module.exports = MaskedValueDemo;
