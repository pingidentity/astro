var React = require("react"),
    EditViewCollapsible = require("../../../templates/edit-view-collapsible");

var EditViewCollapsibleDemo = React.createClass({

    _handleInputChange: function (name, value) {
        this.props.demoActions.setInput(name, value);
    },

    _handleFormSave: function () {
        this.props.demoActions.saveForm();
    },

    render: function () {
        return (<EditViewCollapsible {...this.props.demoProps}
            onInputChange={this._handleInputChange}
            onSectionToggle={this.props.demoActions.toggleSection}
            onSave={this._handleFormSave} />);
    }
});

/*
 * Expose the Reducer and the Actions for the Demo app to inject
 */
EditViewCollapsibleDemo.Reducer = EditViewCollapsible.Reducer;
EditViewCollapsibleDemo.Actions = EditViewCollapsible.Actions;

module.exports = EditViewCollapsibleDemo;
