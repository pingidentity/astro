var React = require('react/addons');
var DetailsTooltip = require('../../../components/tooltips/DetailsTooltip.jsx');

var DetailsTooltipDemo = React.createClass({

    _cancel: function () {
        this.setState({
            open: false,
            confirmed: 'Cancelled'
        });
    },

    _confirm: function () {
        this.setState({
            open: false,
            confirmed: 'Ok'
        });
    },

    _toggleConfirmation: function () {
        this.setState({
            open: !this.state.open,
            confirmed: ''
        });
    },

    getInitialState: function () {
        return {
            open: false,
            confirmed: ''
        };
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div className="controls">
                <DetailsTooltip positionStyle="delete-tooltip confirm bottom left" labelStyle="remove-rule icon-delete"
                        label="Label"
                        title="Title" open={this.state.open}
                        onToggle={this._toggleConfirmation}>
                    <p>Are you sure you want to delete this rule?</p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input type="button" data-id="cancel-action" value="Cancel"
                            className="secondary" onClick={this._cancel}/>
                        <input type="button" data-id="confirm-action" value="Confirm"
                            className="primary" onClick={this._confirm}/>
                    </div>
                </DetailsTooltip>
                <br/>
                <p>{this.state.confirmed}</p>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = DetailsTooltipDemo;
