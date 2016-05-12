var React = require("react"),
    EditViewSimple = require("../../../templates/edit-view-simple");

var EditViewSimpleDemo = React.createClass({

    _handleInputChange: function (name, value) {
        this.props.demoActions.setInput(name, value);
    },

    _handleFormSave: function () {
        this.props.demoActions.saveForm();
    },

    render: function () {
        return (<EditViewSimple {...this.props.demoProps}
            onInputChange={this._handleInputChange}
            onSave={this._handleFormSave} />);
    }
});

/*
 * Expose the Reducer and the Actions for the Demo app to inject
 */
EditViewSimpleDemo.Reducer = EditViewSimple.Reducer;
EditViewSimpleDemo.Actions = EditViewSimple.Actions;

module.exports = EditViewSimpleDemo;
