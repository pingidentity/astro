var React = require("react"),
    EditViewSwitched = require("../../../templates/edit-view-switched");

var EditViewSwitchedDemo = React.createClass({

    _handleInputChange: function (name, value) {
        this.props.demoActions.setInput(name, value);
    },

    _handleFormSave: function () {
        this.props.demoActions.saveForm();
    },

    render: function () {
        return (<EditViewSwitched {...this.props.demoProps}
            onInputChange={this._handleInputChange}
            onRockerButtonChange={this.props.demoActions.setActiveRockerButton}
            onSave={this._handleFormSave} />);
    }
});

/*
 * Expose the Reducer and the Actions for the Demo app to inject
 */
EditViewSwitchedDemo.Reducer = EditViewSwitched.Reducer;
EditViewSwitchedDemo.Actions = EditViewSwitched.Actions;

module.exports = EditViewSwitchedDemo;
